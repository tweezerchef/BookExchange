import {NextApiRequest, NextApiResponse} from "next";
import { Books } from "@prisma/client";
import prisma from "../../../utils/prismaClient"
import { getSuggestionsOpenAI } from "../../../utils/openAI";
import {getBookByTitle} from "../../../utils/books/getBookByTitle";
import {getGoogleBookByTitle} from "../../../utils/books/getGoogleByTitle";

interface GoogleBook{
    selfLink: string;
    pubDate: string;
    pageCount: number;
    mainGenre: string;
    title: string;
    author: string;
    image: string;
    description: string;
    rating: number;
    ISBN10: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      res.status(405).json({message: 'Method not allowed'});
      return;
    }
    const userId = req.query.userId as string;

const topBooks = await prisma.userBooks.findMany({
    where: {
        userId
    },
    take: 3,
    orderBy: {
        starRating: 'desc'
    },
    select : {
      Books: {
        select: {
          title: true
        }
      }
    }
})
const top = topBooks.map((book) => book.Books.title).join(", ")

const bottomBooks = await prisma.userBooks.findMany({
    where: {
        userId
    },
    take: 3,
    orderBy: {
        starRating: 'asc'
    },
    select : {
      Books: {
        select: {
          title: true
        }
      }
    }
})
const bottom = bottomBooks.map((book) => book.Books.title).join(", ")
    const suggestions: string[] = JSON.parse(await getSuggestionsOpenAI(top, bottom)) as string[];
    const booksPromises = suggestions.map(async (suggestion): Promise<Books | GoogleBook> => {
        let book: Books | GoogleBook | null = await getBookByTitle(suggestion);
        if (!book) {
          book = await getGoogleBookByTitle(suggestion);
        }
        return book;
      });

      const BooksArray: (Books | GoogleBook)[] = (await Promise.all(booksPromises)).filter(Boolean);


    res.status(200).json( BooksArray );
  }

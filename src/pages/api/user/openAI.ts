import {NextApiRequest, NextApiResponse} from "next";

import { Books } from "@prisma/client";
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const suggestions: string[] = JSON.parse(await getSuggestionsOpenAI());
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

import { NextApiRequest, NextApiResponse } from "next";
import {Books, UserBooks} from '@prisma/client'
import { findOrCreateBookISBN } from "../../../../utils/books/findOrCreateBookISBN";
import prisma from "../../../../utils/prismaClient";
import { verifyCookie } from "../../../../utils/verifyCookie";


interface StarRating {
  booksId: string;
  starRating: UserBooks['starRating'];
}
interface StarRatingRequestBody {
  book: Partial<Books>;
  userId: string;
  starRating: number;
}
function isObject(obj: unknown): obj is object {
  return typeof obj === 'object' && obj !== null;
}

function isStarRatingRequestBody(obj: unknown): obj is StarRatingRequestBody {
  return (
    isObject(obj) &&
    'userId' in obj && typeof obj.userId === 'string' &&
    'starRating' in obj && typeof obj.starRating === 'number' &&
    'book' in obj && isObject(obj.book)
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ starRatings: StarRating[] } | { error: string } | { message: string } | {newUserBook: Partial<UserBooks>}>
) {
  if (!verifyCookie(req)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (req.method === "GET") {

    const userId: string = req.query.id as string;

    try {
      const starRatings: StarRating[] = await prisma.userBooks.findMany({
        where: {
          userId,
          NOT: {
            starRating: {
              equals: null,
            },
          },
        },
        select: {
          booksId: true,
          starRating: true,
        },
      });
      if (!starRatings) {
        res.status(404).json({ error: "No wishlist found" });
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      res.status(200).json(starRatings)

    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  } else if (req.method === "POST") {
    if (!isStarRatingRequestBody(req.body)) {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }

    const { book, userId, starRating } = req.body ;
try {
  const newBook = await findOrCreateBookISBN(book);
      const newUserBook: UserBooks = await prisma.userBooks.upsert({
        where: {
          userId_bookId: {
            booksId: newBook.id,
            userId,
          },
        },
        create: {
          booksId: newBook.id,
          userId,
          starRating,
        },
        update: {
          starRating,
        },
      });
      res.status(200).json(newUserBook);
    } catch (error) {
        console.log('2', error)
      res.status(500).json({ error: "Failed to add book to wishlist" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end();
  }
}

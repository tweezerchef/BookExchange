import { NextApiRequest, NextApiResponse } from "next";
import { Books } from '@prisma/client';
import { findOrCreateBookISBN } from "../../../../utils/books/findOrCreateBookISBN";
import prisma from "../../../../utils/prismaClient";



interface RequestBody {
  book: Books;
  userId: string;
  review: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const bookID = req.query.id as string;
    try {
      const bookReviews = await prisma.userBooks.findMany({
        where: {
         booksId: bookID,
         NOT: {
            review: {
              equals: null,
            },
          },
        },
        select: {
          User: true,
          review: true,
        },
      });
      res.status(200).json(bookReviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }

}

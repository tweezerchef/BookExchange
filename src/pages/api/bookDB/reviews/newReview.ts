import { NextApiRequest, NextApiResponse } from "next";
import { Books } from "@prisma/client";
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
  if (req.method === "POST") {
    const { review, userId, book }: RequestBody = req.body as RequestBody;
    try {
      const newBook = await findOrCreateBookISBN({ book });
      const newReview = await prisma.userBooks.upsert({
        where: {
          userId_bookId: {
            booksId: newBook.id,
            userId,
          },
        },
        create: {
          booksId: newBook.id,
          userId,
          review,
        },
        update: {
          review,
        },
      });
      console.log('newReview', newReview);
      res.status(200).json(newReview);
    } catch (error) {
      res.status(500).json({ error: "Failed to create review" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

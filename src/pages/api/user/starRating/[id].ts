import { NextApiRequest, NextApiResponse } from "next";
import { findOrCreateBookISBN } from "../../../../utils/books/findOrCreateBookISBN";
import prisma from "../../../../utils/prismaClient";
import { verifyCookie } from "../../../../utils/verifyCookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!verifyCookie(req)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (req.method === "GET") {
    const userId: string = req.query.id as string;

    try {
      const starRatings = await prisma.userBooks.findMany({
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
      if (!starRatings || starRatings.length === 0) {
        res.status(200).json([]);
      } else {
        res.status(200).json(starRatings);
      }
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  } else if (req.method === "POST") {
    const { book, userId, starRating } = req.body;
    try {
      const newBook = await findOrCreateBookISBN({ book });
      const newUserBook = await prisma.userBooks.upsert({
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

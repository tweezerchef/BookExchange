import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prismaClient';
import { findOrCreateBookISBN } from '../../../../utils/books/findOrCreateBookISBN';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = req.query.id as string;

    try {
      const userBooks = await prisma.userBooks.findMany({
        where: {
          userId: userId,
          wishlist: true
        }
      });

      res.status(200).json(userBooks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch wishlist' });
    }

  }
  else if (req.method === 'POST') {
    const { book, userId, action } = req.body;
    if (action === 'add'){
      try {
        const newBook = await findOrCreateBookISBN({ book });
        const newUserBook = await prisma.userBooks.create({
          data: {
            booksId: newBook.id,
            userId: userId,
            wishlist: true
          }
        });
        res.status(200).json(newUserBook);
      } catch (error) {
        res.status(500).json({ error: 'Failed to add book to wishlist' });
      }
    }
    else if (action === 'remove'){
      try {
        const book = await prisma.userBooks.upsert({
          where: {
            booksId_userId: {
              booksId: book.id,
              userId: userId
            }
          },
          update: {
            wishlist: false
          },
        });
        res.status(200).json(book);
      } catch (error) {
        res.status(500).json({ error: 'Failed to remove book from wishlist' });
      }
    }

    if (action === 'add'){

    }
    }
  else {
    res.status(405).end();
  }
}

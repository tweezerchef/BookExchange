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
    const { book, userId, color } = req.body;
    if (color === 'error'){
      try {
        const newBook = await findOrCreateBookISBN({ book });
        const newUserBook = await prisma.userBooks.upsert({
            where: {
              userId_bookId: {
                booksId: newBook.id,
                userId: userId
              }
            },
            create: {
              booksId: newBook.id,
              userId: userId,
              wishlist: true
            },
            update: {
              wishlist: true
            }
          });

        res.status(200).json(newUserBook);
      } catch (error) {
        res.status(500).json({ error: 'Failed to add book to wishlist' });
      }
    }
    else if (color === 'success'){
        try {
            await prisma.userBooks.update({
              where: {
                userId_bookId: {
                  booksId: book.id,
                  userId: userId
                }
              },
              data: {
                wishlist: false
              }
            });
            res.status(200).json(book);
          } catch (error) {
            res.status(500).json({ error: 'Failed to remove book from wishlist' });
          }

    }
    }
  else {
    res.status(405).end();
  }
}

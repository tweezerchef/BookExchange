import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prismaClient';
import { findOrCreateBookISBN } from '../../../../utils/books/findOrCreateBookISBN';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = req.query.id as string;
    try {
      const userBooks = await prisma.userBooks.findMany({
        where: {
          userId,
          wishlist: true
        },
        include: {
        Books: {
              select: {
                  id: true,
                  title: true,
                  author: true,
                  ISBN10: true,
                  description: true,
                  image: true,
                  UserBooks: {
                      select: {
                          id: true,
                          wishlist: true,
                          lendingLibrary: true,
                          booksId: true,
                          userId: true,
                          starRating: true,
                          review: true,
                          LendingTable: true,
                          User: true,
                      },
                  },
                  Discussions: true,
                  Activity: true,
              },
          },
      }
      });
      // correct the type of userBooksArray
      const userBooksArray = userBooks.map((userBook) => (userBook.Books))
      res.status(200).json(userBooksArray);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
    finally{
      await prisma.$disconnect();
    }

  }
  else if (req.method === 'POST') {
    const { book, userId, color } = req.body;
    const {ISBN10} = book;
    if (color === 'danger'){
      try {
        const newBook = await findOrCreateBookISBN({ ISBN10 });
        const newUserBook = await prisma.userBooks.upsert({
            where: {
              userId_bookId: {
                booksId: newBook.id,
                userId
              }
            },
            create: {
              booksId: newBook.id,
              userId,
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
      finally{
        await prisma.$disconnect();
      }
    }
    else if (color === 'success'){
        try {
            await prisma.userBooks.update({
              where: {
                userId_bookId: {
                  booksId: book.id,
                  userId
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
          finally{
            await prisma.$disconnect();
          }
    }
    }
  else {
    res.status(405).end();
  }
}

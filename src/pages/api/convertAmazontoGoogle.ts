import type { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleByISBNAndSave } from '../../utils/books/getGooglebyISBN';
import prisma from '../../utils/prismaClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const books = await prisma.bookdata.findMany({
        select: { ISBN10: true },
        take: 3,
      });

        const results = await Promise.all(books.map(async (book) => {
        const ISBN = book.ISBN10;
        return getGoogleByISBNAndSave(ISBN);
      }));

      res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

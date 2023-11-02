import type { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleByISBNAndSave } from '../../utils/books/getGooglebyISBN';
import prisma from '../../utils/prismaClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      try {
        const batchSize = 300;  // Set your batch size
        const books = await prisma.bookdata.findMany({
          where: { processed: false },
          select: { ISBN10: true },
          take: batchSize,
        });

        const results = await Promise.all(books.map(async (book) => getGoogleByISBNAndSave(book.ISBN10)));

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

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prismaClient';

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
  } else {
    res.status(405).end();
  }
}

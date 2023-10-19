import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../utils/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const userId: string = req.query.id as string;

        try {
        const userBookIDs = await prisma.userBooks.findMany({
            where: {
            userId: userId,
            NOT: {
                starRating: {
                  equals: null,
                },
                },
            },
            select: {
                booksId: true,
                starRating: true,
            }
        });
       const bookIds = userBookIDs.map((book) => (book.booksId))
        res.status(200).json(bookIds);
        } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wishlist' });
        }
    } else {
        res.status(405).end();
    }
    }
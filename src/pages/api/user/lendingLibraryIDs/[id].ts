import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../utils/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const userId: string = req.query.id as string;

        try {
        const userBookIDs = await prisma.userBooks.findMany({
            where: {
            userId,
            lendingLibrary: true
            },
            select: {
                booksId: true
            }
        });
       const bookIds = userBookIDs.map((book: { booksId: string; }) => (book.booksId))
        res.status(200).json(bookIds);
        } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wishlist' });
        }
    } else {
        res.status(405).end();
    }
    }
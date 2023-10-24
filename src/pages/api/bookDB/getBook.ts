import { NextApiRequest, NextApiResponse } from 'next';
import { Books } from '@prisma/client';
import prisma from '../../../utils/prismaClient';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    const { query: { id } } = req;
        try {
            const book = await prisma.books.findUnique({
                where: {
                    id,
                },
            });
            res.status(200).json(book);
        }
        catch (error) {
            console.error('There was a problem:', error);
            res.status(500).json({ message: 'Error retrieving user data' });
        }
    }


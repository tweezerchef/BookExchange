import { NextApiRequest, NextApiResponse } from 'next';
import {getGoogleBookByTitle} from '../../../../utils/books/getGoogleByTitle'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    const { query: { title } } = req;
    const parsedTitle = typeof title === 'string' ? title: "title";
        try {
         const book = await getGoogleBookByTitle(parsedTitle);
         console.log(book);
            res.status(200).json(book);

        }
        catch (error) {
            console.error('There was a problem:', error);
            res.status(500).json({ message: 'Error retrieving user data' });
        }
    }


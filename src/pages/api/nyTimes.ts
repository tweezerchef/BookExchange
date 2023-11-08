import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prismaClient';

const key = process.env.NY_TIMES_API_KEY;
const isbn10 = '0062024078';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const result =  await fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?title=Allegiant&api-key=${key}`)
    const parsedResult = await result.json()
    console.log(parsedResult)
    res.status(200).json(parsedResult)

}
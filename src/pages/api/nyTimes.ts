import type { NextApiRequest, NextApiResponse } from 'next';
import { nyTimesReviewParser } from '../../utils/books/nyTimesReviewParser';
import prisma from '../../utils/prismaClient';


const key = process.env.NY_TIMES_API_KEY;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
    const title = await prisma.books.findFirst({
        where : {
            nyTimesReq: false
        },
        select : {
            title : true
        }
    })
    console.log('title', title);
    // const result =  await fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?title=${title}&api-key=${key}`)
    // if (!result.ok) {
    //     throw new Error(`HTTP error! status: ${result.status}`);
    // }
    // const parsedResult = await result.json() as {results: Array<{url: string}>}
    // if (!parsedResult.results.length) {
    //     throw new Error('No results found');
    // }

    // const {url} = parsedResult.results[0] as {url: string}
    // const review = await nyTimesReviewParser(url)
    // console.log('review', review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching review' });
    }
}
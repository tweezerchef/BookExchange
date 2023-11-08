import type { NextApiRequest, NextApiResponse } from 'next';
import { nyTimesReviewParser } from '../../utils/books/nyTimesReviewParser';
import prisma from '../../utils/prismaClient';


const key = process.env.NY_TIMES_API_KEY;

type NYTimesResults = {
    url: string
}

interface NYTimesReviewResponse{
    results: NYTimesResults[]
}

const setTrue = async (title: string) => {
       const id = await prisma.books.update({
        where : {
            title
        },
        data : {
            nyTimesReq : false,
        },
        select : {
            id : true
        }
    })
    return id
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
    const { title } = await prisma.books.findFirst({
        where : {
            nyTimesReq: false
        },
        select : {
            title : true
        }
    })
    console.log('title', title);
    const result =  await fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?title=${title}&api-key=${key}`)
    if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
    }
    const parsedResult = await result.json() as NYTimesReviewResponse
    if (!parsedResult.results.length) {
        // setTrue(title)
        throw new Error('No results found');
    }
    if (!parsedResult.results[0].url) {
        // setTrue(title)
        throw new Error('No results found');
    }

    const {url} = parsedResult.results[0] as {url: string}
    const review = await nyTimesReviewParser(url);
    console.log('review', review);
    if (!review) {
        // setTrue(title)
        throw new Error('No review found')
    }
        const id = await setTrue(title)
   void  prisma.userBooks.upsert({
    })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching review' });
    }
}
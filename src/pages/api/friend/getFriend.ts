import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        console.log('req')
    const { method } = req;
    if (method !== "GET") {
        console.error("Method not allowed");
        res.status(405).json({ message: "Method not allowed" });
    }
    try{
    const {IdString} = req.query as {IdString: string}
    const userPromise = prisma.user.findUnique({
        where: {
            id: IdString,
        },
        select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true,
            picture: true,
            city: true,
        },
    });
    const wishlistBooksPromise = prisma.userBooks.findMany({
        where: {
            userId: IdString,
            wishlist: true,
        },
        select: {
            Books: {
                select: {
                    id: true,
                    title: true,
                    author: true,
                    description: true,
                    image: true,
                    ISBN10: true,
            },
        },
    },
    });
    const lendingLibraryBooksPromise = prisma.userBooks.findMany({
        where: {
            userId: IdString,
            lendingLibrary: true,
        },
        select: {
            Books: {
                select: {
                    id: true,
                    title: true,
                    author: true,
                    description: true,
                    image: true,
                    ISBN10: true,
            },
        },
        },
    });
    const [user, wishlistBooks0, lendingLibraryBooks0] = await Promise.all([
        userPromise,
        wishlistBooksPromise,
        lendingLibraryBooksPromise
    ]);
    const wishlistBooks = wishlistBooks0.map((book) => book.Books);
    const lendingLibraryBooks = lendingLibraryBooks0.map((book) => book.Books);

    res.status(200).json({ user, wishlistBooks, lendingLibraryBooks });
}
    catch(err){
        console.log(err)
    }
}
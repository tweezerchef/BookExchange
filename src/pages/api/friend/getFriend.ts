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
            Books: true,
        },
    });
    const lendingLibraryBooksPromise = prisma.userBooks.findMany({
        where: {
            userId: IdString,
            lendingLibrary: true,
        },
        select: {
            Books: true,
        },
    });
    const [user, wishlistBooks, lendingLibraryBooks] = await Promise.all([
        userPromise,
        wishlistBooksPromise,
        lendingLibraryBooksPromise
    ]);

    res.status(200).json({ user, wishlistBooks, lendingLibraryBooks });
}
    catch(err){
        console.log(err)
    }
}
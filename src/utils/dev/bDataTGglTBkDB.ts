import prisma from '../prismaClient';
import { getGoogleByISBN } from '../books/getGooglebyISBN';

export default async function bDataTGglTBkDB() {
    const ISBNs = await prisma.bookdata.findMany({
        select: {
            ISBN10: true,
        },
    });
console.log('hello',ISBNs);


}
bDataTGglTBkDB();
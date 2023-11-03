import prisma from "../prismaClient";


export async function findRandomBooks(limit: number) {
    // might want to select a smaller amount to shuffle?
    const allBooks = await prisma.books.findMany();
    const shuffledBooks = allBooks.sort(() => 0.5 - Math.random());
    const randomRows = shuffledBooks.slice(0, limit);
    return randomRows;
  }

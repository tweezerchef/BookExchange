"use server"

import prisma from "../prismaClient";

export async function serverRandomBooks(limit: number){
    const allBooks = await prisma.books.findMany();
    const shuffledBooks = allBooks.sort(() => 0.5 - Math.random());
    const  randomRows = shuffledBooks.slice(0, limit);
    return randomRows;
  }
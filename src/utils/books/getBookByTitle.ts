import prisma from '../prismaClient';

export const getBookByTitle = async (title: string) => {
  const book = await prisma.books.findFirst({
    where: {
      title: {
        contains: title,
        mode: 'insensitive', // if you want the search to be case-insensitive
      },
    },
  });
  return book;
}

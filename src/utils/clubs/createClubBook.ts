import prisma from "../prismaClient";

export const createClubBook = async (booksId: string, clubId: string, startDate: Date, endDate: Date) => {
    const currentClubBook = await prisma.clubsBooks.findFirst({
        where: {
            clubId,
            currentBook: true,
        },
    });

    if (currentClubBook) {
        await prisma.clubsBooks.update({
            where: { id: currentClubBook.id },
            data: { currentBook: false },
        });
    }

    try {
        const newClubBook = await prisma.clubsBooks.create({
            data: {
                booksId,
                clubId,
                currentBook: true,
                startDate,
                endDate,
            },
        });

        return newClubBook;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating new club book');
    }
};

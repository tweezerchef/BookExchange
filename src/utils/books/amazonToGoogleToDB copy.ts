import prisma from '../prismaClient'


const amazonToGoogleToDB = async () => {
    try {
        await prisma.bookdata.findMany({
          select: {
            ISBN10: true,
          },
          take: 10,
        }).then((books) =>console.log(books)).catch((error) => console.log(error));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }


amazonToGoogleToDB();

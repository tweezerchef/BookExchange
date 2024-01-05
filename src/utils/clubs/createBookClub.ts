import prisma from "../prismaClient";



export const createBookClub = async (name: string, description: string, image:string, userId:string) => {
  const newBookClub = await prisma.clubs.create({
    data: {
      name,
      description,
      image,
    },
  }).catch((error: string) => {
        console.error(error);
    throw new Error(error);
    }
    )
const {id} = newBookClub
    prisma.clubsAdmins.create({
        data: {
        userId,
        clubId: id,
        },
    }).catch((error: string) => {
        console.error(error);
    });
    prisma.clubMembers.create({
        data: {
        userId,
        clubId: id,
        },
    }).catch((error: string) => {
        console.error(error);
    });

    return newBookClub;
}
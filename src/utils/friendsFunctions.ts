import { User, Friends, UserGenre } from "@prisma/client";
import prisma from "./prismaClient";

type Friend = Partial<User> & {
    Friends: Friends[];
    UserGenre: UserGenre[];
};

export const getRandomFriends = async (): Promise<Friend[]> =>{
    const friendsArray: Friend[] = await prisma.user.findMany({
        take: 20,
        select: {
            id: true,
            firstName: true,
            userName: true,
            picture: true,
            latitude: true,
            longitude: true,
            city: true,
            Friends: true,
            UserGenre: true,
        }
    });
    return friendsArray
};

export const getFriendList = async (userId: string) => {
    try{
    const friendIds = await prisma.friends.findMany({
        where: {
            userId,
            confirmed: true,
        },
        select: {
            friendId: true,
        },
    });
    const friendIdArray = friendIds.map(friend => friend.friendId);
    return friendIdArray
} catch (error) {
    console.error(error);
    // eslint-disable-next-line consistent-return
    return
};
}


// const randomFriends = await prisma.user.findMany({
//     where: {
//         id: {
//             in: friendIds,
//         },
//     },
//     select: {
//         id: true,
//         name: true,
//         email: true,
//         image: true,
//     },
//     take: 3,
//     orderBy: {
//         createdAt: "desc",
//     },
// });
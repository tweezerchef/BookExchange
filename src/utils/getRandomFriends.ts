import prisma from "./prismaClient";

export const getRandomFriends = async (userId: string) => {
    const friends = await prisma.friends.findMany({
        take: 20,
    });
    return friends;
};

export const getpoopRandomFriends = async (userId: string) => {
    const friends = await prisma.friends.findMany({
        where: {
            userId,
            isFriend: true,
        },
    });
    const friendIds = friends.map((friend) => friend.friendId);
    const randomFriends = await prisma.user.findMany({
        where: {
            id: {
                in: friendIds,
            },
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
        take: 3,
        orderBy: {
            createdAt: "desc",
        },
    });
    return randomFriends;
};
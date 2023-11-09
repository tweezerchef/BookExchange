import prisma from "../prismaClient";

export async function getActivities() {
    const activities = await prisma.activity.findMany({
        take: 10,
        orderBy: {
            createdAt: "desc",
        },
    });
    return activities;
}
import prisma from './prismaClient';


export const createUserFromGoogle = async (profile) => {
    return prisma.user.create({
        data: {
            firstName: profile.given_name ?? '',
            lastName: profile.family_name ?? '',
            email: profile.email ?? '',
            googleId: profile.sub,
            picture: profile.picture ?? '',
          },
        });
};
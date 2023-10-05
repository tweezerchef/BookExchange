import prisma from './prismaClient';


export const createUserFromGoogle = async ({ profile }) => {
    return prisma.user.create({
        data: {
            firstName: profile.given_name ?? '',
            email: profile._json.email,
            googleId: profile.id ?? '',
            picture: profile.picture ?? '',
          },
        });
};
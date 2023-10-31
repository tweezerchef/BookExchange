import prisma from "./prismaClient";
import { setUserLocation } from "./setUserLocation";

interface Genres {
    action?: boolean;
    comedy?: boolean;
    drama?: boolean;
    horror?: boolean;
    romance?: boolean;
    thriller?: boolean;
    sciFI?: boolean;
  }

  interface FormData {
    address: string;
    userName: string;
    avatarUrl?: string;
    genres?: Genres;
  }

export function processFormData(formData: FormData, userId: string) {
    const {address, userName, genres, avatarUrl} = formData;
    console.log(avatarUrl);
    if (avatarUrl) {
      prisma.user.update({
        where: {
          id: userId
        },
        data: {
          picture: avatarUrl,
        }
      }
      ).catch((error) => {
        console.error('Error processing data', error);
      }
      );
    }
    Object.keys(genres).forEach((genre) => {
        console.log('genre', genre);
       prisma.userGenre.create({
        data: {
          genre,
          user: {
            connect: {
              id: userId,
            },
          },
        }
        })
        .catch((error) => {
          console.error('Error processing data', error);
        }
        );
    });

    const locationData = setUserLocation({userId, address});
    prisma.user.update({
      where: {
        id: userId
      },
      data: {
        userName,
      }
    }
    ).catch((error) => {
      console.error('Error processing data', error);
    }
    );

    console.log('Data processing logic goes here');
    console.log(formData);
  }
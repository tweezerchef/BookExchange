import prisma from "./prismaClient";

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
    aviFileData?: File;
    genres?: Genres;
  }
  interface Body {
    formData: FormData;
    userId: string;
  }


export function processFormData(formData: FormData, userId: string) {
    // Replace the following line with your actual data processing logic
    // await new Promise((resolve) =>  setTimeout(resolve, 5000));
    prisma.user.update({
      where: {
        id: userId
      },
      data: {
        // address: formData.address,
        userName: formData.userName,
      }
    }).catch((error) => {
      console.error('Error processing data', error);
    }
    );

    console.log('Data processing logic goes here');
    console.log(formData);
  }
import { NextApiRequest, NextApiResponse } from "next";
import * as signature from 'cookie-signature';
import { verifyCookie } from "../../../../utils/verifyCookie";

import prisma from "../../../../utils/prismaClient";

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

async function processFormData(formData: FormData, userId: string) {
  // Replace the following line with your actual data processing logic
  // await new Promise((resolve) =>  setTimeout(resolve, 5000));

  console.log('Data processing logic goes here');
  console.log(formData);
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const userFromCookie = verifyCookie(req);
  if (!userFromCookie) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (req.method === "POST" && req.body) {
    const { formData, userId } = req.body as Body;

    // Immediately send a response back to the client
    res.status(200).send('Request received');

    // Continue processing in the background
    processFormData(formData, userId)
      .then(() => {
        console.log('Data processing complete');
      })
      .catch((error) => {
        console.error('Error processing data', error);
      });
  } else {
    // Handle other cases or send an error message
    res.status(400).send('Invalid request');
  }
}

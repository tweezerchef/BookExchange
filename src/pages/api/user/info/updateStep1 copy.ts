import { NextApiRequest, NextApiResponse } from "next";
import * as signature from 'cookie-signature';
import fs from 'fs';
import { verifyCookie } from "../../../../utils/verifyCookie";
import { uploadToS3 } from "../../../../utils/s3Upload";


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
  aviFileData?: unknown;
  genres?: Genres;
}
interface Body {
  formData: FormData;
  userId: string;
}

async function processFormData(formData: FormData, userId: string) {
  const { userName, address, genres, aviFileData } = formData;
  const genresArray = Object.keys(genres).filter((genre) => genres[genre]);

  console.log('Data processing logic goes here');
  console.log('User Name:', userName);
  console.log('Address:', address);
  console.log('Genres:', genresArray);
  if (aviFileData) {
    const fileData = aviFileData as { originalFilename: string, filepath: string };

  console.log('File:', fileData.filepath);;

    // Create a readable stream from the file path
    const fileStream = fs.createReadStream(aviFileData.filepath);

    // Construct the file name, you might want to include userId or other unique identifiers
    const fileName = `${userId}-${aviFileData.originalFilename}`;
    try {
      // Upload the file to S3 and get the signed URL
      const signedUrl = await uploadToS3(fileStream, fileName);
      console.log('File uploaded successfully! Signed URL:', signedUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const userFromCookie = verifyCookie(req);
  if (!userFromCookie) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (req.method === "POST" && req.body) {
    const { formData, userId } = req.body as Body;
    console.log('Form data received:', req.body);

    // Immediately send a response back to the client
    res.status(200).send('Request received');

    // Continue processing in the background
   // void processFormData(formData, userId)
  } else {
    // Handle other cases or send an error message
    res.status(400).send('Invalid request');
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { verifyCookie } from "../../../../utils/verifyCookie";
import { processFormData } from "../../../../utils/processFormData";

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


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const userFromCookie = verifyCookie(req);
  if (!userFromCookie) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (req.method === "POST" && req.body) {
    const { formData, userId } = req.body as Body;
    processFormData(formData, userId);


    // Immediately send a response back to the client
    // res.status(200).send('Request received');

    // Continue processing in the background
  } else {
    // Handle other cases or send an error message
    res.status(400).send('Invalid request');
  }
}

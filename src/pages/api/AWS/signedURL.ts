import { NextApiRequest, NextApiResponse } from "next";
import { getSignedURL } from "../../../utils/getSignedURL";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | { message: string } | {url: string} | {urls: string[]}>
) {
  const { method, query: { fileNames } } = req;

  if (method === "GET") {
    if (!fileNames || typeof fileNames !== "string") {
      const message = "No file names provided";
      res.status(400).json({ message });
      return;
    }

    const fileNameArray = fileNames.split(',');

    try {
      if (fileNameArray.length === 1) {
        const url = await getSignedURL(fileNameArray[0]);
        res.status(200).json({ url });
      } else {
        const urls = await Promise.all(fileNameArray.map(async fileName => getSignedURL(fileName)));
        res.status(200).json({ urls });
      }
    } catch (error) {
      console.error("There was a problem:", error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const message = error || "Error retrieving signed URLs";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      res.status(500).json({ message });
    }
  } else {
    const message = "Method not allowed";
    res.status(405).json({ message });
  }
}

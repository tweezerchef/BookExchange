import { NextApiRequest, NextApiResponse } from "next";
import * as formidable from 'formidable';
import fs from 'fs';
import { uploadToS3 } from "../../../utils/s3Upload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | { message: string } | {url: string}>
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: 'Error processing request' });
        return;
      }
      const file = files.file[0];
      if (!file) {
        res.status(400).json({ message: "No file provided" });
        return;
      }

     void (async () => {
        try {
          const fileStream = fs.createReadStream(file.filepath);
          const url = await uploadToS3(fileStream, file.originalFilename);
          res.status(200).json({ url });
        } catch (error: unknown) {
          console.error("There was a problem:", error);
          const message = (error as Error).message || "Error uploading file";
          res.status(500).json({ message });
        }
      })();
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

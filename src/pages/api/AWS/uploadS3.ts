import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable';  // You'll need to install the 'formidable' package
import fs from 'fs';
import { uploadToS3 } from "../../../utils/s3Upload";

export const config = {
  api: {
    bodyParser: false,  // Disabling body parsing as we'll handle it with formidable
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | { message: string } | {url: string}>
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: 'Error processing request' });
        return;
      }

      const {file} = files;

      if (!file) {
        res.status(400).json({ message: "No file provided" });
        return;
      }

      try {
        const fileStream = fs.createReadStream(file.path);  // Assuming 'file' is the file object you got
        const url = await uploadToS3(fileStream, file.name);
        res.status(200).json({ url });
      } catch (error) {
        console.error("There was a problem:", error);
        const message = error.message || "Error uploading file";
        res.status(500).json({ message });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

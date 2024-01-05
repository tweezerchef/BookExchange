import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { convertBase64ToStream } from "../../../utils/convertBase64ToStream";
import { uploadToS3 } from "../../../utils/s3Upload";
import { createBookClub } from "../../../utils/clubs/createBookClub";
import { createClubBook } from "../../../utils/clubs/createClubBook";

interface CreateClubRequest {
    bookEndDate: Date;
    bookStartDate: Date;
    clubBookISBN10: string;
    clubDescription: string;
    clubImage: string;
    clubName: string;
    userId: string;
}



const handler: NextApiHandler= async(
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
if (req.method !== "POST") {
    console.error("Method not allowed");
    res.status(405).json({ message: "Method not allowed" });
}
const { bookEndDate, bookStartDate, clubBookISBN10, clubDescription, clubImage, clubName, userId } = req.body as CreateClubRequest;
const base64Data = clubImage.replace(/^data:image\/\w+;base64,/, "");
const stream =  convertBase64ToStream(base64Data);
const fileName = `clubAvi/${clubName}.png`;
uploadToS3(stream, fileName);

const newClub = await createBookClub(clubName, clubDescription, fileName, userId);






}
export default handler

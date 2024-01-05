import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { convertBase64ToStream } from "../../../utils/convertBase64ToStream";
import { uploadToS3 } from "../../../utils/s3Upload";
import { createBookClub } from "../../../utils/clubs/createBookClub";
import { createClubBook } from "../../../utils/clubs/createClubBook";
import { findOrCreateBookISBNOnly } from "../../../utils/books/findOrCreateBookISBN";

interface CreateClubRequest {
    bookEndDate: Date;
    bookStartDate: Date;
    clubBookISBN10: string;
    clubDescription: string;
    clubImage: string;
    clubName: string;
    userId: string;
}

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== "POST") {
        console.error("Method not allowed");
        res.status(405).json({ message: "Method not allowed" });
    }
    try {
        const { bookEndDate, bookStartDate, clubBookISBN10, clubDescription, clubImage, clubName, userId } = req.body as CreateClubRequest;
        const base64Data = clubImage.replace(/^data:image\/\w+;base64,/, "");
        const stream = convertBase64ToStream(base64Data);
        const fileName = `clubAvi/${clubName}.png`;
        uploadToS3(stream, fileName);

        const [bookClub, book] = await Promise.all([
            createBookClub(clubName, clubDescription, fileName, userId),
            findOrCreateBookISBNOnly(clubBookISBN10)
        ]);

        const clubId = bookClub.id;
        const booksId = book.id;
        await createClubBook(booksId, clubId, bookStartDate, bookEndDate);
        return  res.status(200).json(clubId)
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}

export default handler

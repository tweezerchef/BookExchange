import { NextApiRequest, NextApiResponse } from "next";
import { getSignedURL } from "../../../utils/getSignedURL";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | { message: string } | {url: string}>
) {
    const { method, query: { fileName } } = req;

    if (method === "GET") {
        if (!fileName || typeof fileName !== "string") {
            const message = "No file name provided";
            res.status(400).json({ message });
            return;
        }
        try {
            const url = await getSignedURL(fileName);
            res.status(200).json({ url });
        } catch (error) {
            console.error("There was a problem:", error);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const message = error || "Error retrieving user data";
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            res.status(500).json({ message });
        }
    } else {
        const message = "Method not allowed";
        res.status(405).json({ message });
    }
}
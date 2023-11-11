import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { getFriendList } from "../../../utils/friendsFunctions";




const handler: NextApiHandler=(
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
  const { userId } = req.query as { userId: string };
    if (req.method !== "GET") {
        console.error("Method not allowed");
        res.status(405).json({ message: "Method not allowed" });
    }
    else{
        getFriendList(userId).then((friendIds) => {
            res.status(200).json(friendIds);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Failed to send friend request" });
        });

    }
}

export default handler
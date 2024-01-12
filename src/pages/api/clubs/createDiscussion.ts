import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   let resp =  await prisma.discussions.create({
        data: {
          title: "Dune Bitch",
          body: "Exploring the Depths of Dune', 'This is a fascinating discussion about the intricate world and themes of Frank Herbert''s Dune. Let''s dive into the universe of Arrakis, discuss the complex characters, and explore the novel''s profound themes.",
          clubsId: "55262086-79de-492a-85b1-626b0d44d530",
          userId: "631fedc2-29f0-4784-aeed-708a0288d5f7",
          bookTitle: "Dune",
        },
      });
      res.send(resp)
    }
    export default handler
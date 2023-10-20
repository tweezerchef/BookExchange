import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

import { findUserByIdDetailed} from "../../../../utils/userService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  const { method, query: { id } } = req;

  if (method === "GET") {
    try {
      const user = await findUserByIdDetailed(id);
      res.status(200).json(user);
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

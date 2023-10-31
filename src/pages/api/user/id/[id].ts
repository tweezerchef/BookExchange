import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { findUserByIdDetailed } from "../../../../utils/userService";
import { verifyCookie } from "../../../../utils/verifyCookie";
// Assuming you have a utility function to verify cookies
type UserResponse = Omit<User, "email" | "googleId" | "lastName" | "NotificationsCount" | "phoneNumber">;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | UserResponse | { message: string }>
) {
  const { method, query: { id } } = req;
  // Verify the cookie
  if (!verifyCookie(req)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (method === "GET") {
    try {
      const user = await findUserByIdDetailed(id);
      res.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("There was a problem:", error);
        const message = error.message || "Error retrieving user data";
        res.status(500).json({ message });
      } else {
        console.error("An unknown error occurred:", error);
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
   }
}

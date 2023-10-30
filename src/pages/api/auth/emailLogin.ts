/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from "next";
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt";
import { getSecureCookie } from "../../../utils/getSecureCookie";
import {
  findUserByEmail,
} from "../../../utils/createFindUserEmail";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const cookie = getSecureCookie({
      name: "user",
      value: {
        email: user.email,
        id: user.id,
        username: user.username,
      },
    });
    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ success: true })
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

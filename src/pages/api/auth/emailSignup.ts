/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from "next";
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt";
import { getSecureCookie } from "../../../utils/getSecureCookie";
import {
  createUserByEmailAndPassword,
  findUserByEmail,
} from "../../../utils/createFindUserEmail"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { email, password } = req.body as { email: string; password: string };

  try {
    console.log(email, password)
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.error("Email already registered")
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUserByEmailAndPassword(email, hashedPassword);

    // Add your logic for sending confirmation emails if needed
    const cookie = getSecureCookie({
      name: "user",
      value: {
        email: newUser.email,
        id: newUser.id,
        userName: newUser.userName,
      },
    });
    res.setHeader("Set-Cookie", cookie);
    res.writeHead(302, { Location: "/" });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
  }
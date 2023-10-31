/* eslint-disable consistent-return */

import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt";

import { getSecureCookie } from "../../../utils/getSecureCookie";
import {
  createUserByEmailAndPassword,
  findUserByEmail,
} from "../../../utils/createFindUserEmail";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
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
      }
    });
    res.setHeader("Set-Cookie", cookie);

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
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
        userName: user.userName,
      }
    });

    res.writeHead(302, { Location: "/home" });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

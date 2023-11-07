// pages/api/auth/validate.js
import { parse } from 'cookie';
import * as signature from 'cookie-signature';
import { NextApiRequest, NextApiResponse } from "next";

export default function handler( req: NextApiRequest,
    res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');
  const userCookie = cookies.user;

  if (!userCookie) {
    return res.status(401).json({ error: 'No cookie found' });
  }

  const secretKey = process.env.SECRET_COOKIE_KEY;
  const unsignedValue = signature.unsign(userCookie, secretKey);

  if (unsignedValue === false) {
    return res.status(401).json({ error: 'Invalid cookie' });
  }

  // Assuming unsignedValue contains the user info stringified as JSON
  const userInfo = JSON.parse(unsignedValue);
  return res.status(200).json({ user: userInfo });
}

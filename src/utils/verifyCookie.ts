import { NextApiRequest } from "next";
import cookie from "cookie";
import signature from "cookie-signature";


const secret = process.env.SECRET_COOKIE_KEY;

export function verifyCookie(req: NextApiRequest) {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return false;
  }

  const parsedCookies = cookie.parse(cookies);
  const userCookie = parsedCookies.user;
  if (!userCookie) {
    return false;
  }

  const unsignedCookie = signature.unsign(userCookie, secret);
  if (unsignedCookie === false) {
    return false;
  }
    return true;

}
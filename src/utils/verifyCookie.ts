import { NextApiRequest } from "next";
import cookie from "cookie";
import signature from "cookie-signature";


const secret = process.env.SECRET_COOKIE_KEY;

export function verifyCookie(req: NextApiRequest) {
  const cookies = req.headers.cookie;
  if (!cookies) {

    console.log('No cookies bitch');
    return false;
  }

  const parsedCookies = cookie.parse(cookies);
  const userCookie = parsedCookies.user;
  if (!userCookie) {
    return false;
  }
console.log("success bitch")
  const unsignedCookie = signature.unsign(userCookie, secret);
  return unsignedCookie !== false;


}
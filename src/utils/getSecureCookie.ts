
import { serialize } from 'cookie';
import * as signature from 'cookie-signature';

const secretKey = process.env.SECRET_COOKIE_KEY ;
interface Value {
  email: string;
  id: string;
  userName: string;
}


export const getSecureCookie = ({ name, value }: { name: string, value: Value }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost'; // Provide a default value
  const signedValue = signature.sign(JSON.stringify(value), secretKey);

  return serialize(name, signedValue, {
    httpOnly: true,
    // Check that siteUrl starts with 'https' if in production
    secure: process.env.NODE_ENV === "production" && siteUrl.startsWith('https'),
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    maxAge: 36000000,
    path: "/",
  });
};


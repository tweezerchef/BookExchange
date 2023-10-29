import { serialize } from 'cookie';
import * as signature from 'cookie-signature';

const {secretKey} = process.env ;

export const getSecureCookie = ({ name, value }) => {
  const signedValue = signature.sign(JSON.stringify(value), secretKey);

  return serialize(name, signedValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 36000000,
    path: "/",
  });
};

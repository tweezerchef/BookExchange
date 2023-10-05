import { serialize } from 'cookie';

export const getSecureCookie = ({ name, value }) => {
  return serialize(name, JSON.stringify(value), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 36000000,
    path: "/",
  });
};
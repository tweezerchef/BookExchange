/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import passport from "passport";
import Google, {
  IOAuth2StrategyOption,
  Profile,
  VerifyFunction,
} from "passport-google-oauth";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { User } from "@prisma/client"
import { findUserByEmailDetailed } from "../../../../utils/userService";
import { createUserFromGoogle } from "../../../../utils/createUserFromGoogle";
import { getSecureCookie } from "../../../../utils/getSecureCookie";

dayjs.extend(duration);

export const config = {
  api: {
    externalResolver: true,
  },
};

interface UserCookie {
  email: string;
  id: string;
  username: string;
}

const strategyOptions: IOAuth2StrategyOption = {
  clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
};

// Disable ESLint for the specific line
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
const strategy = new (Google.OAuth2Strategy as any)(
  {
    clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
  },
  (
    accessToken: string,
    refreshToken: string,
    profile: Google.Profile,
    done: Google.VerifyFunction
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    done(null, profile);
  }
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
passport.use(strategy as Google.OAuth2Strategy);
const router = createRouter<NextApiRequest, NextApiResponse>();

router.get((req, res, next) => {
  const operation = req.query.operation as string;
  if (operation === "auth") {
    return (passport.authenticate("google", { scope: ["profile", "email"] }) as (
      req: any,
      res: any,
      next: any
    ) => void)(req, res, next);
  }
  if (req.query.operation === "callback") {
    return passport.authenticate(
      "google",
      async (err: Error | null, profile: Profile | null, info: any) => {
        if (err) {
          console.error(err);
          res.status(500).end();
          return;
        }
        let user: User = await findUserByEmailDetailed({
          email: profile.emails[0].value,
        });
        if (!user) {
          user = await createUserFromGoogle({
            profile,
          });
          // email func?
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
        res.writeHead(302, { Location: '/home' });
        res.end();
      }
    )(req, res, next);
  }
    res.status(400).json({ error: "Unknown operation." });

});

export default router.handler({
  onError: (err: any, req: any, res: any) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});

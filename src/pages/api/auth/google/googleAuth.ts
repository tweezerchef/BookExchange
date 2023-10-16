import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import passport from "passport";
import Google, {
  IOAuth2StrategyOption,
  Profile,
  VerifyFunction,
} from "passport-google-oauth";
// import { findUser, sendWelcomeEmail } from "@/app/account/actions";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { findUserByEmailDetailed } from "../../../../utils/userService";
import { createUserFromGoogle } from "../../../../utils/createUserFromGoogle";
import { getSecureCookie } from "../../../../utils/getSecureCookie";

dayjs.extend(duration);

export const config = {
  api: {
    externalResolver: true,
  },
};

interface User {
  email: string;
  id: string;
  username: string;
}

passport.use(
  new Google.OAuth2Strategy(
    {
      clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
    } as IOAuth2StrategyOption,
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyFunction
    ) => {
      done(null, profile);
    }
  )
);

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get((req, res, next) => {
  if (req.query.operation === "auth") {
    return passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  } else if (req.query.operation === "callback") {
    return passport.authenticate(
      "google",
      async (err: any, profile: any, info: any) => {
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
          // setTimeout(async () => {
          //      await sendWelcomeEmail({ email: user!.email });
          //    }, 0);
        }
        const cookie = getSecureCookie({
          name: "user",
          value: {
            email: user.email,
            id: user.id,
            username: user.username,
          },
        });
        // write a function that stores user in local storage
        // localStorage.setItem("user", JSON.stringify(user));
        res.setHeader("Set-Cookie", cookie);
        res.writeHead(302, { Location: '/home' });
        res.end();
      }
    )(req, res, next);
  } else {
    res.status(400).json({ error: "Unknown operation." });
  }
});

export default router.handler({
  onError: (err: any, req: any, res: any) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});

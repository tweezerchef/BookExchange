import passport, { use, serializeUser, deserializeUser } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { compare } from "bcrypt";
import { findUserByEmailDetailed, findUserById } from "./userService";

use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await findUserByEmailDetailed(email);

      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

serializeUser((user, done) => {
  done(null, user.id);
});

deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;

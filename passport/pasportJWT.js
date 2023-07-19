import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../model/user.js";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
const initializePassport = () => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ id: jwt_payload.id }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, { id: user.id, role: user.role });
        } else {
          return done(null, false);
        }
      });
    })
  );
};

export default initializePassport;

import express from "express";
import { postLogin } from "../controller/loginController.js";
import { body } from "express-validator";
import passport from "passport";

const router = express.Router();

router.post(
  "/",
  [
    body("email", "Invalid email").not().isEmpty().isEmail(),
    body("password", "Minimum 8 character")
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
  ],
  passport.authenticate("jwt", { session: false }),
  postLogin
);

export default router;

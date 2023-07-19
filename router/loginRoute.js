import express from "express";
import { postLogin } from "../controller/loginController.js";
import { body } from "express-validator";

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
  postLogin
);

export default router;

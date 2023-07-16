import express from "express";
import { postRegister } from "../controller/registerController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [
    body("name", "invalid name").not().isEmpty().isString(),
    body("email", "Enter a valid E-mail address").not().isEmpty().isEmail(),
    body("password", "Minimum 8 character")
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
  ],
  postRegister
);

export default router;

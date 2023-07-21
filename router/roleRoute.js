import express from "express";
import {
  addNewRole,
  canAddRole,
  getAllRoles,
} from "../controller/roleController.js";
import passport from "passport";
import passportConfig from "../passport/pasportJWT.js";
import { body } from "express-validator";

passportConfig();

const router = express.Router();

router.get("/", getAllRoles);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  [body("roleName", "Role name is required").not().isEmpty()],
  addNewRole
);

router.get(
  "/canAddRole",
  passport.authenticate("jwt", { session: false }),
  canAddRole
);

export default router;

import express from "express";
import {
  addNewRole,
  canAddRole,
  getAllRoles,
} from "../controller/roleController.js";
import passport from "passport";
import passportConfig from "../passport/pasportJWT.js";

passportConfig();

const router = express.Router();

router.get("/", getAllRoles);
router.post("/", passport.authenticate("jwt", { session: false }), addNewRole);
router.get(
  "/canAddRole",
  passport.authenticate("jwt", { session: false }),
  canAddRole
);

export default router;

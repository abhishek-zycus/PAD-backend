import express from "express";
import {
  getDashboardData,
  setContractData,
} from "../controller/dashboardController.js";
import passport from "passport";
import passportConfig from "../passport/pasportJWT.js";

passportConfig();
const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getDashboardData
);
router.post("/addContract", setContractData);

export default router;

import express from "express";
import {
  getDashboardData,
  getDashboardDat,
  setContractData,
} from "../controller/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardData);
router.post("/", getDashboardDat);
router.post("/addContract", setContractData);

export default router;

import express from "express";
import {
  getDashboardData,
  getDashboardDat,
} from "../controller/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardData);
router.post("/", getDashboardDat);

export default router;

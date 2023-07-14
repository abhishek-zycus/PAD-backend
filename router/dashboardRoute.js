import express from "express";
import { getDashboardData } from "../controller/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardData);

export default router;

import express from "express";
import { postRegister } from "../controller/registerController.js";

const router = express.Router();

router.post("/", postRegister);

export default router;

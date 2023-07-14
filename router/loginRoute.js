import express from "express";
import { postLogin } from "../controller/loginController.js";

const router = express.Router();

router.post("/", postLogin);

export default router;

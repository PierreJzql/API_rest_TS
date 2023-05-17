import express  from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { justify } from "./utils/justify";

dotenv.config();

const router = express.Router();
const secret_key = process.env.SECRET_TOKEN;

router.post("/token",(req,res) => {
    const { email } = req.body;
    const token = jwt.sign({ email }, secret_key);
    res.json({ token });
});

router.post("/justify",express.text(),(req,res) => {
    const textToJustify = req.body;
    const justifiedText = justify(textToJustify);
    res.send(justifiedText);
});

export default router;
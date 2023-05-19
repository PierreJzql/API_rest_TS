import express, { Router, Request, Response, NextFunction }  from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

import { justify } from "./utils/justify";

dotenv.config();

const router: Router = express.Router();
const secret_key: Secret = process.env.SECRET_TOKEN as Secret;

const user: Map<string, string> = new Map<string, string>();

router.post("/token",(req: Request,res: Response) => {
    const { email }: { email: string} = req.body;

    if (user.has(email)){
    
        const token: string = user.get(email);
        res.json({ token });

    } else {

        const token: string = jwt.sign({ email }, secret_key);
        user.set(email, token);
        res.json({ token });

    }
});

function autoriseToken(req: Request, res: Response, next: NextFunction){
    const token: string = req.headers.authorization;

    jwt.verify(token, secret_key, (err) => {
        if (err) {
           
            res.status(401).json({ message: "invalid access"});

        } else {

            next()

        }
    })
}

router.post("/justify", express.text(), autoriseToken, (req,res) => {
    const textToJustify: string = req.body;
    const justifiedText: string = justify(textToJustify);
    res.send(justifiedText);
});

export default router;
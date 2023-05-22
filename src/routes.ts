import express, { Router, Request, Response, NextFunction }  from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

import { justify } from "./utils/justify";

dotenv.config();

const router: Router = express.Router();
const secret_key: Secret = process.env.SECRET_TOKEN as Secret;

const user: Map<string, string> = new Map<string, string>();
let wordDaily: Map<string, number> = new Map<string, number>();

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

function wordLimit (limit: number){
    return function (req: Request, res: Response, next: NextFunction){
        const textToJustify: string = req.body;
        const numberOfWords: number = textToJustify.split(" ").length;
        const currentDate: string = new Date().toLocaleDateString();

        if(wordDaily.has(currentDate)){

            const currentWord: number = wordDaily.get(currentDate);
            const totalWord: number = currentWord + numberOfWords;

            if(totalWord > limit){

                return res.status(402).json({message: "Payement Required"});

            }

            wordDaily.set(currentDate, totalWord);

        } else {

            wordDaily.set(currentDate,0);

        }
        next();
    }

}

router.post("/justify", express.text(), autoriseToken,wordLimit(80000), (req: Request,res: Response) => {
    const textToJustify: string = req.body;
    const justifiedText: string = justify(textToJustify,80);
    res.type("text/plain");
    res.send(justifiedText);
});

export default router;
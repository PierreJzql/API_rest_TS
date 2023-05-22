import express, { Express }  from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes"

dotenv.config()


const app: Express = express();
const port: number = parseInt(process.env.PORT) || 8080;

// const app = express();
// const port: string = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api",routes);



app.listen(port, () => {
    console.log(`Serveur en cours sur le port ${port}`);
});


import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes"

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api",routes);



app.listen(port, () => {
    console.log(`Serveur en cours sur le port ${port}`);
});


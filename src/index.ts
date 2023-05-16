import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Serveur en cours sur le port ${port}`);
});


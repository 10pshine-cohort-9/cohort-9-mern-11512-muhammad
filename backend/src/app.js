import express from "express";

import authRoutes from "../routes/authRoutes.js";
import notesRoutes from "../routes/notesRoutes.js"
import cors from "cors";
import pinoHttp from "pino-http";
import logger from "./config/logger.js"



const app = express();

app.use(pinoHttp({ logger }))
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes)

app.get("/", (req, res) => {
    res.json({
        message: "Notes API is here, just for test"
    });
});

export default app;



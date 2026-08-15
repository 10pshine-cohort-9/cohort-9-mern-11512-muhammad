import express from "express";

import authRoutes from "../routes/authRoutes.js";
import notesRoutes from "../routes/notesRoutes.js"
import cors from "cors";



const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes)

app.get("/", (req, res) => {
    res.json({
        message: "Notes API is here"
    });
});

export default app;



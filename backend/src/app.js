import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import authRoutes from "../routes/authRoutes.js";
import notesRoutes from "../routes/notesRoutes.js";
import logger from "./config/logger.js";

const app = express();

app.disable("x-powered-by");

app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Notes API is active"
  });
});

app.use((err, req, res, next) => {
  logger.error(err, "Unhandled Application Error");
  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});

export default app;

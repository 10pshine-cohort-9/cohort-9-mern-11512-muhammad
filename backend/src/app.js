import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {


    res.json({
        message: "Notes API is here"
    });
});

export default app;
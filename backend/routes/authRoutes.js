import express from "express"
import { register, login } from "../controllers/auth_controllers.js";

// this File iss just for the Route, main func is in Controllers

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router
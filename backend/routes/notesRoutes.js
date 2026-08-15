import express from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
} from "../controllers/notesController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, createNote);
router.get("/", authenticate, getNotes);
router.get("/:id", authenticate, getNote);
router.put("/:id", authenticate, updateNote);
router.delete("/:id", authenticate, deleteNote);

export default router;
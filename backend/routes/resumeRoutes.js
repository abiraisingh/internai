import express from "express";
import { uploadResume } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);

export default router;
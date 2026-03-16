import express from "express";
import { createJob, getJobs, matchJob } from "../controllers/jobController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createJob);
router.get("/", protect, getJobs);

// IMPORTANT — must be AFTER router.get("/")
router.get("/:jobId/match", protect, matchJob);

export default router;
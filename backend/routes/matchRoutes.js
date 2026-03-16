import express from "express";
import Match from "../models/Match.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's match history
router.get("/", protect, async (req, res) => {
  try {
    const matches = await Match.find({ user: req.user._id })
      .populate("job", "title company location")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

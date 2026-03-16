import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    matchScore: {
      type: Number,
      required: true
    },
    matchedSkills: [String],
    missingSkills: [String]
  },
  {
    timestamps: true
  }
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
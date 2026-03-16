import Job from "../models/Job.js";
import User from "../models/User.js";
import Match from "../models/Match.js";

// CREATE JOB (Admin)
export const createJob = async (req, res) => {
  try {
    const { title, company, description, skillsRequired, location } = req.body;

    const job = await Job.create({
      title,
      company,
      description,
      skillsRequired,
      location,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL JOBS
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MATCH JOB
export const matchJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findById(req.user._id);
    if (!user.resume || !user.resume.extractedText) {
      return res.status(400).json({ message: "Resume not uploaded" });
    }

    // ✅ UPGRADE 1 — Normalize Resume Text
    const resumeText = user.resume.extractedText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ") // remove punctuation
      .replace(/\s+/g, " "); // normalize multiple spaces

    // Normalize required skills
    const requiredSkills = job.skillsRequired.map((skill) =>
      skill.toLowerCase().trim(),
    );

    // ✅ UPGRADE 2 — Word Boundary Matching
    const matchedSkills = requiredSkills.filter((skill) => {
      const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedSkill}\\b`, "i");
      return regex.test(resumeText);
    });

    const missingSkills = requiredSkills.filter((skill) => {
      const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedSkill}\\b`, "i");
      return !regex.test(resumeText);
    });

    const matchScore =
      requiredSkills.length > 0
        ? (matchedSkills.length / requiredSkills.length) * 100
        : 0;
    await Match.create({
      user: user._id,
      job: job._id,
      matchScore: Math.round(matchScore),
      matchedSkills,
      missingSkills,
    });

    res.json({
      jobTitle: job.title,
      company: job.company,
      matchScore: Math.round(matchScore),
      matchedSkills,
      missingSkills,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

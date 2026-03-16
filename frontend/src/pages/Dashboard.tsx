/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Briefcase, Sparkles } from "lucide-react";
import API from "../api/axios";

interface Job {
  _id: string;
  title: string;
  company: string;
  skills?: string[];
}

interface Match {
  _id: string;
  matchScore: number;
  job?: {
    title: string;
    company: string;
  };
  jobTitle?: string;
  company?: string;
}

interface MatchResult {
  matchScore?: number;
  score?: number;
  matchedSkills?: string[];
  missingSkills?: string[];
}

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  useEffect(() => {
    fetchJobs();
    fetchMatches();
  }, []);

  const fetchJobs = async () => {
    const res = await API.get<Job[]>("/jobs");
    setJobs(res.data);
  };

  const fetchMatches = async () => {
    const res = await API.get<Match[]>("/matches");
    setMatches(res.data);
  };

  const uploadResume = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    await API.post("/resume/upload", formData);
    alert("Resume uploaded successfully");
  };

  const matchJob = async (jobId: string) => {
    const res = await API.get<MatchResult>(`/jobs/${jobId}/match`);
    setMatchResult(res.data);
    fetchMatches();
  };

  const totalMatches = matches.length;

  const avgScore =
    matches.reduce((sum, m) => sum + m.matchScore, 0) / (matches.length || 1);

  const highestScore = Math.max(...matches.map((m) => m.matchScore), 0);

  return (
    <div
      className="
min-h-screen
bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black
text-gray-900 dark:text-white
transition-colors duration-300
"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-10 flex items-center gap-3">
          <Sparkles size={28} /> Dashboard
        </h1>

        {/* Analytics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div whileHover={{ scale: 1.03 }} className="glass-card">
            <p className="card-label">Total Matches</p>
            <p className="card-number">{totalMatches}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="glass-card">
            <p className="card-label">Average Score</p>
            <p className="card-number">{Math.round(avgScore)}%</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="glass-card">
            <p className="card-label">Highest Score</p>
            <p className="card-number">{highestScore}%</p>
          </motion.div>
        </div>

        {/* Resume Upload */}
        <div className="glass-card mb-12">
          <h2 className="section-title flex items-center gap-2">
            <Upload size={18} /> Upload Resume
          </h2>

          <div className="flex flex-wrap gap-4">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="file-input"
            />

            <button onClick={uploadResume} className="primary-btn">
              Upload Resume
            </button>
          </div>
        </div>

        {/* Jobs */}
        <h2 className="section-title flex items-center gap-2 mb-6">
          <Briefcase size={20} /> Available Jobs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.04 }}
              className="job-card"
            >
              <h3 className="job-title">{job.title}</h3>
              <p className="job-company">{job.company}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {(job.skills || []).map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>

              <button onClick={() => matchJob(job._id)} className="match-btn">
                Match Job
              </button>
            </motion.div>
          ))}
        </div>

        {/* Match History */}
        <h2 className="section-title mb-6">Match History</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <div key={match._id} className="glass-card">
              <p className="font-semibold mb-2">
                {match.job?.title || match.jobTitle} -{" "}
                {match.job?.company || match.company}
              </p>

              <p className="text-gray-400 text-sm">Match Score</p>

              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{ width: `${match.matchScore}%` }}
                />
              </div>

              <p className="text-sm mt-2">{match.matchScore}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Match Modal */}

      <AnimatePresence>
        {matchResult && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-[450px]"
            >
              <h2 className="text-2xl font-semibold mb-6">AI Match Analysis</h2>

              <p className="text-5xl font-bold text-green-400 mb-4">
                {matchResult.matchScore ?? matchResult.score ?? 0}%
              </p>

              <div className="h-3 bg-gray-700 rounded mb-8">
                <div
                  className="h-3 bg-green-500 rounded"
                  style={{
                    width: `${matchResult.matchScore ?? matchResult.score ?? 0}%`,
                  }}
                />
              </div>

              {matchResult.matchedSkills && (
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Matched Skills</p>

                  <div className="flex flex-wrap gap-2">
                    {matchResult.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-green-900/40 text-green-400 px-3 py-1 rounded text-sm"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {matchResult.missingSkills && (
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Missing Skills</p>

                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-red-900/40 text-red-400 px-3 py-1 rounded text-sm"
                      >
                        ✗ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setMatchResult(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-lg font-medium"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;

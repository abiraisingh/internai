/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import API from "../api/axios";

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

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const res = await API.get<Match[]>("/matches");
    setMatches(res.data);
  };

  return (
    <div
      className="
      min-h-screen
      bg-gray-50 dark:bg-black
      text-gray-900 dark:text-white
      px-6 py-10
      transition-colors
      "
    >
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Match History
        </h1>

        <div className="space-y-4">

          {matches.map((match) => (

            <div
              key={match._id}
              className="
              glass-card
              flex flex-col gap-3
              "
            >

              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">
                    {match.job?.title || match.jobTitle}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {match.job?.company || match.company}
                  </p>
                </div>

                <p className="text-green-500 font-bold text-lg">
                  {match.matchScore}%
                </p>

              </div>

              {/* Score Bar */}

              <div className="progress-bg">

                <div
                  className="progress-fill"
                  style={{ width: `${match.matchScore}%` }}
                />

              </div>

            </div>

          ))}

          {matches.length === 0 && (
            <p className="text-gray-500 text-sm">
              No matches found yet.
            </p>
          )}

        </div>

      </div>
    </div>
  );
};

export default Matches;
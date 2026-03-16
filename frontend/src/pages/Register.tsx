/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/register", form);

      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      login(res.data);
      navigate("/dashboard");

    } catch (error: any) {
      alert(error.response?.data?.message || "Error occurred");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900 opacity-60 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10"
      >
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-10 rounded-2xl w-[380px] text-white"
          >
            {/* Title */}
            <h2 className="text-3xl font-bold mb-2 text-center">
              Create Account
            </h2>

            <p className="text-center text-zinc-400 mb-8 text-sm">
              Join the platform and start exploring opportunities
            </p>

            {/* Name */}
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full mb-4 p-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-cyan-400 transition"
              required
            />

            {/* Email */}
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full mb-4 p-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-cyan-400 transition"
              required
            />

            {/* Password */}
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full mb-6 p-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-cyan-400 transition"
              required
            />

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition p-3 rounded-lg font-semibold shadow-lg"
            >
              {loading ? "Creating account..." : "Register"}
            </motion.button>

            {/* Login link */}
            <p
              className="text-center mt-6 text-sm cursor-pointer text-cyan-400 hover:underline"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </p>
          </form>
      </motion.div>
    </div>
  );
};

export default Register;
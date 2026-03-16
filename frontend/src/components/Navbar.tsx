import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="
      sticky top-0 z-50
      flex justify-between items-center
      px-8 py-4
      border-b
      border-gray-200 dark:border-gray-800
      bg-white dark:bg-black
      backdrop-blur
      "
    >
      {/* Logo */}
      <h1 className="text-xl font-bold text-black dark:text-white">
        Resume Matcher
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-6">

        <Link
          to="/dashboard"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          to="/matches"
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          Matches
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
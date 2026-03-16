import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-700"
    >
      {theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}
    </button>
  );
};

export default ThemeToggle;
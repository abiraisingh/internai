import { useEffect, useState } from "react";
import { ThemeContext, Theme } from "./theme-context";

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {

  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored ?? "dark";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
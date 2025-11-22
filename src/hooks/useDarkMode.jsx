import { useState, useEffect } from "react";

export default function useDarkMode(initial = true) {
  const [isDarkMode, setIsDarkMode] = useState(initial);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return { isDarkMode, toggleDarkMode };
}

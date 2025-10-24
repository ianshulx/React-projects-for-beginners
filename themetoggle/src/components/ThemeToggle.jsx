import React, { useState, useEffect } from "react";

function ThemeToggle() {
  // Get saved theme from localStorage or default to light
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Update document body class and save theme to localStorage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
      color: theme === "light" ? "#222" : "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      transition: "0.3s"
    }}>
      <h1>{theme === "light" ? "Light Mode" : "Dark Mode"}</h1>
      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: theme === "light" ? "#222" : "#f5f5f5",
          color: theme === "light" ? "#f5f5f5" : "#222"
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeToggle;
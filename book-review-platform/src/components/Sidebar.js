import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import { Home, Bookmark, BookOpen, User, Sun } from "lucide-react";
import { getUser } from "../utils/auth";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Bookmark, label: "Saved", path: "/saved" },
  { icon: User, label: "My Reviews", path: "/myreview" },
];

const genreItems = [
  "Fiction",
  "Science",
  "Fantasy",
  "Mystery",
  "History",
  "Business",
  "Cooking",
];

const Sidebar = ({ currentPage, onNavigate, isDarkMode, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from localStorage
    const user = getUser();
    setUserData(user);
    const handleUserUpdated = () => {
      const latest = getUser();
      setUserData(latest);
    };
    const handleStorage = (e) => {
      if (e.key === "bookr_user") {
        handleUserUpdated();
      }
    };
    window.addEventListener("user:updated", handleUserUpdated);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("user:updated", handleUserUpdated);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  function handleClick(item) {
    navigate(item.path);
    if (typeof onNavigate === "function") onNavigate(item.label);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <BookOpen className="book-icon" />
          </div>
          <span className="logo-text">bookr</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.label} className="nav-item">
                <button
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => handleClick(item)}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            );
          })}

          {/* Dark Mode Toggle as Navigation Item */}
          <li className="nav-item">
            <div
              className="nav-link toggle-container"
              onClick={() => {
                if (typeof onToggleDarkMode === "function") onToggleDarkMode();
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (typeof onToggleDarkMode === "function")
                    onToggleDarkMode();
                }
              }}
              aria-label="Toggle theme"
            >
              <div className="toggle-content">
                <Sun className="nav-icon" />
                <span className="nav-label">
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </span>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={() => {}}
                  className="toggle-input"
                  tabIndex={-1}
                />
                <div className="toggle-slider"></div>
              </div>
            </div>
          </li>
        </ul>

        <div className="sidebar-divider"></div>

        <div className="sidebar-section-label">Genres</div>
        <ul className="genre-list">
          {genreItems.map((genre) => {
            const path = `/category/${genre.toLowerCase()}`;
            const isActive = location.pathname === path;
            return (
              <li key={genre} className="nav-item">
                <button
                  className={`nav-link genre-link ${isActive ? "active" : ""}`}
                  onClick={() => navigate(path)}
                >
                  <span className="nav-label">{genre}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div
          className="user-info"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/profile")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/profile");
            }
          }}
          aria-label="Open profile"
        >
          <div className="avatar">
            <User className="avatar-icon" />
          </div>
          <div className="user-meta">
            <div className="user-name">{userData?.name || "Guest"}</div>
            <div className="user-handle">@{userData?.username || "guest"}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

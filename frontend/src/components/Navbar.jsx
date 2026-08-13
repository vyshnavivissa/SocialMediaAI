import { NavLink } from "react-router-dom";
import { FaMagic, FaChartLine, FaHistory, FaSlidersH, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="brand">
          <div className="brand-icon">
            <FaMagic />
          </div>
          <div>
            <span className="brand-text">SocialAI</span>
          </div>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <FaChartLine style={{ fontSize: "12px" }} /> Dashboard
            </span>
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => (isActive ? "active" : "")}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <FaHistory style={{ fontSize: "12px" }} /> History
            </span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <FaSlidersH style={{ fontSize: "12px" }} /> Settings
            </span>
          </NavLink>

          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginLeft: "0.5rem", paddingLeft: "0.75rem", borderLeft: "1px solid var(--border-subtle)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--primary-600)", fontSize: "0.85rem", fontWeight: "600" }}>
                <FaUserCircle style={{ color: "var(--accent-purple)" }} /> {user.username}
              </span>
              <button
                onClick={logout}
                title="Sign Out"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "#ef4444",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontWeight: "600"
                }}
              >
                <FaSignOutAlt /> Exit
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
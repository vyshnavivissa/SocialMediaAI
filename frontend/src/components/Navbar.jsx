import { NavLink } from "react-router-dom";
import { FaMagic, FaChartLine, FaHistory, FaSlidersH } from "react-icons/fa";

function Navbar() {
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
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
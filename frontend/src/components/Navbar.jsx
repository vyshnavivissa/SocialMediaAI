import { NavLink } from "react-router-dom";
import { FaMagic, FaChartLine, FaCalendarAlt, FaHistory, FaSlidersH, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div>
        <NavLink to="/" className="sidebar-brand">
          <div className="brand-icon">
            <FaMagic />
          </div>
          <div className="brand-info">
            <span className="brand-text">SocialAI</span>
            <span className="brand-subtext">AI Publisher</span>
          </div>
        </NavLink>

        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
            <FaMagic /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
            <FaChartLine /> <span>Analytics</span>
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
            <FaCalendarAlt /> <span>Calendar</span>
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
            <FaHistory /> <span>History</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
            <FaSlidersH /> <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {user && (
        <div className="sidebar-footer">
          <div className="user-profile">
            <FaUserCircle className="user-avatar" />
            <div className="user-info">
              <span className="username">{user.username}</span>
              <span className="user-role">Free Account</span>
            </div>
          </div>
          <button onClick={logout} className="logout-btn" title="Sign Out">
            <FaSignOutAlt /> Exit
          </button>
        </div>
      )}
    </aside>
  );
}

export default Navbar;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaMagic, FaLock, FaUser } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      toast.success("Welcome back to SocialAI!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8fafc" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "2.5rem", background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "52px", height: "52px", margin: "0 auto 1rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "24px", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)" }}>
            <FaMagic />
          </div>
          <h2 style={{ color: "#0f172a", fontSize: "1.75rem", fontWeight: "800", marginBottom: "0.5rem" }}>Sign in to SocialAI</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Enter your account credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "#334155", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>Username</label>
            <div style={{ position: "relative" }}>
              <FaUser style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                style={{ width: "100%", padding: "0.75rem 0.75rem 0.75rem 2.6rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", color: "#0f172a", outline: "none", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "#334155", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>Password</label>
            <div style={{ position: "relative" }}>
              <FaLock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{ width: "100%", padding: "0.75rem 0.75rem 0.75rem 2.6rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", color: "#0f172a", outline: "none", fontSize: "14px" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "0.85rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "15px", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.25)" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.9rem", marginTop: "1.5rem" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: "600" }}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaMagic, FaLock, FaUser, FaEnvelope } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirm) {
      return toast.error("Passwords do not match!");
    }
    setLoading(true);
    try {
      await register(formData);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      const errors = err.response?.data;
      if (errors) {
        const firstError = Object.values(errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8fafc" }}>
      <div style={{ width: "100%", maxWidth: "440px", padding: "2.5rem", background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "52px", height: "52px", margin: "0 auto 1rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "24px", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)" }}>
            <FaMagic />
          </div>
          <h2 style={{ color: "#0f172a", fontSize: "1.75rem", fontWeight: "800", marginBottom: "0.5rem" }}>Create SocialAI Account</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Get started with multi-platform AI publishing</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.1rem" }}>
            <label style={{ display: "block", color: "#334155", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.4rem" }}>Username</label>
            <div style={{ position: "relative" }}>
              <FaUser style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose username"
                style={{ width: "100%", padding: "0.7rem 0.7rem 0.7rem 2.6rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", color: "#0f172a", outline: "none", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.1rem" }}>
            <label style={{ display: "block", color: "#334155", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.4rem" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <FaEnvelope style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={{ width: "100%", padding: "0.7rem 0.7rem 0.7rem 2.6rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", color: "#0f172a", outline: "none", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.1rem" }}>
            <label style={{ display: "block", color: "#334155", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.4rem" }}>Password</label>
            <div style={{ position: "relative" }}>
              <FaLock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                style={{ width: "100%", padding: "0.7rem 0.7rem 0.7rem 2.6rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", color: "#0f172a", outline: "none", fontSize: "14px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "#334155", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.4rem" }}>Confirm Password</label>
            <div style={{ position: "relative" }}>
              <FaLock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="password"
                name="password_confirm"
                required
                minLength={6}
                value={formData.password_confirm}
                onChange={handleChange}
                placeholder="Confirm password"
                style={{ width: "100%", padding: "0.7rem 0.7rem 0.7rem 2.6rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", color: "#0f172a", outline: "none", fontSize: "14px" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "0.85rem", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "15px", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.25)" }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.9rem", marginTop: "1.5rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: "600" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

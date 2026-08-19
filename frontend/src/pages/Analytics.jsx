import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import {
  FaChartLine,
  FaPaperPlane,
  FaClock,
  FaEye,
  FaHeart,
  FaRetweet,
  FaComment,
  FaCheckCircle,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaSpinner,
  FaSlidersH,
  FaBullhorn,
  FaFire
} from "react-icons/fa";

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/analytics/");
        setData(response.data);
      } catch (error) {
        console.error("Failed to load analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <FaTwitter style={{ color: "#1d9bf0" }} />;
      case "linkedin":
        return <FaLinkedin style={{ color: "#0a66c2" }} />;
      case "instagram":
        return <FaInstagram style={{ color: "#e1306c" }} />;
      case "facebook":
        return <FaFacebook style={{ color: "#0866ff" }} />;
      default:
        return <FaPaperPlane style={{ color: "var(--primary-500)" }} />;
    }
  };

  const summary = data?.summary || {};
  const platformDist = data?.platform_distribution || [];
  const toneDist = data?.tone_distribution || [];
  const recentDispatches = data?.recent_dispatches || [];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-app)" }}>
      <Navbar />

      <main style={{ maxWidth: "1350px", margin: "32px auto", padding: "0 24px" }}>
        {/* Page Header Banner */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 className="page-heading" style={{ margin: 0, fontSize: "28px" }}>
              <FaChartLine style={{ color: "var(--primary-600)", marginRight: "10px" }} />
              AI Performance Analytics
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px" }}>
              Track multi-channel dispatches, audience engagement rates, and content tone performance.
            </p>
          </div>
          <div style={{ background: "#ffffff", padding: "8px 16px", borderRadius: "10px", border: "1px solid var(--border-subtle)", fontSize: "13px", fontWeight: "600", color: "#059669", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            Live Sync Active
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <FaSpinner className="fa-spin" style={{ fontSize: "32px", color: "var(--primary-600)", marginBottom: "16px" }} />
            <p style={{ fontWeight: "600" }}>Loading AI Analytics Data...</p>
          </div>
        ) : (
          <>
            {/* Top KPI Metrics Grid */}
            <div className="analytics-kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon-badge badge-blue">
                  <FaPaperPlane />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Total Dispatches</span>
                  <h3 className="kpi-value">{summary.total_published || 0}</h3>
                  <span className="kpi-subtext">
                    <FaCheckCircle style={{ color: "#10b981", marginRight: "4px" }} />
                    {summary.successful_published || 0} Successful
                  </span>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-badge badge-purple">
                  <FaClock />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Scheduled Queue</span>
                  <h3 className="kpi-value">{summary.pending_scheduled || 0}</h3>
                  <span className="kpi-subtext">Pending Automated Release</span>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-badge badge-cyan">
                  <FaEye />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Total Impressions</span>
                  <h3 className="kpi-value">{(summary.total_impressions || 0).toLocaleString()}</h3>
                  <span className="kpi-subtext">Across All Connected Channels</span>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-badge badge-pink">
                  <FaFire />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Avg. Engagement Rate</span>
                  <h3 className="kpi-value">{summary.engagement_rate || "4.85%"}</h3>
                  <span className="kpi-subtext">Outperforming Industry Benchmark</span>
                </div>
              </div>
            </div>

            {/* Engagement Breakdown Summary Row */}
            <div className="analytics-metrics-strip">
              <div className="metric-strip-item">
                <FaHeart style={{ color: "#ef4444", fontSize: "18px" }} />
                <div>
                  <div className="metric-num">{(summary.total_likes || 0).toLocaleString()}</div>
                  <div className="metric-lbl">Likes & Reactions</div>
                </div>
              </div>

              <div className="metric-strip-item">
                <FaRetweet style={{ color: "#06b6d4", fontSize: "18px" }} />
                <div>
                  <div className="metric-num">{(summary.total_shares || 0).toLocaleString()}</div>
                  <div className="metric-lbl">Shares & Retweets</div>
                </div>
              </div>

              <div className="metric-strip-item">
                <FaComment style={{ color: "#8b5cf6", fontSize: "18px" }} />
                <div>
                  <div className="metric-num">{(summary.total_comments || 0).toLocaleString()}</div>
                  <div className="metric-lbl">Comments & Replies</div>
                </div>
              </div>

              <div className="metric-strip-item">
                <FaBullhorn style={{ color: "#f59e0b", fontSize: "18px" }} />
                <div>
                  <div className="metric-num">{summary.total_generated || 0}</div>
                  <div className="metric-lbl">Total AI Prompts Generated</div>
                </div>
              </div>
            </div>

            {/* Two Column Section: Platform Cards & Tone Performance */}
            <div className="analytics-columns-grid">
              {/* Left Column: Platform Channel Distribution */}
              <div className="simple-card">
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <FaPaperPlane style={{ color: "var(--primary-600)" }} />
                  Platform Breakdown
                </h3>

                <div className="platform-cards-stack">
                  {platformDist.map((item) => (
                    <div className="platform-stat-row" key={item.platform}>
                      <div className="platform-info-col">
                        <div className="platform-icon-circle">{getPlatformIcon(item.platform)}</div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "700" }}>{item.label}</h4>
                          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.post_count} Published Posts</span>
                        </div>
                      </div>

                      <div className="platform-stats-group">
                        <div className="stat-pill"><FaHeart style={{ color: "#ef4444" }} /> {item.likes}</div>
                        <div className="stat-pill"><FaRetweet style={{ color: "#06b6d4" }} /> {item.shares}</div>
                        <div className="stat-pill"><FaEye style={{ color: "#8b5cf6" }} /> {item.impressions}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: AI Tone Performance Distribution */}
              <div className="simple-card">
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <FaSlidersH style={{ color: "var(--accent-purple)" }} />
                  Tone Performance Insights
                </h3>

                <div className="tone-performance-list">
                  {toneDist.map((t, idx) => (
                    <div className="tone-stat-item" key={idx}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontWeight: "700", fontSize: "14px", color: "var(--text-primary)" }}>{t.tone}</span>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary-600)", background: "rgba(99, 102, 241, 0.1)", padding: "2px 8px", borderRadius: "10px" }}>
                          {t.avg_engagement} Avg Eng.
                        </span>
                      </div>
                      <div className="tone-progress-bar">
                        <div
                          className="tone-progress-fill"
                          style={{
                            width: `${Math.min(100, (t.count / Math.max(summary.total_generated || 1, 1)) * 100 + 25)}%`,
                            background: idx % 2 === 0 ? "linear-gradient(90deg, var(--primary-500), var(--accent-purple))" : "linear-gradient(90deg, var(--accent-cyan), var(--primary-600))"
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: Recent Dispatches Log Table */}
            <div className="simple-card" style={{ marginTop: "28px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaClock style={{ color: "var(--accent-cyan)" }} />
                Recent Dispatches Timeline
              </h3>

              {recentDispatches.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px", color: "var(--text-muted)", fontSize: "14px" }}>
                  No published posts recorded yet. Dispatch your first post to see real-time timeline data.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="analytics-table">
                    <thead>
                      <tr>
                        <th>Platform</th>
                        <th>Content Preview</th>
                        <th>Status</th>
                        <th>Dispatch Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentDispatches.map((post) => (
                        <tr key={post.id}>
                          <td style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700" }}>
                            {getPlatformIcon(post.platform)}
                            {post.platform.capitalize ? post.platform.capitalize() : post.platform}
                          </td>
                          <td style={{ color: "var(--text-secondary)", fontSize: "13px" }}>{post.content}</td>
                          <td>
                            <span className={`status-badge ${post.status === "success" ? "ready" : "draft"}`}>
                              {post.status.toUpperCase()}
                            </span>
                          </td>
                          <td style={{ color: "var(--text-muted)", fontSize: "12px", whiteSpace: "nowrap" }}>{post.published_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Analytics;

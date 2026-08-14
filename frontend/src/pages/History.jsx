import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { FaCalendarAlt, FaCheckCircle, FaExclamationCircle, FaClock, FaHistory, FaQuoteLeft } from "react-icons/fa";

function History() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get("/history/");
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                <div className="simple-card">
                    <h1>Post History</h1>
                    <p className="page-subtitle">
                        View your generated, published, and scheduled social media dispatches.
                    </p>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
                            <p>Loading post history...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="empty-history" style={{ textAlign: "center", padding: "60px 20px" }}>
                            <FaHistory style={{ fontSize: "40px", color: "var(--text-muted)", marginBottom: "16px" }} />
                            <h2 style={{ color: "var(--text-primary)", fontSize: "20px" }}>No Dispatches Found</h2>
                            <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>
                                Generate or schedule a social media post to view it here.
                            </p>
                        </div>
                    ) : (
                        <div className="history-grid">
                            {posts.map((post) => (
                                <div key={post.id} className="history-card">
                                    {post.image ? (
                                        <div className="history-media">
                                            <img src={post.image} alt="Generated preview" />
                                        </div>
                                    ) : (
                                        <div className="history-media-placeholder">
                                            <span>📝</span>
                                        </div>
                                    )}

                                    <div className="history-body">
                                        <div className="history-date">
                                            <FaCalendarAlt style={{ marginRight: "4px", fontSize: "11px" }} />
                                            {new Date(post.created_at).toLocaleDateString()} at {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>

                                        <div className="history-prompt">
                                            <FaQuoteLeft style={{ marginRight: "6px", fontSize: "10px", color: "var(--primary-500)" }} />
                                            "{post.prompt}"
                                        </div>

                                        <div className="history-caption-box">
                                            {post.master_caption}
                                            {post.hashtags && post.hashtags.length > 0 && (
                                                <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
                                                    {post.hashtags.map((h, i) => (
                                                        <span key={i} className="hashtag-pill" style={{ fontSize: "10px", padding: "2px 6px" }}>
                                                            #{h.replace(/^#/, '')}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ marginTop: "auto" }}>
                                            <strong style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                                                Publishing Status:
                                            </strong>
                                            {post.published_posts && post.published_posts.length > 0 ? (
                                                <div className="history-status-pills">
                                                    {post.published_posts.map((pub, idx) => {
                                                        const isSuccess = pub.status === "success";
                                                        return (
                                                            <span
                                                                key={idx}
                                                                className={`pub-pill ${isSuccess ? "success" : "failed"}`}
                                                            >
                                                                {isSuccess ? <FaCheckCircle /> : <FaExclamationCircle />}
                                                                {pub.platform.toUpperCase()}: {pub.status}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic" }}>
                                                    Not published yet
                                                </span>
                                            )}
                                        </div>

                                        {post.scheduled_posts && post.scheduled_posts.length > 0 && (
                                            <div style={{ marginTop: "14px", borderTop: "1px solid var(--border-subtle)", paddingTop: "10px" }}>
                                                <strong style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                                                    Scheduled Runs:
                                                </strong>
                                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                    {post.scheduled_posts.map((sch, idx) => (
                                                        <div key={idx} style={{ fontSize: "12px", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                            <span>
                                                                <FaClock style={{ marginRight: "4px", fontSize: "10px" }} />
                                                                {new Date(sch.scheduled_time).toLocaleDateString()}
                                                            </span>
                                                            <span className={`pub-pill ${sch.status === "pending" ? "pending" : sch.status === "published" ? "success" : "failed"}`}>
                                                                {sch.status.toUpperCase()}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default History;
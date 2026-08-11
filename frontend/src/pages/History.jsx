import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function History() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/history/`
                );
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
        <>
            <Navbar />

            <main className="simple-page">
                <div className="simple-card" style={{ maxWidth: "1200px", width: "100%" }}>
                    <h1>Post History</h1>
                    <p style={{ marginBottom: "30px", color: "rgba(255, 255, 255, 0.7)" }}>
                        View your previously generated and published social media posts.
                    </p>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "40px" }}>
                            <p>Loading your history...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="empty-history" style={{ textAlign: "center", padding: "40px" }}>
                            <h2>No posts available</h2>
                            <p>Generate or schedule a social media post to view it here.</p>
                        </div>
                    ) : (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                            gap: "24px",
                            width: "100%"
                        }}>
                            {posts.map((post) => (
                                <div key={post.id} style={{
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    backdropFilter: "blur(10px)",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
                                    textAlign: "left"
                                }}>
                                    {post.image ? (
                                        <div style={{ height: "180px", overflow: "hidden", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                                            <img
                                                src={post.image}
                                                alt="Generated preview"
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </div>
                                    ) : (
                                        <div style={{
                                            height: "180px",
                                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                                        }}>
                                            <span style={{ fontSize: "3rem" }}>📝</span>
                                        </div>
                                    )}

                                    <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                        <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px" }}>
                                            Generated on {new Date(post.created_at).toLocaleDateString()} at {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>

                                        <div style={{ marginBottom: "12px" }}>
                                            <strong style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)" }}>Prompt: </strong>
                                            <span style={{ fontSize: "0.9rem", fontStyle: "italic", color: "rgba(255, 255, 255, 0.7)" }}>
                                                "{post.prompt}"
                                            </span>
                                        </div>

                                        <div style={{
                                            maxHeight: "120px",
                                            overflowY: "auto",
                                            fontSize: "0.9rem",
                                            color: "#e2e8f0",
                                            background: "rgba(0, 0, 0, 0.2)",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            marginBottom: "16px",
                                            flexGrow: 1
                                        }}>
                                            {post.master_caption}
                                            {post.hashtags && post.hashtags.length > 0 && (
                                                <div style={{ marginTop: "8px", color: "#63b3ed", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                                    {post.hashtags.map((h, i) => <span key={i}>#{h}</span>)}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <strong style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.8)", display: "block", marginBottom: "8px" }}>
                                                Publishing Status:
                                            </strong>
                                            {post.published_posts && post.published_posts.length > 0 ? (
                                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                    {post.published_posts.map((pub, idx) => (
                                                        <span
                                                            key={idx}
                                                            style={{
                                                                padding: "4px 10px",
                                                                borderRadius: "20px",
                                                                fontSize: "0.8rem",
                                                                fontWeight: "600",
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                gap: "4px",
                                                                background: pub.status === "success" ? "rgba(72, 187, 120, 0.2)" : "rgba(245, 101, 101, 0.2)",
                                                                color: pub.status === "success" ? "#48bb78" : "#f56565",
                                                                border: pub.status === "success" ? "1px solid rgba(72, 187, 120, 0.4)" : "1px solid rgba(245, 101, 101, 0.4)"
                                                            }}
                                                        >
                                                            {pub.platform.toUpperCase()}: {pub.status}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.4)", fontStyle: "italic" }}>
                                                    Not published yet
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default History;
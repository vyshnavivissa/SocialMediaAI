import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import {
    FaCalendarAlt,
    FaChevronLeft,
    FaChevronRight,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaClock,
    FaCheckCircle,
    FaExclamationCircle,
    FaTrash,
    FaEdit,
    FaTimes,
    FaSpinner,
    FaImage
} from "react-icons/fa";

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [scheduledPosts, setScheduledPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newTime, setNewTime] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchScheduledPosts();
    }, []);

    const fetchScheduledPosts = async () => {
        try {
            setLoading(true);
            const response = await api.get("/schedule/history/");
            setScheduledPosts(response.data || []);
        } catch (error) {
            console.error("Failed to fetch schedule:", error);
            toast.error("Could not load scheduled calendar.");
        } finally {
            setLoading(false);
        }
    };

    const getPlatformIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case "twitter":
                return <FaTwitter style={{ color: "#1d9bf0" }} />;
            case "facebook":
                return <FaFacebook style={{ color: "#0866ff" }} />;
            case "instagram":
                return <FaInstagram style={{ color: "#e1306c" }} />;
            case "linkedin":
                return <FaLinkedin style={{ color: "#0a66c2" }} />;
            default:
                return null;
        }
    };

    // Calendar Math
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const today = () => {
        setCurrentDate(new Date());
    };

    // Filter posts for a specific day in current month
    const getPostsForDay = (dayNum) => {
        return scheduledPosts.filter((post) => {
            if (!post.scheduled_time) return false;
            const pDate = new Date(post.scheduled_time);
            return (
                pDate.getFullYear() === year &&
                pDate.getMonth() === month &&
                pDate.getDate() === dayNum
            );
        });
    };

    const handleReschedule = async () => {
        if (!selectedPost || !newTime) {
            toast.error("Select a valid future date and time.");
            return;
        }

        try {
            setUpdating(true);
            const isoTime = new Date(newTime).toISOString();
            await api.patch(`/schedule/${selectedPost.id}/`, {
                scheduled_time: isoTime,
            });
            toast.success("Post rescheduled successfully!");
            setSelectedPost(null);
            fetchScheduledPosts();
        } catch (error) {
            console.error("Reschedule failed:", error);
            toast.error("Failed to reschedule post.");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this scheduled post?")) return;

        try {
            await api.delete(`/schedule/${postId}/`);
            toast.success("Scheduled post removed.");
            setSelectedPost(null);
            fetchScheduledPosts();
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete post.");
        }
    };

    // Build grid cells
    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        calendarDays.push(d);
    }

    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <section>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                        <h1 className="page-heading" style={{ margin: 0 }}>
                            <FaCalendarAlt style={{ color: "var(--accent-purple)", marginRight: "8px" }} />
                            Content Calendar
                            <span className="page-heading-badge">{scheduledPosts.length} Scheduled</span>
                        </h1>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <button
                                type="button"
                                onClick={today}
                                style={{
                                    padding: "0.5rem 0.85rem",
                                    borderRadius: "8px",
                                    background: "rgba(255, 255, 255, 0.08)",
                                    border: "1px solid var(--border-subtle)",
                                    color: "var(--text-main)",
                                    fontWeight: "600",
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                }}
                            >
                                Today
                            </button>
                            <button
                                type="button"
                                onClick={prevMonth}
                                style={{
                                    padding: "0.5rem 0.75rem",
                                    borderRadius: "8px",
                                    background: "rgba(255, 255, 255, 0.08)",
                                    border: "1px solid var(--border-subtle)",
                                    color: "var(--text-main)",
                                    cursor: "pointer",
                                }}
                            >
                                <FaChevronLeft />
                            </button>
                            <span style={{ fontSize: "1.1rem", fontWeight: "700", minWidth: "160px", textAlign: "center" }}>
                                {monthNames[month]} {year}
                            </span>
                            <button
                                type="button"
                                onClick={nextMonth}
                                style={{
                                    padding: "0.5rem 0.75rem",
                                    borderRadius: "8px",
                                    background: "rgba(255, 255, 255, 0.08)",
                                    border: "1px solid var(--border-subtle)",
                                    color: "var(--text-main)",
                                    cursor: "pointer",
                                }}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                            <FaSpinner className="fa-spin" style={{ fontSize: "2rem", marginBottom: "1rem" }} />
                            <p>Loading scheduled calendar...</p>
                        </div>
                    ) : (
                        <div
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-subtle)",
                                borderRadius: "16px",
                                padding: "1.25rem",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                            }}
                        >
                            {/* Days of week header */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "8px", textAlign: "center", fontWeight: "700", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                                <div>SUN</div>
                                <div>MON</div>
                                <div>TUE</div>
                                <div>WED</div>
                                <div>THU</div>
                                <div>FRI</div>
                                <div>SAT</div>
                            </div>

                            {/* Calendar Grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
                                {calendarDays.map((dayNum, idx) => {
                                    if (dayNum === null) {
                                        return <div key={`empty-${idx}`} style={{ minHeight: "100px", background: "rgba(255,255,255,0.01)", borderRadius: "8px" }} />;
                                    }

                                    const dayPosts = getPostsForDay(dayNum);
                                    const isToday =
                                        new Date().getDate() === dayNum &&
                                        new Date().getMonth() === month &&
                                        new Date().getFullYear() === year;

                                    return (
                                        <div
                                            key={`day-${dayNum}`}
                                            style={{
                                                minHeight: "115px",
                                                background: isToday ? "rgba(139, 92, 246, 0.08)" : "rgba(255,255,255,0.03)",
                                                border: isToday ? "1px solid var(--accent-purple)" : "1px solid var(--border-subtle)",
                                                borderRadius: "10px",
                                                padding: "0.5rem",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "4px",
                                            }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                        fontSize: "0.85rem",
                                                        color: isToday ? "#c084fc" : "var(--text-main)",
                                                    }}
                                                >
                                                    {dayNum}
                                                </span>
                                                {dayPosts.length > 0 && (
                                                    <span style={{ fontSize: "0.7rem", padding: "1px 6px", borderRadius: "10px", background: "rgba(139,92,246,0.3)", color: "#c084fc", fontWeight: "700" }}>
                                                        {dayPosts.length} post{dayPosts.length > 1 ? "s" : ""}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Scheduled Post Pills inside day cell */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto", maxHeight: "80px" }}>
                                                {dayPosts.map((post) => (
                                                    <div
                                                        key={post.id}
                                                        onClick={() => {
                                                            setSelectedPost(post);
                                                            const d = new Date(post.scheduled_time);
                                                            const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
                                                            setNewTime(localIso);
                                                        }}
                                                        style={{
                                                            background: post.status === "published"
                                                                ? "rgba(34, 197, 94, 0.15)"
                                                                : post.status === "failed"
                                                                    ? "rgba(239, 68, 68, 0.15)"
                                                                    : "rgba(59, 130, 246, 0.15)",
                                                            border: "1px solid rgba(255,255,255,0.1)",
                                                            borderRadius: "6px",
                                                            padding: "4px 6px",
                                                            fontSize: "0.72rem",
                                                            cursor: "pointer",
                                                            transition: "transform 0.15s ease",
                                                        }}
                                                    >
                                                        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: "600" }}>
                                                            {post.platforms?.map((p) => (
                                                                <span key={p}>{getPlatformIcon(p)}</span>
                                                            ))}
                                                            <span style={{ marginLeft: "auto", fontSize: "0.68rem", opacity: 0.8 }}>
                                                                {new Date(post.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>
                                                        <div style={{ whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "anywhere", marginTop: "2px", opacity: 0.9, lineHeight: "1.35" }}>
                                                            {post.generated_post_details?.master_caption || `Post #${post.generated_post}`}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Reschedule Modal */}
                    {selectedPost && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "rgba(0,0,0,0.75)",
                                backdropFilter: "blur(4px)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 1000,
                                padding: "1rem",
                            }}
                        >
                            <div
                                style={{
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border-subtle)",
                                    borderRadius: "16px",
                                    padding: "1.5rem",
                                    maxWidth: "500px",
                                    width: "100%",
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                                    position: "relative",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelectedPost(null)}
                                    style={{
                                        position: "absolute",
                                        top: "1rem",
                                        right: "1rem",
                                        background: "transparent",
                                        border: "none",
                                        color: "var(--text-muted)",
                                        fontSize: "1.2rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    <FaTimes />
                                </button>

                                <h3 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                                    <FaEdit style={{ color: "var(--accent-purple)" }} /> Scheduled Post Details
                                </h3>

                                <div style={{ marginBottom: "1rem", background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "10px" }}>
                                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                                        Target Platforms:
                                    </div>
                                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                                        {selectedPost.platforms?.map((p) => (
                                            <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.08)", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem" }}>
                                                {getPlatformIcon(p)} {p}
                                            </span>
                                        ))}
                                    </div>

                                    {selectedPost.generated_post_details?.master_caption && (
                                        <div style={{ fontSize: "0.85rem", color: "var(--text-main)", marginTop: "8px", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                                            "{selectedPost.generated_post_details.master_caption}"
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: "1.25rem" }}>
                                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                                        Reschedule Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={newTime}
                                        onChange={(e) => setNewTime(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "0.6rem",
                                            borderRadius: "8px",
                                            border: "1px solid var(--border-subtle)",
                                            background: "rgba(20,20,30,0.9)",
                                            color: "var(--text-main)",
                                            fontSize: "0.9rem",
                                        }}
                                    />
                                </div>

                                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(selectedPost.id)}
                                        style={{
                                            padding: "0.6rem 1rem",
                                            borderRadius: "8px",
                                            background: "rgba(239, 68, 68, 0.15)",
                                            color: "#ef4444",
                                            border: "1px solid rgba(239, 68, 68, 0.3)",
                                            fontWeight: "600",
                                            fontSize: "0.85rem",
                                            cursor: "pointer",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                        }}
                                    >
                                        <FaTrash /> Delete
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleReschedule}
                                        disabled={updating}
                                        style={{
                                            padding: "0.6rem 1.25rem",
                                            borderRadius: "8px",
                                            background: "var(--primary-600)",
                                            color: "#fff",
                                            border: "none",
                                            fontWeight: "600",
                                            fontSize: "0.85rem",
                                            cursor: "pointer",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                        }}
                                    >
                                        {updating ? <FaSpinner className="fa-spin" /> : <FaClock />} Save Reschedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Calendar;

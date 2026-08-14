import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaMagic, FaPaperPlane, FaClock, FaTrash, FaSpinner, FaBookmark, FaGlobe, FaBullhorn, FaUserTag } from "react-icons/fa";
import PlatformSelector from "./PlatformSelector";

const TONE_OPTIONS = [
    { id: "casual", label: "Casual" },
    { id: "professional", label: "Professional" },
    { id: "witty", label: "Witty / Humorous" },
    { id: "promotional", label: "Promotional" },
    { id: "storytelling", label: "Storytelling" },
    { id: "urgent", label: "Urgent / FOMO" },
];

const LANGUAGE_OPTIONS = [
    "English",
    "Spanish",
    "French",
    "German",
    "Hindi",
    "Japanese",
    "Portuguese",
];

function ComposePost({
    image,
    setImage,
    prompt,
    setPrompt,
    platforms,
    setPlatforms,
    generatedData,
    setGeneratedData,
}) {
    const [loading, setLoading] = useState(false);
    const [savingDraft, setSavingDraft] = useState(false);
    const [scheduledTime, setScheduledTime] = useState("");
    const [tone, setTone] = useState("casual");
    const [targetAudience, setTargetAudience] = useState("General Audience");
    const [language, setLanguage] = useState("English");

    // Generate AI content
    const generateContent = async (isDraft = false) => {
        if (!prompt.trim()) {
            toast.error("Enter a content idea.");
            return;
        }

        if (platforms.length === 0) {
            toast.error("Select at least one platform.");
            return;
        }

        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("tone", tone);
        formData.append("target_audience", targetAudience);
        formData.append("language", language);
        formData.append("is_draft", isDraft);

        platforms.forEach((platform) => {
            formData.append("platforms", platform);
        });

        if (image) {
            formData.append("image", image);
        }

        try {
            if (isDraft) setSavingDraft(true);
            else setLoading(true);

            const response = await api.post("/generate/", formData);
            setGeneratedData(response.data);
            toast.success(isDraft ? "Saved as draft post!" : "AI content generated!");
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(
                error.response?.data?.message || "Content generation failed."
            );
        } finally {
            setLoading(false);
            setSavingDraft(false);
        }
    };

    // Publish immediately
    const publishPost = async () => {
        if (!generatedData) {
            toast.error("Generate content first.");
            return;
        }

        if (platforms.length === 0) {
            toast.error("Select at least one platform.");
            return;
        }

        try {
            const response = await api.post("/publish/", {
                generated_post: generatedData.id,
                platforms: platforms,
            });

            const results = response.data?.results || {};
            let allSuccess = true;
            let failureMessages = [];

            Object.entries(results).forEach(([platform, res]) => {
                if (res.status === "failed") {
                    allSuccess = false;
                    failureMessages.push(`${platform.toUpperCase()}: ${res.reason || "unknown error"}`);
                }
            });

            if (allSuccess) {
                toast.success("Post published successfully!");
            } else {
                toast.error(
                    <div>
                        <strong>Some publications failed:</strong>
                        <ul style={{ margin: "5px 0 0 15px", padding: 0 }}>
                            {failureMessages.map((msg, idx) => <li key={idx}>{msg}</li>)}
                        </ul>
                    </div>,
                    { duration: 6000 }
                );
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(
                error.response?.data?.message || "Publishing failed."
            );
        }
    };

    // Schedule post
    const schedulePost = async () => {
        if (!generatedData) {
            toast.error("Generate content first.");
            return;
        }

        if (platforms.length === 0) {
            toast.error("Select at least one platform.");
            return;
        }

        if (!scheduledTime) {
            toast.error("Select a future date and time.");
            return;
        }

        const selectedDate = new Date(scheduledTime);

        if (selectedDate <= new Date()) {
            toast.error("Select a future date and time.");
            return;
        }

        try {
            await api.post("/schedule/", {
                generated_post: generatedData.id,
                scheduled_time: selectedDate.toISOString(),
                platforms: platforms,
            });

            toast.success("Post scheduled successfully!");
            setScheduledTime("");
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(
                error.response?.data?.message || "Scheduling failed."
            );
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "";
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(1)} KB`;
        return `${(kb / 1024).toFixed(1)} MB`;
    };

    return (
        <section>
            <h1 className="page-heading">
                Compose Post <span className="page-heading-badge">Step 1 of 2</span>
            </h1>

            <div className="compose-card">
                <PlatformSelector
                    platforms={platforms}
                    setPlatforms={setPlatforms}
                />

                <div className="form-section">
                    <label className="section-label">
                        <span className="step-num">2</span> Content Idea & Prompt
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(event) => setPrompt(event.target.value)}
                        placeholder="Describe the content idea (e.g. 'Announce our new AI feature release with high energy and hashtags')..."
                        rows={4}
                    />
                    <div style={{ textAlign: "right", fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                        {prompt.length} characters
                    </div>
                </div>

                <div className="form-section" style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-subtle)", marginBottom: "1.25rem" }}>
                    <label className="section-label" style={{ marginBottom: "0.75rem" }}>
                        <span className="step-num">3</span> AI Customization & Persona
                    </label>

                    <div style={{ marginBottom: "1rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                            Tone of Voice
                        </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {TONE_OPTIONS.map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setTone(t.id)}
                                    style={{
                                        padding: "0.4rem 0.8rem",
                                        borderRadius: "20px",
                                        fontSize: "0.82rem",
                                        fontWeight: "600",
                                        border: tone === t.id ? "1px solid var(--accent-purple)" : "1px solid var(--border-subtle)",
                                        background: tone === t.id ? "rgba(139, 92, 246, 0.2)" : "rgba(255, 255, 255, 0.05)",
                                        color: tone === t.id ? "#c084fc" : "var(--text-main)",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                            <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>
                                <FaUserTag style={{ marginRight: "4px" }} /> Target Audience
                            </label>
                            <input
                                type="text"
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                                placeholder="e.g. Tech Founders, Gen Z, Marketers"
                                style={{
                                    width: "100%",
                                    padding: "0.5rem 0.75rem",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border-subtle)",
                                    background: "rgba(0,0,0,0.2)",
                                    color: "var(--text-main)",
                                    fontSize: "0.85rem",
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>
                                <FaGlobe style={{ marginRight: "4px" }} /> Output Language
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.5rem 0.75rem",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border-subtle)",
                                    background: "#181824",
                                    color: "#ffffff",
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                }}
                            >
                                {LANGUAGE_OPTIONS.map((lang) => (
                                    <option key={lang} value={lang} style={{ background: "#181824", color: "#ffffff" }}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <label className="section-label">
                        <span className="step-num">4</span> Media Asset (Optional)
                    </label>

                    {image ? (
                        <div className="uploaded-preview-badge">
                            <img src={URL.createObjectURL(image)} alt="Preview thumbnail" />
                            <div className="file-info">
                                <div className="file-name">{image.name}</div>
                                <div className="file-size">{formatFileSize(image.size)}</div>
                            </div>
                            <button
                                type="button"
                                className="remove-file-btn"
                                onClick={() => setImage(null)}
                                title="Remove image"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ) : (
                        <label className="upload-area">
                            <FaCloudUploadAlt />
                            <span style={{ fontWeight: "600" }}>Click or drag to upload media</span>
                            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Supports PNG, JPG, WEBP</span>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) setImage(file);
                                }}
                            />
                        </label>
                    )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "0.75rem" }}>
                    <button
                        type="button"
                        className="generate-button"
                        onClick={() => generateContent(false)}
                        disabled={loading || savingDraft}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="fa-spin" style={{ animation: "spin 1s linear infinite" }} /> Generating AI Magic...
                            </>
                        ) : (
                            <>
                                <FaMagic /> Generate AI Content
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => generateContent(true)}
                        disabled={loading || savingDraft}
                        style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            color: "var(--text-main)",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "10px",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "0.75rem 1rem",
                        }}
                    >
                        {savingDraft ? <FaSpinner className="fa-spin" /> : <FaBookmark />} Save Draft
                    </button>
                </div>

                <div className="action-divider">
                    <span>Dispatch Actions</span>
                </div>

                <button
                    type="button"
                    className="publish-button"
                    onClick={publishPost}
                >
                    <FaPaperPlane /> Publish Post Now
                </button>

                <div className="schedule-row">
                    <input
                        type="datetime-local"
                        value={scheduledTime}
                        onChange={(event) => setScheduledTime(event.target.value)}
                    />
                    <button
                        type="button"
                        className="schedule-button"
                        onClick={schedulePost}
                    >
                        <FaClock /> Schedule
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ComposePost;
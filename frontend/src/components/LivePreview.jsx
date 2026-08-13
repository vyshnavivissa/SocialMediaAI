import { useEffect, useState } from "react";
import {
    FaImage,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaHeart,
    FaComment,
    FaRetweet,
    FaShare,
    FaBookmark,
    FaEye,
    FaRobot
} from "react-icons/fa";

function LivePreview({ image, generatedData, platforms }) {
    const [editablePosts, setEditablePosts] = useState({});
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        if (generatedData?.generated_posts) {
            setEditablePosts(generatedData.generated_posts);
        }
    }, [generatedData]);

    const handleContentChange = (platform, value) => {
        setEditablePosts((previousPosts) => ({
            ...previousPosts,
            [platform]: value,
        }));
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

    const displayedPlatforms = activeTab === "all" 
        ? platforms 
        : platforms.filter(p => p.toLowerCase() === activeTab.toLowerCase());

    return (
        <section>
            <h1 className="page-heading">
                Live Preview <span className="page-heading-badge">Step 2 of 2</span>
            </h1>

            <div className="preview-card">
                {/* Platform Filter Tabs */}
                <div className="preview-tabs">
                    <button
                        type="button"
                        className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
                        onClick={() => setActiveTab("all")}
                    >
                        <FaEye /> All Previews ({platforms.length})
                    </button>
                    {platforms.map((p) => (
                        <button
                            type="button"
                            key={p}
                            className={`tab-btn ${activeTab === p.toLowerCase() ? "active" : ""}`}
                            onClick={() => setActiveTab(p.toLowerCase())}
                        >
                            {getPlatformIcon(p)} {p}
                        </button>
                    ))}
                </div>

                {!generatedData ? (
                    <div className="preview-placeholder">
                        <FaRobot />
                        <h3 style={{ color: "var(--text-primary)", marginBottom: "6px" }}>No AI Content Generated Yet</h3>
                        <p style={{ fontSize: "13px" }}>Select target social platforms and describe your content idea to generate previews.</p>
                    </div>
                ) : (
                    <>
                        {/* Master Caption Box */}
                        <div className="master-caption-box">
                            <div className="master-caption-title">Master Caption Overview</div>
                            <div className="master-caption-text">{generatedData.master_caption}</div>
                            {generatedData.hashtags && generatedData.hashtags.length > 0 && (
                                <div className="hashtags-box">
                                    {generatedData.hashtags.map((tag, idx) => (
                                        <span key={idx} className="hashtag-pill">#{tag.replace(/^#/, '')}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Social Network Post Mockups */}
                        {displayedPlatforms.map((platform) => (
                            <div key={platform} className="mockup-card">
                                <div className="mockup-header">
                                    <div className="mockup-avatar">S</div>
                                    <div className="mockup-user-info">
                                        <div className="mockup-name">
                                            SocialAI Brand {getPlatformIcon(platform)}
                                        </div>
                                        <div className="mockup-handle">@socialai_official • Just now</div>
                                    </div>
                                    <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--primary-500)", fontWeight: "700" }}>
                                        EDITABLE
                                    </span>
                                </div>

                                <textarea
                                    value={editablePosts[platform] || ""}
                                    onChange={(e) => handleContentChange(platform, e.target.value)}
                                    placeholder={`Customized content for ${platform}...`}
                                    rows={4}
                                    style={{
                                        width: "100%",
                                        background: "transparent",
                                        border: "1px dashed var(--border-subtle)",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        color: "var(--text-primary)",
                                        marginBottom: "12px",
                                        resize: "vertical"
                                    }}
                                />

                                {/* Media Preview Area inside mockup */}
                                {image ? (
                                    <div className="mockup-media">
                                        <img src={URL.createObjectURL(image)} alt="Post attachment preview" />
                                    </div>
                                ) : generatedData?.image_path ? (
                                    <div className="mockup-media">
                                        <img src={generatedData.image_path.startsWith("http") ? generatedData.image_path : `${import.meta.env.VITE_API_URL}${generatedData.image_path}`} alt="AI Generated media preview" />
                                    </div>
                                ) : (
                                    <div className="mockup-media-placeholder">
                                        <FaImage />
                                        <span>No image attached</span>
                                    </div>
                                )}

                                {/* Social engagement actions footer mockup */}
                                <div className="mockup-actions">
                                    <div className="action-item"><FaHeart /> <span>124</span></div>
                                    <div className="action-item"><FaComment /> <span>18</span></div>
                                    <div className="action-item"><FaRetweet /> <span>32</span></div>
                                    <div className="action-item"><FaShare /></div>
                                    <div className="action-item" style={{ marginLeft: "auto" }}><FaBookmark /></div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                <div className="preview-footer">
                    <div>
                        <span style={{ color: "var(--text-muted)", marginRight: "8px" }}>Status:</span>
                        <span className={`status-badge ${generatedData ? "ready" : "draft"}`}>
                            {generatedData ? "Ready to Dispatch" : "Draft"}
                        </span>
                    </div>

                    <div style={{ color: "var(--text-secondary)", fontSize: "12px" }}>
                        {platforms.length > 0 
                            ? `Targeting: ${platforms.join(", ")}`
                            : "No platforms selected"}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LivePreview;
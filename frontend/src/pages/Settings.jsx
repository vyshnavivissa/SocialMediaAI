import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaCheckCircle, FaUnlink, FaLink } from "react-icons/fa";

function Settings() {
    const [connectedPlatforms, setConnectedPlatforms] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch connection status on load
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await api.get("/oauth/status/");
                setConnectedPlatforms(response.data);
            } catch (error) {
                console.error("Failed to fetch connection status:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    // Connect flow
    const handleConnect = async (platform) => {
        try {
            const response = await api.get(`/oauth/${platform}/login/`);
            if (response.data && response.data.login_url) {
                window.location.href = response.data.login_url;
            } else {
                toast.error("Could not retrieve connection URL.");
            }
        } catch (error) {
            console.error(error);
            toast.error(`Failed to initiate ${platform} connection.`);
        }
    };

    // Disconnect flow
    const handleDisconnect = async (platform) => {
        try {
            await api.delete(`/oauth/${platform}/disconnect/`);
            setConnectedPlatforms((prev) => ({
                ...prev,
                [platform]: false,
            }));
            toast.success(`${platform.toUpperCase()} account disconnected.`);
        } catch (error) {
            console.error(error);
            toast.error(`Failed to disconnect ${platform}.`);
        }
    };

    const getIcon = (platformId) => {
        switch (platformId) {
            case "twitter":
                return <FaTwitter style={{ color: "#1d9bf0", fontSize: "20px" }} />;
            case "facebook":
                return <FaFacebook style={{ color: "#0866ff", fontSize: "20px" }} />;
            case "instagram":
                return <FaInstagram style={{ color: "#e1306c", fontSize: "20px" }} />;
            case "linkedin":
                return <FaLinkedin style={{ color: "#0a66c2", fontSize: "20px" }} />;
            default:
                return null;
        }
    };

    const renderSettingItem = (platformName, platformId) => {
        const isConnected = !!connectedPlatforms[platformId];

        return (
            <div className="setting-item" key={platformId}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {getIcon(platformId)}
                    </div>
                    <div className="setting-info">
                        <h3>{platformName}</h3>
                        <span className={isConnected ? "status-connected" : "status-disconnected"}>
                            {isConnected ? (
                                <>
                                    <FaCheckCircle style={{ color: "#10b981" }} /> Connected & Authorized
                                </>
                            ) : (
                                "Not Connected"
                            )}
                        </span>
                    </div>
                </div>

                {isConnected ? (
                    <button
                        type="button"
                        className="disconnect-button"
                        onClick={() => handleDisconnect(platformId)}
                    >
                        <FaUnlink style={{ marginRight: "6px" }} /> Disconnect
                    </button>
                ) : (
                    <button
                        type="button"
                        className="connect-button"
                        onClick={() => handleConnect(platformId)}
                    >
                        <FaLink style={{ marginRight: "6px" }} /> Connect Account
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                <div className="simple-card">
                    <h1>Account Integration Settings</h1>
                    <p className="page-subtitle">
                        Connect your social media accounts to enable one-click publishing and automated dispatches.
                    </p>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                            Loading account connection status...
                        </div>
                    ) : (
                        <div className="settings-list">
                            {renderSettingItem("Twitter / X", "twitter")}
                            {renderSettingItem("Facebook", "facebook")}
                            {renderSettingItem("Instagram", "instagram")}
                            {renderSettingItem("LinkedIn", "linkedin")}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Settings;
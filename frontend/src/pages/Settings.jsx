import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// We'll import axios standardly
import axiosInstance from "axios";
import toast from "react-hot-toast";

function Settings() {
    const [connectedPlatforms, setConnectedPlatforms] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch connection status on load
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axiosInstance.get(
                    `${import.meta.env.VITE_API_URL}/oauth/status/`
                );
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
            const response = await axiosInstance.get(
                `${import.meta.env.VITE_API_URL}/oauth/${platform}/login/`
            );
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
            await axiosInstance.delete(
                `${import.meta.env.VITE_API_URL}/oauth/${platform}/disconnect/`
            );
            setConnectedPlatforms(prev => ({
                ...prev,
                [platform]: false
            }));
            toast.success(`${platform.toUpperCase()} account disconnected.`);
        } catch (error) {
            console.error(error);
            toast.error(`Failed to disconnect ${platform}.`);
        }
    };

    const renderSettingItem = (platformName, platformId) => {
        const isConnected = !!connectedPlatforms[platformId];

        return (
            <div className="setting-item" key={platformId}>
                <div>
                    <h3>{platformName}</h3>
                    <span className={isConnected ? "status-connected" : "status-disconnected"}>
                        {isConnected ? "Account connected" : "Account not connected"}
                    </span>
                </div>
                {isConnected ? (
                    <button 
                        className="disconnect-button"
                        onClick={() => handleDisconnect(platformId)}
                        style={{ backgroundColor: "#ef4444", color: "white", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
                    >
                        Disconnect
                    </button>
                ) : (
                    <button 
                        className="connect-button"
                        onClick={() => handleConnect(platformId)}
                        style={{ backgroundColor: "#3b82f6", color: "white", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
                    >
                        Connect
                    </button>
                )}
            </div>
        );
    };

    return (
        <>
            <Navbar />

            <main className="simple-page">
                <div className="simple-card">
                    <h1>Settings</h1>
                    <p style={{ marginBottom: "20px" }}>
                        Manage your SocialAI application settings and connected social media accounts.
                    </p>

                    {loading ? (
                        <div className="loading-placeholder">Loading account status...</div>
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
        </>
    );
}

export default Settings;
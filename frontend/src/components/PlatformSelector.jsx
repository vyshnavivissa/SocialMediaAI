import {
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaCheck,
} from "react-icons/fa";

function PlatformSelector({ platforms, setPlatforms }) {
    const platformItems = [
        { id: "twitter", name: "Twitter / X", icon: <FaTwitter /> },
        { id: "facebook", name: "Facebook", icon: <FaFacebook /> },
        { id: "instagram", name: "Instagram", icon: <FaInstagram /> },
        { id: "linkedin", name: "LinkedIn", icon: <FaLinkedin /> },
    ];

    const togglePlatform = (platformId) => {
        if (platforms.includes(platformId)) {
            setPlatforms(platforms.filter((item) => item !== platformId));
        } else {
            setPlatforms([...platforms, platformId]);
        }
    };

    return (
        <div>
            <label className="section-label">
                Target Platforms
            </label>

            <div className="platform-grid">
                {platformItems.map((platform) => {
                    const isSelected = platforms.includes(platform.id);
                    return (
                        <button
                            type="button"
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={`platform ${isSelected ? `active ${platform.id}` : ""}`}
                        >
                            {isSelected && (
                                <span className="platform-check">
                                    <FaCheck />
                                </span>
                            )}
                            <span className="platform-icon">{platform.icon}</span>
                            <span style={{ fontSize: "13px", fontWeight: "600" }}>{platform.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default PlatformSelector;
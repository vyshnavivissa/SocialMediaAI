const platformList = [
    "twitter",
    "instagram",
    "linkedin",
    "facebook",
];

function PlatformSelector({ platforms, setPlatforms }) {

    const handleChange = (platform) => {

        if (platforms.includes(platform)) {

            setPlatforms(
                platforms.filter((p) => p !== platform)
            );

        } else {

            setPlatforms(
                [...platforms, platform]
            );

        }

    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mt-6">

            <h2 className="text-lg font-semibold mb-2">
                Select Platforms
            </h2>

            {platformList.map((platform) => (

                <div key={platform} className="mb-2">

                    <label>

                        <input
                            type="checkbox"
                            checked={platforms.includes(platform)}
                            onChange={() => handleChange(platform)}
                        />

                        <span className="ml-2 capitalize">
                            {platform}
                        </span>

                    </label>

                </div>

            ))}

        </div>
    );
}

export default PlatformSelector;
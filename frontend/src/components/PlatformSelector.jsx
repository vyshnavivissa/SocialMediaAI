import {
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";


function PlatformSelector({
    platforms,
    setPlatforms,
}) {

    const platformItems = [

        {
            id: "twitter",
            name: "Twitter",
            icon: <FaTwitter />,
        },

        {
            id: "facebook",
            name: "Facebook",
            icon: <FaFacebook />,
        },

        {
            id: "instagram",
            name: "Instagram",
            icon: <FaInstagram />,
        },

        {
            id: "linkedin",
            name: "LinkedIn",
            icon: <FaLinkedin />,
        },

    ];


    const togglePlatform = (
        platform
    ) => {

        if (
            platforms.includes(
                platform
            )
        ) {

            setPlatforms(

                platforms.filter(

                    item =>
                        item !==
                        platform

                )

            );

        }

        else {

            setPlatforms([

                ...platforms,

                platform,

            ]);

        }

    };


    return (

        <div>

            <label className="section-label">

                1. Select Social Networks

            </label>


            <div className="platform-grid">

                {

                    platformItems.map(

                        platform => (

                            <button

                                type="button"

                                key={
                                    platform.id
                                }

                                onClick={() =>
                                    togglePlatform(
                                        platform.id
                                    )
                                }

                                className={

                                    platforms.includes(
                                        platform.id
                                    )

                                    ? "platform active"

                                    : "platform"

                                }

                            >

                                <span
                                    className="
                                    platform-icon
                                    "
                                >

                                    {
                                        platform.icon
                                    }

                                </span>


                                <span>

                                    {
                                        platform.name
                                    }

                                </span>

                            </button>

                        )

                    )

                }

            </div>

        </div>

    );

}


export default PlatformSelector;
import { useEffect, useState } from "react";

import {
    FaUser,
    FaImage,
} from "react-icons/fa";


function LivePreview({
    image,
    generatedData,
    platforms,
}) {

    const [editablePosts, setEditablePosts] =
        useState({});


    useEffect(() => {

        if (
            generatedData?.generated_posts
        ) {

            setEditablePosts(
                generatedData.generated_posts
            );

        }

    }, [generatedData]);


    const handleContentChange = (
        platform,
        value
    ) => {

        setEditablePosts(
            previousPosts => ({

                ...previousPosts,

                [platform]: value,

            })
        );

    };


    return (

        <section>

            <h1 className="page-heading">

                Live Preview

            </h1>


            <div className="preview-card">


                <div className="profile-row">

                    <div className="profile-icon">

                        <FaUser />

                    </div>


                    <div>

                        <strong>

                            Your Brand Name

                        </strong>

                        <div
                            className="profile-line"
                        />

                    </div>

                </div>


                <div className="media-preview">

                    {

                        image

                        ? (

                            <img

                                src={
                                    URL.createObjectURL(
                                        image
                                    )
                                }

                                alt="Post preview"

                            />

                        )

                        : (

                            <>

                                <FaImage />

                                <span>

                                    Media Preview Area

                                </span>

                            </>

                        )

                    }

                </div>


                {

                    !generatedData

                    ? (

                        <div
                            className="
                            preview-placeholder
                            "
                        >

                            Generate AI content
                            to view platform posts.

                        </div>

                    )

                    : (

                        <>

                            <div
                                className="
                                master-caption
                                "
                            >

                                <h3>

                                    Master Caption

                                </h3>


                                <p>

                                    {
                                        generatedData
                                        .master_caption
                                    }

                                </p>

                            </div>


                            <div
                                className="
                                preview-hashtags
                                "
                            >

                                <h3>

                                    Hashtags

                                </h3>


                                <p>

                                    {

                                        generatedData
                                        .hashtags
                                        ?.join(" ")

                                    }

                                </p>

                            </div>


                            <div
                                className="
                                platform-previews
                                "
                            >

                                {

                                    platforms.map(

                                        platform => (

                                            <div

                                                key={
                                                    platform
                                                }

                                                className="
                                                platform-post
                                                "

                                            >

                                                <div
                                                    className="
                                                    platform-title
                                                    "
                                                >

                                                    <h3>

                                                        {
                                                            platform
                                                        }

                                                    </h3>


                                                    <span>

                                                        Editable

                                                    </span>

                                                </div>


                                                <textarea

                                                    value={

                                                        editablePosts[
                                                            platform
                                                        ]

                                                        || ""

                                                    }

                                                    onChange={

                                                        event =>

                                                            handleContentChange(

                                                                platform,

                                                                event
                                                                .target
                                                                .value

                                                            )

                                                    }

                                                    rows="6"

                                                    className="
                                                    edit-post
                                                    "

                                                />

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        </>

                    )

                }


                <div className="preview-footer">

                    <div>

                        <strong>

                            Status:

                        </strong>


                        <span className="draft">

                            {

                                generatedData

                                ? "Ready"

                                : "Draft"

                            }

                        </span>

                    </div>


                    <div
                        className="
                        selected-platforms
                        "
                    >

                        {

                            platforms.length

                            ? platforms.join(
                                " • "
                            )

                            : "No platform selected"

                        }

                    </div>

                </div>

            </div>

        </section>

    );

}


export default LivePreview;
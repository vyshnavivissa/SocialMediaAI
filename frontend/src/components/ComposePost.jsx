import {
    useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
    FaCloudUploadAlt,
} from "react-icons/fa";

import PlatformSelector
from "./PlatformSelector";


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

    const [
        loading,
        setLoading,
    ] = useState(false);


    const [
        scheduledTime,
        setScheduledTime,
    ] = useState("");


    const generateContent =
        async () => {

        if (!prompt.trim()) {

            toast.error(
                "Enter a content idea."
            );

            return;

        }


        if (
            platforms.length === 0
        ) {

            toast.error(
                "Select a platform."
            );

            return;

        }


        const formData =
            new FormData();


        formData.append(
            "prompt",
            prompt
        );


        platforms.forEach(

            platform => {

                formData.append(
                    "platforms",
                    platform
                );

            }

        );


        if (image) {

            formData.append(
                "image",
                image
            );

        }


        try {

            setLoading(true);


            const response =
                await axios.post(

                "http://127.0.0.1:8000/api/generate/",

                formData

            );


            setGeneratedData(
                response.data
            );


            toast.success(
                "AI content generated!"
            );

        }

        catch (error) {

            console.error(
                error.response?.data
            );


            toast.error(
                "Content generation failed."
            );

        }

        finally {

            setLoading(false);

        }

    };


    const publishPost =
        async () => {

        if (!generatedData) {

            toast.error(
                "Generate content first."
            );

            return;

        }


        try {

            await axios.post(

                "http://127.0.0.1:8000/api/publish/",

                {

                    generated_post:
                        generatedData.id,

                    platforms,

                }

            );


            toast.success(
                "Post published!"
            );

        }

        catch (error) {

            console.error(
                error.response?.data
            );


            toast.error(
                "Publishing failed."
            );

        }

    };


    const schedulePost =
        async () => {

        if (!generatedData) {

            toast.error(
                "Generate content first."
            );

            return;

        }


        if (!scheduledTime) {

            toast.error(
                "Select date and time."
            );

            return;

        }


        try {

            await axios.post(

                "http://127.0.0.1:8000/schedule/",

                {

                    generated_post:
                        generatedData.id,

                    scheduled_time:

                        new Date(
                            scheduledTime
                        )
                        .toISOString(),

                    platforms,

                }

            );


            toast.success(
                "Post scheduled!"
            );

        }

        catch (error) {

            console.error(
                error.response?.data
            );


            toast.error(
                "Scheduling failed."
            );

        }

    };


    return (

        <section>

            <h1 className="page-heading">

                Compose Your Post

            </h1>


            <div className="compose-card">


                <PlatformSelector

                    platforms={
                        platforms
                    }

                    setPlatforms={
                        setPlatforms
                    }

                />


                <div className="form-section">

                    <label
                        className="
                        section-label
                        "
                    >

                        2. Content Idea

                    </label>


                    <textarea

                        value={prompt}

                        onChange={
                            event =>
                                setPrompt(
                                    event
                                    .target
                                    .value
                                )
                        }

                        placeholder="
Describe the social media
content you want AI to
generate...
                        "

                    />

                </div>


                <div className="form-section">

                    <label
                        className="
                        section-label
                        "
                    >

                        3. Add Media

                    </label>


                    <label
                        className="
                        upload-area
                        "
                    >

                        <FaCloudUploadAlt />


                        <span>

                            {

                                image

                                ? image.name

                                : "Upload Image"

                            }

                        </span>


                        <input

                            type="file"

                            accept="image/*"

                            hidden

                            onChange={
                                event =>
                                    setImage(

                                        event
                                        .target
                                        .files[0]

                                    )
                            }

                        />

                    </label>

                </div>


                <button

                    className="
                    generate-button
                    "

                    onClick={
                        generateContent
                    }

                    disabled={
                        loading
                    }

                >

                    {

                        loading

                        ? "Generating..."

                        : "Generate AI Content"

                    }

                </button>


                <button

                    className="
                    publish-button
                    "

                    onClick={
                        publishPost
                    }

                >

                    Publish Post Now

                </button>


                <div
                    className="
                    schedule-row
                    "
                >

                    <input

                        type="
                        datetime-local
                        "

                        value={
                            scheduledTime
                        }

                        onChange={
                            event =>
                                setScheduledTime(
                                    event
                                    .target
                                    .value
                                )
                        }

                    />


                    <button

                        onClick={
                            schedulePost
                        }

                    >

                        Schedule Post

                    </button>

                </div>

            </div>

        </section>

    );

}


export default ComposePost;
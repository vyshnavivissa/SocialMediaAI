import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { FaCloudUploadAlt } from "react-icons/fa";

import PlatformSelector from "./PlatformSelector";


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

    const [loading, setLoading] =
        useState(false);

    const [scheduledTime, setScheduledTime] =
        useState("");


    // Generate AI content

    const generateContent = async () => {

        if (!prompt.trim()) {

            toast.error(
                "Enter a content idea."
            );

            return;

        }


        if (platforms.length === 0) {

            toast.error(
                "Select at least one platform."
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

            (platform) => {

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

                    `${import.meta.env.VITE_API_URL}/api/generate/`,

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
                || error.message

            );


            toast.error(

                error.response?.data?.message
                || "Content generation failed."

            );

        }

        finally {

            setLoading(false);

        }

    };


    // Publish immediately

    const publishPost = async () => {

        if (!generatedData) {

            toast.error(
                "Generate content first."
            );

            return;

        }


        if (platforms.length === 0) {

            toast.error(
                "Select at least one platform."
            );

            return;

        }


        try {

            await axios.post(

                `${import.meta.env.VITE_API_URL}/api/publish/`,

                {

                    generated_post:
                        generatedData.id,

                    platforms:
                        platforms,

                }

            );


            toast.success(
                "Post published successfully!"
            );

        }

        catch (error) {

            console.error(

                error.response?.data
                || error.message

            );


            toast.error(

                error.response?.data?.message
                || "Publishing failed."

            );

        }

    };


    // Schedule post

    const schedulePost = async () => {

        if (!generatedData) {

            toast.error(
                "Generate content first."
            );

            return;

        }


        if (platforms.length === 0) {

            toast.error(
                "Select at least one platform."
            );

            return;

        }


        if (!scheduledTime) {

            toast.error(
                "Select a future date and time."
            );

            return;

        }


        const selectedDate =
            new Date(
                scheduledTime
            );


        if (
            selectedDate <=
            new Date()
        ) {

            toast.error(
                "Select a future date and time."
            );

            return;

        }


        try {

            await axios.post(

                `${import.meta.env.VITE_API_URL}/schedule/`,

                {

                    generated_post:
                        generatedData.id,

                    scheduled_time:
                        selectedDate
                        .toISOString(),

                    platforms:
                        platforms,

                }

            );


            toast.success(
                "Post scheduled successfully!"
            );


            setScheduledTime("");

        }

        catch (error) {

            console.error(

                error.response?.data
                || error.message

            );


            toast.error(

                error.response?.data?.message
                || "Scheduling failed."

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
                        className="section-label"
                    >

                        2. Content Idea

                    </label>


                    <textarea

                        value={
                            prompt
                        }

                        onChange={

                            (event) =>

                                setPrompt(

                                    event
                                    .target
                                    .value

                                )

                        }

                        placeholder={
                            "Describe the social media content you want AI to generate..."
                        }

                    />

                </div>


                <div className="form-section">

                    <label
                        className="section-label"
                    >

                        3. Add Media

                    </label>


                    <label
                        className="upload-area"
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

                                (event) => {

                                    const file =

                                        event
                                        .target
                                        .files[0];


                                    if (file) {

                                        setImage(
                                            file
                                        );

                                    }

                                }

                            }

                        />

                    </label>

                </div>


                <button

                    type="button"

                    className="generate-button"

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

                    type="button"

                    className="publish-button"

                    onClick={
                        publishPost
                    }

                >

                    Publish Post Now

                </button>


                <div className="schedule-row">


                    <input

                        type="datetime-local"

                        value={
                            scheduledTime
                        }

                        onChange={

                            (event) =>

                                setScheduledTime(

                                    event
                                    .target
                                    .value

                                )

                        }

                    />


                    <button

                        type="button"

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
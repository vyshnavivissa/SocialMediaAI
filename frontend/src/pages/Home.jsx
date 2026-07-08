import { useState } from "react";

import Navbar from "../components/Navbar";
import ImageUploader from "../components/ImageUploader";
import PromptInput from "../components/PromptInput";
import PlatformSelector from "../components/PlatformSelector";
import GenerateButton from "../components/GenerateButton";

function Home() {

    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState("");

    const [platforms, setPlatforms] = useState([]);

    const [generatedData, setGeneratedData] = useState(null);

    const [loading, setLoading] = useState(false);
    const handleGenerate = async () => {

    try {

        setLoading(true);

        const formData = new FormData();

        if (image) {
            formData.append("image", image);
        }

        formData.append("prompt", prompt);

        platforms.forEach((platform) =>
            formData.append("platforms", platform)
        );

        const response = await api.post(
            "generate/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        setGeneratedData(response.data);

    } catch (error) {

        console.error(error);

        alert("Generation Failed");

    } finally {

        setLoading(false);

    }

};
    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-4xl mx-auto p-6">

                <ImageUploader
                    image={image}
                    setImage={setImage}
                />

                <PromptInput
                    prompt={prompt}
                    setPrompt={setPrompt}
                />

                <PlatformSelector
                    platforms={platforms}
                    setPlatforms={setPlatforms}
                />

                <GenerateButton

    loading={loading}

    handleGenerate={handleGenerate}

/>

            </div>

        </div>
    );
}

export default Home;
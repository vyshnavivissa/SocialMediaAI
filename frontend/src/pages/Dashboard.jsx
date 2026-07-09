import {
    useState,
} from "react";

import Navbar
from "../components/Navbar";

import ComposePost
from "../components/ComposePost";

import LivePreview
from "../components/LivePreview";


function Dashboard() {

    const [
        image,
        setImage,
    ] = useState(null);


    const [
        prompt,
        setPrompt,
    ] = useState("");


    const [
        platforms,
        setPlatforms,
    ] = useState([]);


    const [
        generatedData,
        setGeneratedData,
    ] = useState(null);


    return (

        <>

            <Navbar />


            <main
                className="
                dashboard
                "
            >

                <ComposePost

                    image={
                        image
                    }

                    setImage={
                        setImage
                    }

                    prompt={
                        prompt
                    }

                    setPrompt={
                        setPrompt
                    }

                    platforms={
                        platforms
                    }

                    setPlatforms={
                        setPlatforms
                    }

                    generatedData={
                        generatedData
                    }

                    setGeneratedData={
                        setGeneratedData
                    }

                />


                <LivePreview

                    image={
                        image
                    }

                    generatedData={
                        generatedData
                    }

                    platforms={
                        platforms
                    }

                />

            </main>

        </>

    );

}


export default Dashboard;
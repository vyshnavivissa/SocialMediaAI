import Navbar from "../components/Navbar";


function History() {

    return (

        <>

            <Navbar />


            <main className="simple-page">

                <div className="simple-card">

                    <h1>

                        Post History

                    </h1>


                    <p>

                        Previous generated,
                        scheduled, and published
                        posts will appear here.

                    </p>


                    <div className="empty-history">

                        <h2>

                            No posts available

                        </h2>


                        <p>

                            Generate or schedule a
                            social media post to
                            view it here.

                        </p>

                    </div>

                </div>

            </main>

        </>

    );

}


export default History;
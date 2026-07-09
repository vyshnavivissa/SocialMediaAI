import Navbar from "../components/Navbar";


function Settings() {

    return (

        <>

            <Navbar />


            <main className="simple-page">

                <div className="simple-card">

                    <h1>

                        Settings

                    </h1>


                    <p>

                        Manage your SocialAI
                        application settings
                        and connected social
                        media accounts.

                    </p>


                    <div className="setting-item">

                        <div>

                            <h3>

                                Twitter / X

                            </h3>

                            <span>

                                Account not connected

                            </span>

                        </div>


                        <button>

                            Connect

                        </button>

                    </div>


                    <div className="setting-item">

                        <div>

                            <h3>

                                Facebook

                            </h3>

                            <span>

                                Account not connected

                            </span>

                        </div>


                        <button>

                            Connect

                        </button>

                    </div>


                    <div className="setting-item">

                        <div>

                            <h3>

                                Instagram

                            </h3>

                            <span>

                                Account not connected

                            </span>

                        </div>


                        <button>

                            Connect

                        </button>

                    </div>


                    <div className="setting-item">

                        <div>

                            <h3>

                                LinkedIn

                            </h3>

                            <span>

                                Account not connected

                            </span>

                        </div>


                        <button>

                            Connect

                        </button>

                    </div>

                </div>

            </main>

        </>

    );

}


export default Settings;
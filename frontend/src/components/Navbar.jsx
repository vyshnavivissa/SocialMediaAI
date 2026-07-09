import {
    NavLink,
} from "react-router-dom";


function Navbar() {

    return (

        <header className="navbar">

            <div className="nav-container">

                <NavLink
                    to="/"
                    className="brand"
                >

                    <div className="brand-icon">

                        S

                    </div>

                    <span>

                        SocialAI

                    </span>

                </NavLink>


                <nav className="nav-links">

                    <NavLink
                        to="/"
                    >

                        Dashboard

                    </NavLink>


                    <NavLink
                        to="/history"
                    >

                        History

                    </NavLink>


                    <NavLink
                        to="/settings"
                    >

                        Settings

                    </NavLink>

                </nav>

            </div>

        </header>

    );

}


export default Navbar;
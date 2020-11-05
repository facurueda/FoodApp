import React from "react";
import userIcon from "../../Assets/navBar/userIcon.png";
import apple from "../../Assets/navBar/apple.png";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const NavBar = () => {
      const { loginWithRedirect } = useAuth0();

      return (
            <div className="navBarContainer">
                  <div className="avatarContainer">
                        <a onClick={() => loginWithRedirect()}>
                              {/* <img
                                    src={apple}
                                    alt="LogIn"
                                    className="userIcon"
                              /> */}
                              LogIn
                        </a>
                  </div>
                  <Link
                        to={{
                              pathname: "/shoppingList",
                        }}
                  >SL</Link>
            </div>
      );
};

export default NavBar;

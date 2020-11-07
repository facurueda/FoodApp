import React from "react";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Home from "../../Assets/navBar/home.svg";
import Login from "../../Assets/navBar/login.svg";
import Favourites from "../../Assets/navBar/favourites.svg";
import ShoppingList from "../../Assets/navBar/note.svg";
import User from "../../Assets/navBar/user.svg";

const NavBar = () => {
      const { loginWithRedirect } = useAuth0();

      return (
            <div className="navBarContainer">
                  {/* <div className="avatarContainer">
                        <a onClick={() => loginWithRedirect()}>
                              LogIn
                        </a>
                  </div> */}
                  <a
                        onClick={(e) => {
                              loginWithRedirect();
                        }}
                  >
                        <img src={User} alt="iconUser" className="iconUser" />
                  </a>
                  <Link
                        to={{
                              pathname: "/",
                        }}
                  >
                        <img src={Home} alt="iconHome" className="iconHome" />
                  </Link>
                  <Link
                        to={{
                              pathname: "/shoppingList",
                        }}
                  >
                        SL
                  </Link>
            </div>
      );
};

export default NavBar;

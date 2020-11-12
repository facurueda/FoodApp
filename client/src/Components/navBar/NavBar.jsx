import React from "react";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom";
import Home from "../../Assets/navBar/home.svg";
import Favourites from "../../Assets/navBar/favourites.svg";
import ShoppingList from "../../Assets/navBar/note.svg";
import User from "../../Assets/navBar/user.svg";
import { useDispatch } from "react-redux";
import {
      actionGetActionRecipes,
      actionLogout,
} from "../../Redux/recipesActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
      MDBDropdown,
      MDBDropdownToggle,
      MDBDropdownMenu,
      MDBDropdownItem,
} from "mdbreact";

const NavBar = () => {
      const dispatch = useDispatch();
      const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
      toast.configure();
      const history = useHistory();

      return (
            <div className="navBarContainer">
                  <div className="buttonsLoginContainer">
                        <a
                              className="buttonsToLogin"
                              onClick={(e) => {
                                    loginWithRedirect();
                              }}
                        >
                                    <img
                                          src={User}
                                          alt="iconUser"
                                          className="iconUser"
                                    />
                        </a>
                        <Link
                              to={{
                                    pathname: "/",
                              }}
                        >
                              <img
                                    src={Home}
                                    alt="iconHome"
                                    className="iconHome"
                              />
                        </Link>
                        <Link
                              onClick={(e) => {
                                    if (isAuthenticated) {
                                          history.push("/ShoppingList");
                                    } else {
                                          toast.error("You Must LogIn", {
                                                position: "top-center",
                                                autoClose: 3000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                          });
                                    }
                              }}
                        >
                              <img
                                    src={ShoppingList}
                                    alt="shopList"
                                    className="iconShopping"
                              />
                        </Link>
                        <Link
                              onClick={(e) => {
                                    if (isAuthenticated) {
                                          dispatch(
                                                actionGetActionRecipes(
                                                      user.email
                                                )
                                          );
                                          history.push("/FavouritesRecipes");
                                    } else {
                                          toast.error("You Must LogIn", {
                                                position: "top-center",
                                                autoClose: 3000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                          });
                                    }
                              }}
                        >
                              <img
                                    src={Favourites}
                                    alt="favourites"
                                    className="iconFavourites"
                              />
                        </Link>
                        <a
                              onClick={(e) => {
                                    logout({
                                          returnTo: window.location.origin,
                                    });
                              }}
                        >
                              <label>FACUNDO</label>
                        </a>
                  </div>
            </div>
      );
};

export default NavBar;

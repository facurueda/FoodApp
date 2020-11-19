import React from "react";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Search from "../../Assets/navBar/Search.svg";
import BookMark from "../../Assets/navBar/BookMark.svg";
import User from "../../Assets/navBar/User.svg";
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
      console.log("user", user);
      const history = useHistory();

      return (
            <div className="navBarContainer">
                  <div className="nameContainer">
                        <a
                              onClick={(e) => {
                                    history.push("/");
                              }}
                        >
                              <span className="logoName">FoodApp</span>
                        </a>
                        <a
                              className="buttonNavBar"
                              onClick={(e) => {
                                    history.push("/Recipes");
                              }}
                        >
                              <span className="menuName">RECIPES</span>
                        </a>
                        <a className="buttonNavBar">
                              <span className="menuName">SHOPPING LIST</span>
                        </a>
                  </div>
                  <div className="ButtonsNavBarContainer">
                        <div className="buttonsNBContainer">
                              <div className="buttonAndIconContainer">
                                    <a className="buttonNavBar">
                                          <img
                                                alt="icon"
                                                className="iconStyles"
                                                src={Search}
                                          />
                                          <span className="menuName">
                                                SEARCH
                                          </span>
                                    </a>
                              </div>
                              <div className="buttonAndIconContainer">
                                    <a className="buttonNavBar">
                                          <img
                                                alt="icon"
                                                className="iconStyles"
                                                src={BookMark}
                                          />
                                          <span className="menuName">
                                                SAVES
                                          </span>
                                    </a>
                              </div>
                              <div className="buttonAndIconContainer">
                                    {isAuthenticated ? (
                                          <a
                                                className="buttonNavBar"
                                                onClick={(e) => {
                                                      logout();
                                                }}
                                          >
                                                <img
                                                      alt="icon"
                                                      src={user.picture}
                                                      className='userPictureLogged'
                                                />
                                          </a>
                                    ) : (
                                          <a className="buttonNavBar">
                                                <a
                                                      onClick={(e) => {
                                                            loginWithRedirect();
                                                      }}
                                                >
                                                      <img
                                                            alt="icon"
                                                            className="iconStyles"
                                                            src={User}
                                                      />
                                                      <span className="menuName">
                                                            SIGN IN
                                                      </span>
                                                </a>
                                          </a>
                                    )}
                              </div>
                        </div>
                  </div>
                  {/* <div className="buttonsLoginContainer">
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
                  </div> */}
            </div>
      );
};

export default NavBar;

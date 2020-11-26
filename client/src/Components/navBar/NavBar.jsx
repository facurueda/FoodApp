import React from "react";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import Search from "../../Assets/navBar/Search.svg";
import BookMark from "../../Assets/navBar/BookMark.svg";
import User from "../../Assets/navBar/User.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actionGetActionRecipes } from "../../Redux/recipesActions";
import { useDispatch } from "react-redux";

const NavBar = () => {
      const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
      const dispatch = useDispatch();
      toast.configure();
      const history = useHistory();

      const verifyIsAuthenticated = () => {
            if (isAuthenticated) return "flex";
            return "none";
      };
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
                        <a
                              style={{ display:`${verifyIsAuthenticated()}` }}
                              className="buttonNavBar"
                              onClick={(e) => {
                                    history.push("/shoppingList");
                              }}
                        >
                              <span className="menuName">SHOPPING LIST</span>
                        </a>
                  </div>
                  <div className="ButtonsNavBarContainer">
                        <div className="buttonsNBContainer">
                              <div className="buttonAndIconContainer">
                                    <a
                                          className="buttonNavBar"
                                          onClick={(e) => {
                                                history.push("/Search");
                                          }}
                                    >
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
                                    <a
                                          style={{ display:`${verifyIsAuthenticated()}` }}
                                          className="buttonNavBar"
                                          onClick={(e) => {
                                                dispatch(
                                                      actionGetActionRecipes(
                                                            user.email
                                                      )
                                                );
                                                history.push(
                                                      "/FavouritesRecipes"
                                                );
                                          }}
                                    >
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
                                                      className="userPictureLogged"
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
            </div>
      );
};

export default NavBar;

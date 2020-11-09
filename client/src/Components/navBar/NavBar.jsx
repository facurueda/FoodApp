import React from "react";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Home from "../../Assets/navBar/home.svg";
import Favourites from "../../Assets/navBar/favourites.svg";
import ShoppingList from "../../Assets/navBar/note.svg";
import User from "../../Assets/navBar/user.svg";
import { useDispatch } from "react-redux";
import { actionGetActionRecipes } from "../../Redux/recipesActions";

const NavBar = () => {
      const dispatch = useDispatch()
      const { user, loginWithRedirect } = useAuth0();

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
                        <img src={ShoppingList} alt='shopList' className='iconShopping' />
                  </Link>
                  <Link
                        to={{
                              pathname: "/FavouritesRecipes",
                        }}
                        onClick={e => {
                              dispatch(actionGetActionRecipes(user.email));
                        }}
                  >
                        <img src={Favourites} alt='favourites' className='iconFavourites' />
                  </Link>
            </div>
      );
};

export default NavBar;

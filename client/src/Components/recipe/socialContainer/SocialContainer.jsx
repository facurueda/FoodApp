import React from 'react';
import FavouriteIcon from "../../../Assets/Recipe/heart.svg";
import {
      FacebookShareButton,
      PinterestShareButton,
      WhatsappShareButton,
} from "react-share";
import { FacebookIcon, PinterestIcon, WhatsappIcon } from "react-share";
import { actionAddRecipeToFavourites } from "../../../Redux/recipesActions";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';

const SocialContainer = (props) => {
      toast.configure();
      const dispatch = useDispatch();
      
      const { user, isAuthenticated } = useAuth0();

      const {recipeByIngredient} = props

      return (
            <div className="recipeSocial">
                                    <div className="buttons">
                                          <div className="buttonsContainer">
                                                <FacebookShareButton
                                                      url={
                                                            recipeByIngredient.sourceUrl
                                                      }
                                                >
                                                      <FacebookIcon
                                                            size={32}
                                                            round
                                                      />
                                                </FacebookShareButton>{" "}
                                                <PinterestShareButton
                                                      url={
                                                            recipeByIngredient.sourceUrl
                                                      }
                                                >
                                                      <PinterestIcon
                                                            size={32}
                                                            round
                                                      />
                                                </PinterestShareButton>{" "}
                                                <WhatsappShareButton
                                                      url={
                                                            recipeByIngredient.sourceUrl
                                                      }
                                                >
                                                      <WhatsappIcon
                                                            size={32}
                                                            round
                                                      />
                                                </WhatsappShareButton>
                                                <a
                                                      onClick={(e) => {
                                                            if (
                                                                  isAuthenticated
                                                            ) {
                                                                  dispatch(
                                                                        actionAddRecipeToFavourites(
                                                                              recipeByIngredient.id,
                                                                              recipeByIngredient.image,
                                                                              recipeByIngredient.title,
                                                                              user.email
                                                                        )
                                                                  );
                                                            } else {
                                                                  toast.error(
                                                                        "You Must LogIn",
                                                                        {
                                                                              position:
                                                                                    "top-center",
                                                                              autoClose: 3000,
                                                                              hideProgressBar: false,
                                                                              closeOnClick: true,
                                                                              pauseOnHover: true,
                                                                              draggable: true,
                                                                              progress: undefined,
                                                                        }
                                                                  );
                                                            }
                                                      }}
                                                >
                                                      <img
                                                            src={FavouriteIcon}
                                                            alt="favouriteIcon"
                                                            className="favouriteIcon"
                                                      />
                                                </a>
                                          </div>
                                    </div>
                              </div>
      )
}

export default SocialContainer;
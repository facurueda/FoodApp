import React from "react";
import Heart from "../../Assets/Recipe/heart.svg";
import Delete from "../../Assets/Home/eliminate.svg";
import { Link } from "react-router-dom";
import {
      MDBCard,
      MDBCardBody,
      MDBCardImage,
      MDBCardTitle,
      MDBCol,
} from "mdbreact";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {
      actionAddRecipeToFavourites,
      actionCleanState,
      actionDeleteFavouriteRecipe,
      actionGetRecipeToShowByIngredients,
      actionStartSpinner,
} from "../../Redux/recipesActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ProductCardRecipe.css'

const ProductCardRecipe = (props) => {
      const dispatch = useDispatch();
      const { user, isAuthenticated } = useAuth0();
      toast.configure();
      const { recipe } = props;

      return (
            <MDBCol>
                  <MDBCard className="cardContainer">
                        <Link
                              to={{
                                    pathname: "/Spinner",
                                    state: {},
                              }}
                              onClick={(e) => {
                                    dispatch(actionCleanState());
                                    dispatch(actionStartSpinner());
                                    dispatch(
                                          actionGetRecipeToShowByIngredients(
                                                recipe.id
                                          )
                                    );
                              }}
                        >
                              <MDBCardImage
                                    className="cardProductImage"
                                    src={recipe.image}
                                    waves
                              />
                        </Link>
                        {window.location.href.slice(-18) ===
                        "/FavouritesRecipes" ? (
                              <a
                                    className="buttonToAddFavourite"
                                    onClick={(e) => {
                                                dispatch(
                                                      actionDeleteFavouriteRecipe(recipe.id, user.email)
                                                );
                                    }}
                              >
                                    <img
                                          src={Delete}
                                          className="iconDeleteFavouriteRecipe"
                                          alt="icon"
                                    />
                              </a>
                        ) : (
                              <a
                                    className="buttonToAddFavourite"
                                    onClick={(e) => {
                                          if (isAuthenticated) {
                                                dispatch(
                                                      actionAddRecipeToFavourites(
                                                            recipe.id,
                                                            recipe.image,
                                                            recipe.title,
                                                            user.email
                                                      )
                                                );
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
                                          src={Heart}
                                          className="iconToAddFavourite"
                                          alt="icon"
                                    />
                              </a>
                        )}
                        <MDBCardBody className="cardBodyRecipes">
                              <MDBCardTitle className="cardTitleContainer">
                                    {recipe.title}
                              </MDBCardTitle>
                        </MDBCardBody>
                  </MDBCard>
            </MDBCol>
      );
};

export default ProductCardRecipe;

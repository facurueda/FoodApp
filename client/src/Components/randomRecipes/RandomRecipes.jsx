import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
      MDBCard,
      MDBCardBody,
      MDBCardImage,
      MDBCardTitle,
      MDBCol,
} from "mdbreact";
import {
      actionAddRecipeToFavourites,
      actionDeleteBlur,
      actionDisplayNoneButtonBlur,
      actionGetAleatoryRecipes,
      actionGetNutritionalInfo,
      actionGetRecipeToShowByIngredients,
      actionStartSpinner,
} from "../../Redux/recipesActions";
import "./RandomRecipes.css";
import { Link } from "react-router-dom";
import Heart from "../../Assets/Recipe/heart.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RandomRecipes = () => {
      // const history = useHistory();
      toast.configure();
      const dispatch = useDispatch();
      const { user, isAuthenticated, isLoading } = useAuth0();

      useEffect(() => {
            dispatch(actionGetAleatoryRecipes());
      }, []);

      let getAleatoryRecipes = useSelector(
            (state) => state.recipesReducer.aleatoryRecipesHome
      );

      const imagesWithBlur = useSelector(
            (state) => state.recipesReducer.randomRecipesBlur
      );

      const buttonBlur = useSelector(
            (state) => state.recipesReducer.buttonBlurDisplay
      );

      return (
            <div style={{ position: "relative" }}>
                  <button
                        className={buttonBlur}
                        onClick={(e) => {
                              dispatch(actionDeleteBlur());
                              dispatch(actionDisplayNoneButtonBlur());
                        }}
                  >
                        CLEAN
                  </button>
                  <div className={imagesWithBlur}>
                        {getAleatoryRecipes.map((recipe) => {
                              return (
                                    <MDBCol>
                                          <MDBCard className="cardContainer">
                                                <Link
                                                      to={{
                                                            pathname:
                                                                  "/Spinner",
                                                            state: {
                                                                  recipe: recipe,
                                                            },
                                                      }}
                                                      onClick={(e) => {
                                                            dispatch(actionStartSpinner())
                                                            dispatch(
                                                                  actionGetRecipeToShowByIngredients(
                                                                        recipe.id
                                                                  )
                                                            );
                                                            dispatch(
                                                                  actionGetNutritionalInfo(
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
                                                <a
                                                      className="buttonToAddFavourite"
                                                      onClick={(e) => {
                                                            if (
                                                                  isAuthenticated
                                                            ) {
                                                                  dispatch(
                                                                        actionAddRecipeToFavourites(
                                                                              recipe.id,
                                                                              recipe.image,
                                                                              recipe.title,
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
                                                            src={Heart}
                                                            className="iconToAddFavourite"
                                                            alt="icon"
                                                      />
                                                </a>
                                                <MDBCardBody className="cardBodyRecipes">
                                                      <MDBCardTitle className="cardTitleContainer">
                                                            {recipe.title}
                                                      </MDBCardTitle>
                                                </MDBCardBody>
                                          </MDBCard>
                                    </MDBCol>
                              );
                        })}
                  </div>
            </div>
      );
};

export default RandomRecipes;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
      MDBCard,
      MDBCardBody,
      MDBCardImage,
      MDBCardTitle,
      MDBCol,
} from "mdbreact";
import Heart from "../../Assets/Recipe/heart.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom";
import {
      actionAddRecipeToFavourites,
      actionCleanState,
      actionGetRecipeToShowByIngredients,
      actionStartSpinner,
} from "../../Redux/recipesActions";
import SpinnerSearch from "../searchByIngredients/SpinnerSearch";
import buttonGoBack from "../../Assets/Home/reply.svg";
import "./RecipesByCountries.css";

const RecipesByCountry = () => {
      toast.configure();
      const history = useHistory();
      const dispatch = useDispatch();
      const { user, isAuthenticated, isLoading } = useAuth0();
      const recipesByCountries = useSelector(
            (state) => state.recipesReducer.recipesByCountries
      );
      const spinnerStatus = useSelector(
            (state) => state.recipesReducer.spinnerStatus
      );

      return (
            <div className="recipesByCountryContainer">
                  
                  <div className="titleNameByCountry">
                  <img
                        className='buttonGoBack'
                        src={buttonGoBack}
                        onClick={(e) => {
                              history.goBack();
                        }}
                  />
                        <label>{history.location.state} Recipes</label>
                  </div>

                  {spinnerStatus ? (
                        <SpinnerSearch/>
                  ) : (
                        recipesByCountries.map((recipe) => {
                              return (
                                    <MDBCol>
                                          <MDBCard className="cardContainer">
                                                <Link
                                                      to={{
                                                            pathname:
                                                                  "/Spinner",
                                                            state: {},
                                                      }}
                                                      onClick={(e) => {
                                                            dispatch(actionCleanState())
                                                            dispatch(
                                                                  actionStartSpinner()
                                                            );
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
                        })
                  )}
            </div>
      );
};

export default RecipesByCountry;

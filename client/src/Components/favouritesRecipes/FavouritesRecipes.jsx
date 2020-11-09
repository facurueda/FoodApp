import React from "react";
import BackgroundFavouritesRecipes from "../../Assets/Home/HomeBackground.png";
import TopImage from "../../Assets/Home/top-receta.svg";
import ButtonDelete from "../../Assets/Recipe/ButtonDelete.svg";
import {
      MDBCard,
      MDBCardBody,
      MDBCardImage,
      MDBCardTitle,
      MDBCol,
} from "mdbreact";
import {
      actionDeleteFavouriteRecipe,
      actionGetActionRecipes,
      actionGetNutritionalInfo,
      actionGetRecipeToShowByIngredients,
} from "../../Redux/recipesActions";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./FavouritesRecipes.css";
import { useDispatch, useSelector } from "react-redux";

const FavouritesRecipes = () => {
      const dispatch = useDispatch();
      const { user, isAuthenticated, isLoading } = useAuth0();

      const favourites = useSelector(
            (state) => state.recipesReducer.favouritesRecipes
      );

      return (
            <div className="fullFavouritesRecipes">
                  <div className="topFavouritesRecipe">
                        <div
                              className="imageTopFavouritesRecipes"
                              style={{
                                    backgroundImage:
                                          "BackgroundFavouritesRecipes",
                              }}
                        />
                        <div className="gridTopFavouritesRecipes">
                              <div className="tableTopFavouritesRecipes">
                                    <div className="cellTopFavouritesRecipes">
                                          <h1 className="favouritesRecipeTitleTop">
                                                Favourites Recipes
                                          </h1>
                                          <div className="shareTopRecipe"></div>
                                    </div>
                              </div>
                        </div>
                        <img
                              src={TopImage}
                              className="imageFavouriteBottomTop"
                        />
                  </div>
                  <div className="favouritesRecipesContainer">
                        {favourites.length > 0
                              ? favourites.map((recipe) => {
                                      return (
                                            <MDBCol className="cardFavouriteRecipeContainer">
                                                  
                                                  <MDBCard className="cardContainer">
                                                  <a className='buttonEliminateRecipe' onClick={e => {
                                                            dispatch(actionDeleteFavouriteRecipe(recipe.favourites[0].idRecipe, user.email))
                                                        }
                                                  }><img
                                                        src={ButtonDelete}
                                                        className="buttonDelete"
                                                  /></a>
                                                        <Link
                                                              to={{
                                                                    pathname:
                                                                          "/Spinner",
                                                                    state: {
                                                                        //   recipe: recipe,
                                                                    },
                                                              }}
                                                              onClick={(e) => {
                                                                    dispatch(
                                                                          actionGetRecipeToShowByIngredients(
                                                                                recipe.favourites[0].idRecipe
                                                                          )
                                                                        //   recipe.id
                                                                    );
                                                                    dispatch(
                                                                          actionGetNutritionalInfo(
                                                                              recipe.favourites[0].idRecipe
                                                                          )
                                                                          // recipe.id
                                                                    );
                                                              }}
                                                        >
                                                              <MDBCardImage
                                                                    className="cardProductImage"
                                                                    src={
                                                                          recipe
                                                                                .favourites[0]
                                                                                .imageUrl
                                                                    }
                                                                    waves
                                                              />
                                                        </Link>
                                                        <MDBCardBody className="cardBodyRecipes">
                                                              <MDBCardTitle className="cardTitleContainer">
                                                                    {
                                                                          recipe
                                                                                .favourites[0]
                                                                                .recipeName
                                                                    }
                                                              </MDBCardTitle>
                                                        </MDBCardBody>
                                                  </MDBCard>
                                            </MDBCol>
                                      );
                                })
                              : ""}
                  </div>
            </div>
      );
};

export default FavouritesRecipes;

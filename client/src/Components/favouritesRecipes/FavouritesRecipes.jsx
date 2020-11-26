import React from "react";
import TopImage from "../../Assets/Home/top-receta.svg";
import "./FavouritesRecipes.css";
import { useSelector } from "react-redux";
import ProductCardRecipe from "../productCardRecipe/ProductCardRecipe";

const FavouritesRecipes = () => {

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
                                            <ProductCardRecipe
                                                  recipe={recipe}
                                            />
                                      );
                                })
                              : ""}
                  </div>
            </div>
      );
};

export default FavouritesRecipes;

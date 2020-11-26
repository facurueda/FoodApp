import React from "react";
import { useSelector } from "react-redux";
import ProductCardRecipe from "../productCardRecipe/ProductCardRecipe";
import SpinnerSearch from "../spinnerSearch/SpinnerSearch";
import InputSearchRecipes from "./inputSearchRecipes/InputSearchRecipes";
import TopImage from "../../Assets/Home/top-receta.svg";
import "./PageSearchRecipes.css";

const PageSearchRecipes = () => {
      const spinnerStatus = useSelector(
            (state) => state.recipesReducer.spinnerStatus
      );

      const recipesBySearch = useSelector(
            (state) => state.recipesReducer.recipesBySearch
      );

      return (
            <div className="pageSearchRecipesContainer">
                  <div className="topFavouritesRecipe">
                        <div className="imageTopFavouritesRecipes" />
                        <img
                              alt='topImage'
                              src={TopImage}
                              className="imageFavouriteBottomTop"
                        />
                  </div>
                  <div className="bodySearchRecipeContainer">
                        <InputSearchRecipes />
                        <div className="containerRecipesByIngredients">
                              {spinnerStatus ? (
                                    <SpinnerSearch />
                              ) : (
                                    recipesBySearch.map((recipe) => {
                                          return (
                                                <ProductCardRecipe
                                                      recipe={recipe}
                                                />
                                          );
                                    })
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default PageSearchRecipes;

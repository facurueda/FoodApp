import React from "react";
import {useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SpinnerSearch from "../spinnerSearch/SpinnerSearch";
import buttonGoBack from "../../Assets/Home/reply.svg";
import "./RecipesByCountries.css";
import ProductCardrecipe from '../productCardRecipe/ProductCardRecipe'

const RecipesByCountry = () => {
      const history = useHistory();
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
                        alt='buttonGoBack'
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
                                    <ProductCardrecipe recipe={recipe}/>
                              );
                        })
                  )}
            </div>
      );
};

export default RecipesByCountry;

import { useSelector } from "react-redux";
import React from "react";
import "./SearchByIngredients.css";
import {useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinnerSearch from "../spinnerSearch/SpinnerSearch";
import buttonGoBack from "../../Assets/Home/reply.svg";
import InputSearch from "./inputSearch/InputSearch";
import IngredientsContainer from "./ingredientsContainer/ingredientsContainer";
import ProductCardRecipe from "../productCardRecipe/ProductCardRecipe";

const SearchByIngredients = () => {
      toast.configure();
    
      const spinnerStatus = useSelector(
            (state) => state.recipesReducer.spinnerStatus
      );
      const recipesByIngredients = useSelector(
            (state) => state.recipesReducer.recipesByIngredients
      );

      const history = useHistory();

      return (
            <div className="containerSearchByIngredients">
                  <div className="headerPageSearchByIngredientContainer">
                        <img
                              className="buttonGoBackPageSearch"
                              src={buttonGoBack}
                              onClick={(e) => {
                                    history.goBack();
                              }}
                        />
                        <InputSearch/>
                        <IngredientsContainer />
                  </div>

                  <div className="containerRecipesByIngredients">
                        {spinnerStatus ? (
                              <SpinnerSearch/>
                        ) : (
                              recipesByIngredients.map((recipe) => {
                                    return (
                                          <ProductCardRecipe recipe={recipe}/>
                                    );
                              })
                        )}
                  </div>
            </div>
      );
};

export default SearchByIngredients;

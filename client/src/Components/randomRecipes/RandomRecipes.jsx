import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardRecipe from "../productCardRecipe/ProductCardRecipe";
import { actionGetAleatoryRecipes } from "../../Redux/recipesActions";
import "./RandomRecipes.css";

const RandomRecipes = () => {
      const dispatch = useDispatch();
      useEffect(() => {
            dispatch(actionGetAleatoryRecipes());
      }, []);

      let getAleatoryRecipes = useSelector(
            (state) => state.recipesReducer.aleatoryRecipesHome
      );

      return (
            <div>
                  <div className="randomRecipesContainer">
                        {getAleatoryRecipes.map((recipe) => {
                              return <ProductCardRecipe recipe={recipe} />;
                        })}
                  </div>
            </div>
      );
};

export default RandomRecipes;

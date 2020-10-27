import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetRecipeToShowByIngredients } from "../../Redux/recipesActions";
import "./Recipe.css";

const Recipe = (props) => {
      console.log(props);

      const recipeByIngredient = useSelector(
            (state) => state.recipesReducer.recipeToShow
      );


      // useEffect(() => {
      //       dispatch(
      //             actionGetRecipeToShowByIngredients(
      //                   props.location.state.recipeId
      //             )
      //       );
      // }, []);

      console.log("recipeFind", useSelector(
            (state) => state.recipesReducer.recipeToShow
      ));

      function test() {
            return { __html: recipeByIngredient.instructions };
      }

      const decimalFractions = (number) => {
            if (number == "0.6666666666666666") return "2/3";
            else if (number == "0.3333333333333333") return "1/3";
            else if (number == "1.3333333333333333") return "1 1/3";
            else {
                  return number;
            }
      };

      return (
            <div className="fullRecipeContainer">
                  <div className="fullRecipeName">{recipeByIngredient.title}</div>
                  <img
                        src={recipeByIngredient.image}
                        alt="RecipeImage"
                        className="fullRecipeImg"
                  />
                  <div className="textIngredients">
                        <label>Ingredients:</label>
                  </div>
                  <div className="fullRecipeIngredients">
                        {recipeByIngredient.extendedIngredients.map((ingre) => {
                              let urlImage = `https://spoonacular.com/cdn/ingredients_100x100/${ingre.image}`;
                              return (
                                    <div className="ingredientInfo">
                                          <img
                                                src={urlImage}
                                                alt="IngredientImage"
                                                className="ingredientImage"
                                          />
                                          <p className="ingredientText">
                                                {ingre.name}
                                          </p>
                                          <p className="ingredientText">
                                                {decimalFractions(ingre.amount)}{" "}
                                                {ingre.measures.us.unitShort}
                                          </p>
                                    </div>
                              );
                        })}
                  </div>

                  <div className="textIngredients">
                        <label>Instructions:</label>
                  </div>
                  {recipeByIngredient.analyzedInstructions[0].steps ? (
                        <div className="fullRecipePreparation">
                              <ol>
                                    {recipeByIngredient.analyzedInstructions[0].steps.map((s) => {
                                          return <li>{s.step}</li>;
                                    })}
                              </ol>
                        </div>
                  ) : (
                        <div
                              className="fullRecipePreparation"
                              dangerouslySetInnerHTML={test()}
                        />
                  )}
            </div>
      );
};

export default Recipe;

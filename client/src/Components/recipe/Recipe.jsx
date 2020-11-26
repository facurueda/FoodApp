import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Recipe.css";
import TopRecipe from "../../Assets/Home/top-receta.svg";
import buttonGoBack from "../../Assets/Home/reply.svg";
import { useHistory } from "react-router-dom";
import SocialContainer from "./socialContainer/SocialContainer";
import IngredientsContainer from "./ingredientsContainer/IngredientsContainer";
import ExtraRecipeContainer from "./extraRecipeContainer/ExtraRecipeContainer";
import InstructionContainer from "./instructionContainer/InstructionContainer";
import ModalInfoNutritional from "./modalInfoNutritional/ModalInfoNutritional";

const Recipe = () => {
      const recipeByIngredient = useSelector(
            (state) => state.recipesReducer.recipeToShow
      );
      const [modalState, setModalState] = useState(false);
      const closeModal = () => {
            setModalState(!modalState);
      };
      const imageBackgroundTop = recipeByIngredient.image;
      const history = useHistory();
      return (
            <div className="fullRecipeContainer">
                  <div className="topRecipe">
                        <img
                              alt='buttonGoBack'
                              className="buttonGoBackInRecipe"
                              src={buttonGoBack}
                              onClick={(e) => {
                                    console.log(history.goBack());
                                    history.goBack();
                              }}
                        />

                        <div
                              className="imageTopRecipe"
                              style={{
                                    backgroundImage: `url(${imageBackgroundTop})`,
                              }}
                        />
                        <div className="gridTopRecipe">
                              <div className="tableTopRecipe">
                                    <div className="cellTopRecipe">
                                          <h1 className="recipeTitleTop">
                                                {recipeByIngredient.title}
                                          </h1>
                                          <div className="shareTopRecipe"></div>
                                    </div>
                              </div>
                        </div>
                        <img src={TopRecipe} alt='TopImage' className="imageBottomTop" />
                  </div>
                  <div className="recipeContent">
                        <div className="recipeImageAndSocial">
                              <SocialContainer
                                    recipeByIngredient={recipeByIngredient}
                              />
                              <div className="recipeImage">
                                    <img
                                          src={imageBackgroundTop}
                                          alt="recipe_image"
                                          className="ImageRecipeShow"
                                    />
                              </div>
                        </div>
                        <div className="recipeIngredientsAndExtra">
                              <IngredientsContainer
                                    recipeByIngredient={recipeByIngredient}
                              />

                              <ExtraRecipeContainer
                                    recipeByIngredient={recipeByIngredient}
                                    closeModal={closeModal}
                              />
                        </div>
                        <InstructionContainer
                              recipeByIngredient={recipeByIngredient}
                        />
                  </div>
                  <ModalInfoNutritional
                        modalState={modalState}
                        closeModal={closeModal}
                  />
            </div>
      );
};

export default Recipe;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
      MDBBtn,
      MDBModal,
      MDBModalBody,
      MDBModalHeader,
      MDBModalFooter,
} from "mdbreact";
import { actionGetRecipeToShowByIngredients } from "../../Redux/recipesActions";
import "./Recipe.css";
import { useAuth0 } from "@auth0/auth0-react";
import { actionSendDataShoppingList } from "../../Redux/shoppingListActions";
import TopRecipe from "../../Assets/Home/top-receta.svg";
import TimerImage from "../../Assets/Home/timer.svg";
import Servings from "../../Assets/Home/servings.svg";
import NutritionalInfoIcon from "../../Assets/Home/nutritionalInfo.svg";
import ShoppingListIcon from "../../Assets/Home/shoppingList.svg";
import {
      FacebookShareButton,
      PinterestShareButton,
      WhatsappShareButton,
} from "react-share";

import { FacebookIcon, PinterestIcon, WhatsappIcon } from "react-share";

const Recipe = (props) => {
      const dispatch = useDispatch();

      const { user, isAuthenticated, isLoading } = useAuth0();

      const recipeByIngredient = useSelector(
            (state) => state.recipesReducer.recipeToShow
      );

      const information = useSelector(
            (state) => state.recipesReducer.nutritionalInfo
      );

      function test() {
            return { __html: recipeByIngredient.instructions };
      }

      const [servingsNumber, setServingsNumber] = useState(
            recipeByIngredient.servings
      );

      const decimalFractions = (number) => {
            let numberToShow =
                  (number / recipeByIngredient.servings) * servingsNumber;

            return numberToShow;

            if (number == "0.6666666666666666") return "2/3";
            else if (number == "0.3333333333333333") return "1/3";
            else if (number == "1.3333333333333333") return "1 1/3";
            else {
                  return number;
            }
      };

      const [modalState, setModalState] = useState(false);

      const closeModal = () => {
            setModalState(!modalState);
      };

      const imageBackgroundTop = recipeByIngredient.image;

      return (
            <div className="fullRecipeContainer">
                  <div className="topRecipe">
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
                        <img src={TopRecipe} className="imageBottomTop" />
                  </div>

                  <div className="recipeContent">
                        <div className="recipeImageAndSocial">
                              <div className="recipeSocial">
                                    <div className="buttons">
                                          <div className="buttonsContainer">
                                                <FacebookShareButton
                                                      url={
                                                            recipeByIngredient.sourceUrl
                                                      }
                                                >
                                                      <FacebookIcon
                                                            size={32}
                                                            round
                                                      />
                                                </FacebookShareButton>{" "}
                                                <PinterestShareButton
                                                      url={
                                                            recipeByIngredient.sourceUrl
                                                      }
                                                >
                                                      <PinterestIcon
                                                            size={32}
                                                            round
                                                      />
                                                </PinterestShareButton>{" "}
                                                <WhatsappShareButton
                                                      url={
                                                            recipeByIngredient.sourceUrl
                                                      }
                                                >
                                                      <WhatsappIcon
                                                            size={32}
                                                            round
                                                      />
                                                </WhatsappShareButton>{" "}
                                          </div>
                                    </div>
                              </div>
                              <div className="recipeImage">
                                    <img
                                          src={imageBackgroundTop}
                                          alt="recipe_image"
                                          className="recipeImage"
                                    />
                              </div>
                        </div>
                        <div className="recipeIngredientsAndExtra">
                              <div className="recipeIngredientsContainer">
                                    <h2 className="titleIngredients">
                                          INGREDIENTS
                                    </h2>
                                    <div className="recipeIngredients">
                                          {recipeByIngredient.extendedIngredients.map(
                                                (ingre) => {
                                                      let urlImage = `https://spoonacular.com/cdn/ingredients_100x100/${ingre.image}`;
                                                      return (
                                                            <div className="ingredientInfo">
                                                                  <img
                                                                        src={
                                                                              urlImage
                                                                        }
                                                                        alt="IngredientImage"
                                                                        className="ingredientImage"
                                                                  />
                                                                  <p className="ingredientText">
                                                                        {
                                                                              ingre.name
                                                                        }
                                                                  </p>
                                                                  <p className="ingredientText">
                                                                        {decimalFractions(
                                                                              ingre.amount
                                                                        )}{" "}
                                                                        {
                                                                              ingre
                                                                                    .measures
                                                                                    .us
                                                                                    .unitShort
                                                                        }
                                                                  </p>
                                                            </div>
                                                      );
                                                }
                                          )}
                                    </div>
                                    <div className="textIngredients">
                                          <label>Ingredients:</label>
                                          <button
                                                onClick={(e) =>
                                                      setServingsNumber(
                                                            servingsNumber - 1
                                                      )
                                                }
                                          >
                                                -
                                          </button>
                                          <div>{servingsNumber}</div>
                                          <button
                                                onClick={(e) =>
                                                      setServingsNumber(
                                                            servingsNumber + 1
                                                      )
                                                }
                                          >
                                                +
                                          </button>
                                    </div>
                              </div>
                              <div className="recipeExtras">
                                    <div className="timeReady">
                                          <div className="preparation">
                                                <img
                                                      src={TimerImage}
                                                      alt="timerIcon"
                                                      className="timerImage"
                                                />
                                                {
                                                      recipeByIngredient.readyInMinutes
                                                }
                                                <div className="textRecipe">
                                                      minutes
                                                </div>
                                          </div>
                                          <div className="servings">
                                                <img
                                                      src={Servings}
                                                      alt="servingsQuantity"
                                                      className="servingsImage"
                                                />
                                                {recipeByIngredient.servings}
                                                <div className="textRecipe">
                                                      servings
                                                </div>
                                          </div>
                                          <div className="nutritionInfo">
                                                <img
                                                      alt="nutritionImage"
                                                      className="nutritionImage"
                                                      src={NutritionalInfoIcon}
                                                />
                                                <button
                                                      onClick={(e) =>
                                                            closeModal()
                                                      }
                                                >
                                                      Nutrition-Info
                                                </button>
                                          </div>
                                          <div className="shoppingContainer">
                                                <img
                                                      alt="shoppingImage"
                                                      className="shoppingImage"
                                                      src={ShoppingListIcon}
                                                />
                                                <button
                                                      onClick={(e) => {
                                                            /* Action to Create ShoppingList in DB */
                                                            /* recipeByIngredient.extendedIngredients */

                                                            dispatch(
                                                                  actionSendDataShoppingList(
                                                                        user.email,
                                                                        recipeByIngredient
                                                                  )
                                                            );
                                                            console.log(
                                                                  "user",
                                                                  user.email,
                                                                  "recypeByIngredient",
                                                                  recipeByIngredient
                                                            );
                                                      }}
                                                >
                                                      Add all ingredient to
                                                      shopping list
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <div className="recipeInstructions">
                              <h2 className="titleIngredients">Instructions</h2>
                              <div className="instructionsContainer">
                                    {recipeByIngredient.analyzedInstructions[0]
                                          .steps ? (
                                          <div className="fullRecipePreparation">
                                                <ol className="olRecipe">
                                                      {recipeByIngredient.analyzedInstructions[0].steps.map(
                                                            (s) => {
                                                                  return (
                                                                        <li className="liRecipe">
                                                                              {
                                                                                    s.step
                                                                              }
                                                                        </li>
                                                                  );
                                                            }
                                                      )}
                                                </ol>
                                          </div>
                                    ) : (
                                          <div
                                                className="fullRecipePreparation"
                                                dangerouslySetInnerHTML={test()}
                                          />
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Recipe;

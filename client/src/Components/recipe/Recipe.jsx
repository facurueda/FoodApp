import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
      MDBContainer,
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


const Recipe = (props) => {

      const dispatch = useDispatch()

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

      return (
            <div className="fullRecipeContainer">
                  {console.log("recipeBy", recipeByIngredient)}
                  <div className="fullRecipeName">
                        {recipeByIngredient.title}
                  </div>
                  <div className="imageTimeContainer">
                        <img
                              src={recipeByIngredient.image}
                              alt="RecipeImage"
                              className="fullRecipeImg"
                        />
                        <div className="timeReady">
                              <div className="preparation">
                                    Time Preparation:{"  "}
                                    {recipeByIngredient.readyInMinutes}
                              </div>
                              <div className="servings">
                                    Servings:{"  "}
                                    {recipeByIngredient.servings}
                              </div>
                              <div className="nutritionInfo">
                                    <button onClick={(e) => closeModal()}>
                                          Nutrition-Info
                                    </button>
                              </div>
                        </div>
                  </div>

                  {/* ---------- MODAL NUTRITIONAL INFO ---------- */}

                  <MDBModal isOpen={modalState} toggle={closeModal} centered>
                        <MDBModalHeader toggle={closeModal}>
                              Nutrition Info
                        </MDBModalHeader>
                        <MDBModalBody>
                              <div>
                                    <div>Calories: {information.calories}</div>
                                    <div>Carbs: {information.carbs}</div>
                                    <div>Fat: {information.fat}</div>
                                    <div>Protein: {information.protein}</div>
                              </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                              <MDBBtn color="secondary" onClick={closeModal}>
                                    Close
                              </MDBBtn>
                              <MDBBtn color="primary">Save changes</MDBBtn>
                        </MDBModalFooter>
                  </MDBModal>

                  {/* ---------- MODAL NUTRITIONAL INFO ---------- */}

                  <div className="textIngredients">
                        <label>Ingredients:</label>
                        <button
                              onClick={(e) =>
                                    setServingsNumber(servingsNumber - 1)
                              }
                        >
                              -
                        </button>
                        <div>{servingsNumber}</div>
                        <button
                              onClick={(e) =>
                                    setServingsNumber(servingsNumber + 1)
                              }
                        >
                              +
                        </button>
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

                  <div className="shoppingContainer">
                        <button
                              onClick={e => {
                                    /* Action to Create ShoppingList in DB */
                                    /* recipeByIngredient.extendedIngredients */

                                    dispatch(actionSendDataShoppingList(user.email, recipeByIngredient))
                                    console.log('user', user.email, 'recypeByIngredient', recipeByIngredient)

                              }}
                        >Add all ingredient to shopping list</button>
                  </div>

                  <div className="textIngredients">
                        <label>Instructions:</label>
                  </div>
                  {recipeByIngredient.analyzedInstructions[0].steps ? (
                        <div className="fullRecipePreparation">
                              <ol>
                                    {recipeByIngredient.analyzedInstructions[0].steps.map(
                                          (s) => {
                                                return <li>{s.step}</li>;
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
      );
};

export default Recipe;

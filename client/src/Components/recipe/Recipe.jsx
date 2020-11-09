import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import "./Recipe.css";
import { useAuth0 } from "@auth0/auth0-react";
import { actionSendDataShoppingList } from "../../Redux/shoppingListActions";
import TopRecipe from "../../Assets/Home/top-receta.svg";
import TimerImage from "../../Assets/Home/timer.svg";
import Servings from "../../Assets/Home/servings.svg";
import NutritionalInfoIcon from "../../Assets/Home/nutritionalInfo.svg";
import ShoppingListIcon from "../../Assets/Home/shoppingList.svg";
import MinusIcon from "../../Assets/Home/minus.svg";
import PlusIcon from "../../Assets/Home/plus.svg";
import CaloriesIcon from "../../Assets/Nutrition/calories.svg";
import CarbsIcon from "../../Assets/Nutrition/carbs.svg";
import FatIcon from "../../Assets/Nutrition/fat.svg";
import ProteinIcon from "../../Assets/Nutrition/protein.svg";
import FavouriteIcon from "../../Assets/Recipe/heart.svg";
import {
      FacebookShareButton,
      PinterestShareButton,
      WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FacebookIcon, PinterestIcon, WhatsappIcon } from "react-share";
import { actionAddRecipeToFavourites } from "../../Redux/recipesActions";

const Recipe = (props) => {
      toast.configure();
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

      const [viewModifyQuantity, setViewModifyQuantity] = useState(false);

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
                                                </WhatsappShareButton>
                                                <a
                                                      onClick={(e) => {
                                                            if (
                                                                  isAuthenticated
                                                            ) {
                                                                  dispatch(
                                                                        actionAddRecipeToFavourites(
                                                                              recipeByIngredient.id,
                                                                              recipeByIngredient.image,
                                                                              recipeByIngredient.title,
                                                                              user.email
                                                                        )
                                                                  );
                                                            } else {
                                                                  toast.error(
                                                                        "You Must LogIn",
                                                                        {
                                                                              position:
                                                                                    "top-center",
                                                                              autoClose: 3000,
                                                                              hideProgressBar: false,
                                                                              closeOnClick: true,
                                                                              pauseOnHover: true,
                                                                              draggable: true,
                                                                              progress: undefined,
                                                                        }
                                                                  );
                                                            }
                                                      }}
                                                >
                                                      <img
                                                            src={FavouriteIcon}
                                                            alt="favouriteIcon"
                                                            className="favouriteIcon"
                                                      />
                                                </a>
                                          </div>
                                    </div>
                              </div>
                              <div className="recipeImage">
                                    <img
                                          src={imageBackgroundTop}
                                          alt="recipe_image"
                                          className="ImageRecipeShow"
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
                                          {viewModifyQuantity === false ? (
                                                <div>
                                                      <MDBBtn
                                                            outline
                                                            onClick={(e) =>
                                                                  setViewModifyQuantity(
                                                                        !viewModifyQuantity
                                                                  )
                                                            }
                                                      >
                                                            Modify Servings?
                                                      </MDBBtn>
                                                </div>
                                          ) : (
                                                <div className="modifyQuantities">
                                                      <a
                                                            onClick={(e) => {
                                                                  if (
                                                                        servingsNumber >
                                                                        1
                                                                  ) {
                                                                        setServingsNumber(
                                                                              servingsNumber -
                                                                                    1
                                                                        );
                                                                  } else {
                                                                        toast.error(
                                                                              "You cannot have less than 1",
                                                                              {
                                                                                    position:
                                                                                          "top-center",
                                                                                    autoClose: 3000,
                                                                                    hideProgressBar: false,
                                                                                    closeOnClick: true,
                                                                                    pauseOnHover: true,
                                                                                    draggable: true,
                                                                                    progress: undefined,
                                                                              }
                                                                        );
                                                                  }
                                                            }}
                                                      >
                                                            <img
                                                                  src={
                                                                        MinusIcon
                                                                  }
                                                                  alt="minus"
                                                                  className="minusIcon"
                                                            />
                                                      </a>
                                                      <div>
                                                            {servingsNumber}
                                                      </div>
                                                      <a
                                                            onClick={(e) =>
                                                                  setServingsNumber(
                                                                        servingsNumber +
                                                                              1
                                                                  )
                                                            }
                                                      >
                                                            <img
                                                                  src={PlusIcon}
                                                                  alt="plus"
                                                                  className="plusIcon"
                                                            />
                                                      </a>
                                                </div>
                                          )}
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
                                                <MDBBtn
                                                      outline
                                                      onClick={(e) =>
                                                            closeModal()
                                                      }
                                                >
                                                      View-Info
                                                </MDBBtn>
                                          </div>
                                          <div className="shoppingContainer">
                                                <img
                                                      alt="shoppingImage"
                                                      className="shoppingImage"
                                                      src={ShoppingListIcon}
                                                />
                                                <MDBBtn
                                                      outline
                                                      onClick={(e) => {
                                                            if (
                                                                  isAuthenticated
                                                            ) {
                                                                  dispatch(
                                                                        actionSendDataShoppingList(
                                                                              user.email,
                                                                              recipeByIngredient
                                                                        )
                                                                  );
                                                                  toast.success(
                                                                        "Recipe Added to Shopping List",
                                                                        {
                                                                              position:
                                                                                    "top-center",
                                                                              autoClose: 3000,
                                                                              hideProgressBar: false,
                                                                              closeOnClick: true,
                                                                              pauseOnHover: true,
                                                                              draggable: true,
                                                                              progress: undefined,
                                                                        }
                                                                  );
                                                            } else {
                                                                  toast.error(
                                                                        "You Must LogIn",
                                                                        {
                                                                              position:
                                                                                    "top-center",
                                                                              autoClose: 3000,
                                                                              hideProgressBar: false,
                                                                              closeOnClick: true,
                                                                              pauseOnHover: true,
                                                                              draggable: true,
                                                                              progress: undefined,
                                                                        }
                                                                  );
                                                            }
                                                      }}
                                                >
                                                      Add To ShoppingList
                                                </MDBBtn>
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

                  {/* ---------- MODAL NUTRITIONAL INFO ---------- */}

                  <MDBModal isOpen={modalState} toggle={closeModal} centered>
                        <MDBModalHeader toggle={closeModal}>
                              Nutrition Info
                        </MDBModalHeader>
                        <MDBModalBody>
                              <div className="nutritionalInfoContainer">
                                    <div className="nutritionInfoContainerLeft">
                                          <div className="caloriesContainer">
                                                <div className="imageAndTextContainer">
                                                      <img
                                                            src={CaloriesIcon}
                                                            alt="iconCalories"
                                                            className="nutritionIcon"
                                                      />
                                                      <label>Calories</label>
                                                </div>
                                                <label className="propsText">
                                                      {information.calories}
                                                </label>
                                          </div>
                                          <div className="carbsContainer">
                                                <div className="imageAndTextContainer">
                                                      <img
                                                            src={CarbsIcon}
                                                            alt="iconCarbs"
                                                            className="nutritionIcon"
                                                      />
                                                      <label>Carbs</label>
                                                </div>
                                                <label className="propsText">
                                                      {information.carbs}
                                                </label>
                                          </div>
                                    </div>
                                    <div className="nutritionInfoContainerRight">
                                          <div className="fatContainer">
                                                <div className="imageAndTextContainer">
                                                      <img
                                                            src={FatIcon}
                                                            alt="iconFat"
                                                            className="nutritionIcon"
                                                      />
                                                      <label>Fat</label>
                                                </div>
                                                <label className="propsText">
                                                      {information.fat}
                                                </label>
                                          </div>
                                          <div className="proteinContainer">
                                                <div className="imageAndTextContainer">
                                                      <img
                                                            src={ProteinIcon}
                                                            alt="iconProtein"
                                                            className="nutritionIcon"
                                                      />
                                                      <label>Protein</label>
                                                </div>
                                                <label className="propsText">
                                                      {information.protein}
                                                </label>
                                          </div>
                                    </div>
                              </div>
                        </MDBModalBody>
                  </MDBModal>

                  {/* ---------- MODAL NUTRITIONAL INFO ---------- */}
            </div>
      );
};

export default Recipe;

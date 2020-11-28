import React from "react";
import TimerImage from "../../../Assets/Home/timer.svg";
import Servings from "../../../Assets/Home/servings.svg";
import NutritionalInfoIcon from "../../../Assets/Home/nutritionalInfo.svg";
import ShoppingListIcon from "../../../Assets/Home/shoppingList.svg";
import { MDBBtn } from "mdbreact";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { actionSendDataShoppingList } from "../../../Redux/shoppingListActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actionGetNutritionalInfo } from "../../../Redux/recipesActions";

const ExtraRecipeContainer = (props) => {
      toast.configure();
      const dispatch = useDispatch();
      const { recipeByIngredient, closeModal } = props;
      const { user, isAuthenticated } = useAuth0();
      dispatch(actionGetNutritionalInfo(recipeByIngredient.id))

      return (
            <div className="recipeExtras">
                  <div className="timeReady">
                        <div className="preparation">
                              <img
                                    src={TimerImage}
                                    alt="timerIcon"
                                    className="timerImage"
                              />
                              {recipeByIngredient.readyInMinutes}
                              <div className="textRecipe">minutes</div>
                        </div>
                        <div className="servings">
                              <img
                                    src={Servings}
                                    alt="servingsQuantity"
                                    className="servingsImage"
                              />
                              {recipeByIngredient.servings}
                              <div className="textRecipe">servings</div>
                        </div>
                        <div className="nutritionInfo">
                              <img
                                    alt="nutritionImage"
                                    className="nutritionImage"
                                    src={NutritionalInfoIcon}
                              />
                              <MDBBtn outline onClick={(e) => closeModal()}>
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
                                          if (isAuthenticated) {
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
                                                toast.error("You Must LogIn", {
                                                      position: "top-center",
                                                      autoClose: 3000,
                                                      hideProgressBar: false,
                                                      closeOnClick: true,
                                                      pauseOnHover: true,
                                                      draggable: true,
                                                      progress: undefined,
                                                });
                                          }
                                    }}
                              >
                                    Add To ShoppingList
                              </MDBBtn>
                        </div>
                  </div>
            </div>
      );
};

export default ExtraRecipeContainer;

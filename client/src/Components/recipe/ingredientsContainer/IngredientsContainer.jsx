import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import MinusIcon from "../../../Assets/Home/minus.svg";
import PlusIcon from "../../../Assets/Home/plus.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IngredientsContainer = (props) => {
      toast.configure();
      const { recipeByIngredient } = props;

      const [servingsNumber, setServingsNumber] = useState(
            recipeByIngredient.servings
      );
      const [viewModifyQuantity, setViewModifyQuantity] = useState(false);

      const decimalFractions = (number) => {
            let numberToShow =
                  (number / recipeByIngredient.servings) * servingsNumber;

            let numberToReturn = numberToShow.toFixed(2);

            if (numberToReturn.slice(-2) === "00")
                  return numberToReturn.slice(0, -3);
            return numberToReturn;
      };

      return (
            <div className="recipeIngredientsContainer">
                  <h2 className="titleIngredients">INGREDIENTS</h2>
                  <div className="recipeIngredients">
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
                                          className="buttonModifyServings"
                                          onClick={(e) => {
                                                if (servingsNumber > 1) {
                                                      setServingsNumber(
                                                            servingsNumber - 1
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
                                                src={MinusIcon}
                                                alt="minus"
                                                className="minusIcon"
                                          />
                                    </a>
                                    <div>{servingsNumber}</div>
                                    <a
                                          className="buttonModifyServings"
                                          onClick={(e) =>
                                                setServingsNumber(
                                                      servingsNumber + 1
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
      );
};

export default IngredientsContainer;

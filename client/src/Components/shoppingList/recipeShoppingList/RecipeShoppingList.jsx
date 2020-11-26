import React from "react";
import "./RecipeShoppingList.css";
import Delete from "../../../Assets/Home/eliminate.svg";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { actionDeleteShoppingList } from "../../../Redux/shoppingListActions";

const RecipeShoppingList = (props) => {
      const { name, ingredients } = props.list;

      const dispatch = useDispatch();
      const { user } = useAuth0();

      const decimalFractions = (number) => {
            if (number % 1 === "0") return number;
            else {
                  return number.slice(0, 4);
            }
      };
      return (
            <div className="recipeShoppingListContainer">
                  <div className="nameAndButtonDeleteContainer">
                        <label className="nameShoppingList1">{name}</label>
                        <a
                              className="aButtonDeleteRecipeShoppingList"
                              onClick={(e) =>
                                    dispatch(
                                          actionDeleteShoppingList(
                                                props.list.idShoppingList,
                                                user.email
                                          )
                                    )
                              }
                        >
                              <img
                                    src={Delete}
                                    className="buttonDeleteRecipeShoppingList"
                              />
                        </a>
                  </div>

                  <div className="elementsPersonalShoppingListContainer">
                        {ingredients.map((ingre) => {
                              return (
                                    <div className="elementPersonalShoppingListContainer">
                                          <label className="nameIngredientPersonalShoppingList">
                                                {ingre.name.toUpperCase()}{" "}
                                                {decimalFractions(ingre.amount)}{" "}
                                                {ingre.unit}
                                          </label>
                                    </div>
                              );
                        })}
                  </div>
            </div>
      );
};

export default RecipeShoppingList;

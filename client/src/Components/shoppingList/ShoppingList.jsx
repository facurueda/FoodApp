import React from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
      actionAddPersonalShoppingList,
      actionGetAllShoppingList,
      actionMarkElemPersonalShoppingList,
} from "../../Redux/shoppingListActions";
import { useDispatch, useSelector } from "react-redux";
import "./ShoppingList.css";
import { useState } from "react";
import printJS from 'print-js'


const ShoppingList = () => {
      const { user } = useAuth0();

      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(actionGetAllShoppingList(user.email));
      }, []);

      const allShoppingList = useSelector(
            (state) => state.shoppingListReducer.allShoppingList
      );

      const personalShoppingList = useSelector(
            (state) => state.shoppingListReducer.personalShoppingList
      );

      const [personalIngredient, setPersonalIngredient] = useState({});

      const [inputText, setInputText] = useState("");

      return (
            <div className="shoppingListContainer">
                  <div className="shoppingListTitle">Shopping List</div>
                  <div className="inputToAddIngredients">
                        <form
                              onSubmit={(e) => {
                                    e.preventDefault();
                                    dispatch(
                                          actionAddPersonalShoppingList(
                                                personalIngredient
                                          )
                                    );
                                    setInputText("");
                              }}
                        >
                              <input
                                    placeholder="Add Ingredient / Item to buy"
                                    type="text"
                                    onChange={(e) => {
                                          setInputText(e.target.value);
                                          setPersonalIngredient({
                                                name: e.target.value,
                                                isCompleted: false,
                                          });
                                    }}
                                    value={inputText}
                              />
                              <input type="submit" value="+" />
                        </form>
                  </div>
                  {personalShoppingList.length > 0 ? (
                        <div className="shoppingRecipesContainer">
                              <div className="listRecipeContainer">
                                    <div className="listRecipeContainerTitle">
                                          Personal Shopping List
                                    </div>
                                    <ul className="ulShoppingList">
                                          <div className="liContainer">
                                                {personalShoppingList.map(
                                                      (ingredient, index) => {
                                                            return (
                                                                  <li
                                                                        className={
                                                                              ingredient.isCompleted
                                                                                    ? "liShoppingListCompleted"
                                                                                    : "liShoppingList"
                                                                        }
                                                                  >
                                                                        {
                                                                              ingredient.name
                                                                        }
                                                                        <button
                                                                              onClick={(
                                                                                    e
                                                                              ) =>
                                                                                    dispatch(
                                                                                          actionMarkElemPersonalShoppingList(
                                                                                                index
                                                                                          )
                                                                                    )
                                                                              }
                                                                        >
                                                                              X
                                                                        </button>
                                                                  </li>
                                                            );
                                                      }
                                                )}
                                          </div>
                                    </ul>
                              </div>
                        </div>
                  ) : (
                        ""
                  )}
                  <div className="shoppingRecipesContainer">
                        {allShoppingList.map((list) => {
                              return (
                                    <div className="listRecipeContainer">
                                          <div className="listRecipeContainerTitle">
                                                {list.name}
                                          </div>
                                          <ul className="ulShoppingList">
                                                <div className="liContainer">
                                                      {list.ingredients.map(
                                                            (ingredient) => {
                                                                  return (
                                                                        <li className="liShoppingList">
                                                                              {
                                                                                    ingredient.name
                                                                              }{" "}
                                                                              {
                                                                                    ingredient.amount
                                                                              }{" "}
                                                                              {
                                                                                    ingredient.unit
                                                                              }
                                                                        </li>
                                                                  );
                                                            }
                                                      )}
                                                </div>
                                          </ul>
                                    </div>
                              );
                        })}
                  </div>
            </div>
      );
};

export default ShoppingList;

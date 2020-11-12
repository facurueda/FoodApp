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
import printJS from "print-js";

import TopImage from "../../Assets/Home/top-receta.svg";
import { MDBBtn } from "mdbreact";
import {
      actionViewPersonalShoppingList,
      actionViewButtonPersonalShoppingList,
} from "../../Redux/recipesActions";

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

      const viewPersonalShoppingList = useSelector(
            (state) => state.recipesReducer.viewPersonalShoppingList
      );

      const viewButton = useSelector(
            (state) => state.recipesReducer.viewButtonPersonalShoppingList
      );

      return (
            <div className="shoppingListContainer">
                  <div className="topFavouritesRecipe">
                        <div
                              className="imageTopFavouritesRecipes"
                              style={{
                                    backgroundImage:
                                          "BackgroundFavouritesRecipes",
                              }}
                        />
                        <div className="gridTopFavouritesRecipes">
                              <div className="tableTopFavouritesRecipes">
                                    <div className="cellTopFavouritesRecipes">
                                          <h1 className="favouritesRecipeTitleTop">
                                                Shopping List
                                          </h1>
                                          <div className="shareTopRecipe"></div>
                                    </div>
                              </div>
                        </div>
                        <img
                              src={TopImage}
                              className="imageFavouriteBottomTop"
                        />
                  </div>
                  {/* <div className="shoppingListTitle">Shopping List</div> */}
                  <div className="buttonToViewPersonalShoppingList">
                        <MDBBtn
                              style={{
                                    display: `${viewButton}`,
                                    backgroundColor: "white",
                              }}
                              color="mdb-color"
                              onClick={(e) => {
                                    dispatch(
                                          actionViewButtonPersonalShoppingList()
                                    );
                                    dispatch(actionViewPersonalShoppingList());
                                    console.log("ButtonClicked");
                              }}
                        >
                              Add Personal Shopping List?
                        </MDBBtn>
                  </div>
                  <div className="bodyShoppingListContainer">
                        <div
                              className="inputToAddIngredients"
                              style={{ display: `${viewPersonalShoppingList}` }}
                        >
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
                                          className="inputShoppingList"
                                          onChange={(e) => {
                                                setInputText(e.target.value);
                                                setPersonalIngredient({
                                                      name: e.target.value,
                                                      isCompleted: false,
                                                });
                                          }}
                                          value={inputText}
                                    />
                                    <input
                                          type="submit"
                                          value="+"
                                          className="buttonInputShoppingList"
                                    />
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
                                                            (
                                                                  ingredient,
                                                                  index
                                                            ) => {
                                                                  return (
                                                                        <li
                                                                              className={
                                                                                    ingredient.isCompleted
                                                                                          ? "liShoppingListCompleted"
                                                                                          : "liShoppingList"
                                                                              }
                                                                        >
                                                                              <div className="personalShoppingListItemContainer">
                                                                                    <label className="textPersonalShoppingList">
                                                                                          {
                                                                                                ingredient.name
                                                                                          }
                                                                                    </label>
                                                                                    <div className="buttonPersonalShoppingListItem">
                                                                                          <input
                                                                                                className='buttonToMarkCheckItemPersonalList'
                                                                                                type='checkbox'
                                                                                                onClick={(
                                                                                                      e
                                                                                                ) =>
                                                                                                      dispatch(
                                                                                                            actionMarkElemPersonalShoppingList(
                                                                                                                  index
                                                                                                            )
                                                                                                      )
                                                                                                }
                                                                                          />
                                                                                                {/* X
                                                                                          </input> */}
                                                                                    </div>
                                                                              </div>
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
                                                                  (
                                                                        ingredient
                                                                  ) => {
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
            </div>
      );
};

export default ShoppingList;

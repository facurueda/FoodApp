import React from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { actionGetAllShoppingList } from "../../Redux/shoppingListActions";
import { useDispatch, useSelector } from "react-redux";

const ShoppingList = () => {
      const { user, isAuthenticated, isLoading } = useAuth0();

      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(actionGetAllShoppingList(user.email));
      }, []);

      const allShoppingList = useSelector(
            (state) => state.shoppingListReducer.allShoppingList
      );

      {
            console.log(allShoppingList);
      }

      return (
            <div className="shoppingListContainer">
                  <div className="shoppingListTitle">Shopping List</div>
                  <div className="inputToAddIngredients">
                        <input placeholder="Add Ingredient / Item to buy" />
                        <button>+</button>
                  </div>

                  {/* Place to map ingredients */}

                  {allShoppingList.map((list) => {
                        return (
                              <div className="listContainer">
                                    <div className="listContainerTitle">
                                          {list.name}
                                    </div>
                                    <ol>
                                          {list.ingredients.map(
                                                (ingredient) => {
                                                      return (
                                                            <li>
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
                                    </ol>
                              </div>
                        );
                  })}
            </div>
      );
};

export default ShoppingList;

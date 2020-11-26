import React from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { actionGetAllShoppingList } from "../../Redux/shoppingListActions";
import { useDispatch, useSelector } from "react-redux";
import "./ShoppingList.css";
import TopImage from "../../Assets/Home/top-receta.svg";
import { MDBBtn } from "mdbreact";
import {
      actionViewPersonalShoppingList,
      actionViewButtonPersonalShoppingList,
} from "../../Redux/recipesActions";
import RecipeShoppingList from "./recipeShoppingList/RecipeShoppingList";
import PersonalShoppingList from "./personalShoppingList/PersonalShoppingList";

const ShoppingList = () => {
      const { user, loginWithRedirect } = useAuth0();

      const dispatch = useDispatch();

      useEffect(() => {
            if (!user) loginWithRedirect();
            else {
                  dispatch(actionGetAllShoppingList(user.email));
            }
      }, []);

      const allShoppingList = useSelector(
            (state) => state.shoppingListReducer.allShoppingList
      );

      const viewPersonalShoppingList = useSelector(
            (state) => state.recipesReducer.viewPersonalShoppingList
      );

      const viewButton = useSelector(
            (state) => state.recipesReducer.viewButtonPersonalShoppingList
      );

      return (
            <div className="shoppingListContainer">
                  <div className="topFavouritesRecipe">
                        <div className="imageTopFavouritesRecipes" />
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
                              alt='TopImage'
                              src={TopImage}
                              className="imageFavouriteBottomTop"
                        />
                  </div>
                  <div className="buttonToViewPersonalShoppingList">
                        <MDBBtn
                              style={{
                                    display: `${viewButton}`,
                                    backgroundColor: "white",
                                    marginLeft: "5vw",
                              }}
                              color="mdb-color"
                              onClick={(e) => {
                                    dispatch(
                                          actionViewButtonPersonalShoppingList()
                                    );
                                    dispatch(actionViewPersonalShoppingList());
                              }}
                        >
                              Add Personal Shopping List?
                        </MDBBtn>
                        <div style={{ display: `${viewPersonalShoppingList}` }}>
                              <PersonalShoppingList />
                        </div>
                  </div>
                  <div className="bodyShoppingListContainer">
                        <div className="recipesShoppingListContainer1">
                              {allShoppingList.map((list) => {
                                    return (
                                          <div className="shoppingRecipesContainer">
                                                <RecipeShoppingList
                                                      list={list}
                                                />
                                          </div>
                                    );
                              })}
                        </div>
                  </div>
            </div>
      );
};

export default ShoppingList;

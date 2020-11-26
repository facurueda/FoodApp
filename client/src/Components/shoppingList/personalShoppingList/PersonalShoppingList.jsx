import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
      actionAddElementPS,
      actionDeleteElementPS,
} from "../../../Redux/shoppingListActions";
import "./PersonalShoppingList.css";
import Checked from "../../../Assets/Home/delete.svg";

const PersonalShoppingList = () => {
      const dispatch = useDispatch();
      const itemsPersonalShoppingList = useSelector(
            (state) => state.shoppingListReducer.personalShoppingList
      );
      const [textInputAddElement, setTextInputAddElement] = useState("");

      return (
            <div className="personalShoppingListContainer">
                  <label className="nameShoppingList">
                        Personal Shopping List
                  </label>
                  <div className="inputContainer">
                        <form
                              className="formContainer"
                              onSubmit={(e) => {
                                    e.preventDefault();
                                    dispatch(
                                          actionAddElementPS(
                                                textInputAddElement
                                          )
                                    );
                                    setTextInputAddElement("");
                              }}
                        >
                              <div className="inputTextContainer">
                                    <input
                                          type="text"
                                          className="inputAddElementPersonalShoppingList"
                                          onChange={(e) => {
                                                setTextInputAddElement(
                                                      e.target.value
                                                );
                                          }}
                                          value={textInputAddElement}
                                          placeholder="Add an Ingredient..."
                                    />
                                    <input
                                          type="submit"
                                          className="buttonAddElement"
                                          value="+"
                                    />
                              </div>
                        </form>
                        {itemsPersonalShoppingList.length > 0 ? (
                              <div className="elementsPersonalShoppingListContainer">
                                    {itemsPersonalShoppingList.map(
                                          (e, index) => {
                                                return (
                                                      <div className="elementPersonalShoppingListContainer">
                                                            <label className="nameIngredientPersonalShoppingList">
                                                                  {e.toUpperCase()}
                                                            </label>
                                                            <a
                                                                  className="buttonToDeleteElementPersonalShoppingList"
                                                                  onClick={(
                                                                        e
                                                                  ) => {
                                                                        dispatch(
                                                                              actionDeleteElementPS(
                                                                                    index
                                                                              )
                                                                        );
                                                                  }}
                                                            >
                                                                  <img
                                                                        src={
                                                                              Checked
                                                                        }
                                                                        className="imageChecked"
                                                                  />
                                                            </a>
                                                      </div>
                                                );
                                          }
                                    )}
                              </div>
                        ) : (
                              ""
                        )}
                  </div>
            </div>
      );
};

export default PersonalShoppingList;

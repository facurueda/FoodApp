import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
      actionAddIngredientToList,
      actionDeleteIngredientsAndRecipes,
      actionGetRecipesByIngredients,
      actionSearchProduct,
      actionStartSpinner,
} from "../../../Redux/recipesActions";

const InputSearch = () => {
      toast.configure();
      const dispatch = useDispatch();
      const [valueSearch, setValueSearch] = useState("");
      const [namesIngredients, setNamesIngredients] = useState([]);
      const [dispatchAction, setDispatchAction] = useState(false);
      const listProductSearch = useSelector(
            (state) => state.recipesReducer.searchProducts
      );
      const onChangeProductSearch = (e) => {
            setValueSearch(e.target.value);
            dispatch(actionSearchProduct(e.target.value));
      };
      const getProductImage = (ingredient) => {
            dispatch(
                  actionAddIngredientToList({
                        ingredientName: valueSearch.toUpperCase(),
                        ingredientPhoto: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient[0].image}`,
                  })
            );
      };
      if (dispatchAction) {
            dispatch(
                  actionGetRecipesByIngredients(namesIngredients.toString())
            );
            setDispatchAction(false);
      }

      return (
            <div className="containerInputSearch">
                  <form
                        onSubmit={(e) => {
                              e.preventDefault();
                              let ingre = listProductSearch.filter(
                                    (ingredient) =>
                                          ingredient.name ===
                                          valueSearch.toLowerCase()
                              );
                              if (ingre.length > 0) {
                                    setNamesIngredients([
                                          ...namesIngredients,
                                          "+" + valueSearch.toUpperCase(),
                                    ]);

                                    getProductImage(ingre);
                                    setValueSearch("");
                                    setDispatchAction(true);
                                    dispatch(actionStartSpinner());
                              } else {
                                    toast.error("Please Retry Again", {
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
                        <input
                              className="inputSearchByIngredients"
                              list="searchProduct"
                              type="search"
                              placeholder="Search Product"
                              value={valueSearch}
                              onChange={onChangeProductSearch}
                        />
                        <datalist id="searchProduct">
                              {valueSearch.length > 1
                                    ? listProductSearch.map((prod) => {
                                            return <option value={prod.name} />;
                                      })
                                    : null}
                        </datalist>
                  </form>
                  <button
                        className="buttonSearchByIngredients"
                        onClick={(e) => {
                              dispatch(actionDeleteIngredientsAndRecipes());
                        }}
                  >
                        Clear Ingredients
                  </button>
            </div>
      );
};

export default InputSearch;

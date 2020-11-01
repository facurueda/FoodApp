import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import "./SearchByIngredients.css";
import ProductCard from "./ProductCard";
import {
      actionDeleteIngredientsAndRecipes,
      actionGetRecipesByIngredients,
      actionGetRecipeToShowByIngredients,
      actionSearchProduct,
} from "../../Redux/recipesActions";
import {
      MDBCard,
      MDBCardBody,
      MDBCardImage,
      MDBCardTitle,
      MDBCol,
} from "mdbreact";
import { Link } from "react-router-dom";

const SearchByIngredients = () => {
      const dispatch = useDispatch();

      ////////////////////////////////////////////////// -- States and Functions Ingredients  -- //////////////////////////////////////////////////

      const [valueSearch, setValueSearch] = useState("");
      const [listIngredients, setListIngredients] = useState([]);

      const [namesIngredients, setNamesIngredients] = useState([]);

      const listProductSearch = useSelector(
            (state) => state.recipesReducer.searchProducts
      );

      const onChangeProductSearch = (e) => {
            setValueSearch(e.target.value);
            dispatch(actionSearchProduct(e.target.value));
            
      };

      const getProductImage = (ingredient) => {
            setListIngredients([
                  ...listIngredients,
                  {
                        ingredientName: valueSearch.toUpperCase(),
                        ingredientPhoto: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient[0].image}`,
                  },
            ]);
      };

      ////////////////////////////////////////////////// -- States and Functions Recipes By Ingredients  -- //////////////////////////////////////////////////

      const recipesByIngredients = useSelector(
            (state) => state.recipesReducer.recipesByIngredients
      );

      return (
            <div className="containerSearchByIngredients">
                  <div className="containerInputSearch">
                        <form
                              onSubmit={(e) => {
                                    e.preventDefault();
                                    getProductImage(
                                          listProductSearch.filter(
                                                (ingredient) =>
                                                      ingredient.name ===
                                                      valueSearch.toLowerCase()
                                          )
                                    );
                                    setNamesIngredients([
                                          ...namesIngredients,
                                          "+" + valueSearch.toUpperCase(),
                                    ]);
                                    setValueSearch("");
                                    dispatch(
                                          actionGetRecipesByIngredients(namesIngredients.toString())
                                    );
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
                                                  return (
                                                        <option
                                                              value={prod.name}
                                                        />
                                                  );
                                            })
                                          : null}
                              </datalist>
                        </form>
                        <button
                              className="buttonSearchByIngredients"
                              onClick={(e) => {
                                    dispatch(
                                          actionDeleteIngredientsAndRecipes()
                                    );
                                    setListIngredients([]);
                              }}
                        >
                              Clear X
                        </button>
                  </div>
                  <div className="containerIngredients">
                        {listIngredients.map((ingredient) => {
                              return (
                                    <ProductCard
                                          productPhoto={
                                                ingredient.ingredientPhoto
                                          }
                                          productName={
                                                ingredient.ingredientName
                                          }
                                    />
                              );
                        })}
                  </div>
                  <div className="containerRecipesByIngredients">
                        {recipesByIngredients.map((recipe) => {
                              return (
                                    <MDBCol>
                                          <MDBCard className="cardContainer">
                                                <Link
                                                      to={{
                                                            pathname:
                                                                  "/Spinner",
                                                            state: {},
                                                      }}
                                                      onClick={(e) => {
                                                            dispatch(
                                                                  actionGetRecipeToShowByIngredients(
                                                                        recipe.id
                                                                  )
                                                            );
                                                            console.log(
                                                                  "recipe",
                                                                  recipe
                                                            );
                                                      }}
                                                >
                                                      <MDBCardImage
                                                            className="cardProductImage"
                                                            src={recipe.image}
                                                            waves
                                                      />
                                                </Link>
                                                <MDBCardBody className="cardBodyRecipes">
                                                      <MDBCardTitle className="cardTitleContainer">
                                                            {recipe.title}
                                                      </MDBCardTitle>
                                                </MDBCardBody>
                                          </MDBCard>
                                    </MDBCol>
                              );
                        })}
                  </div>
            </div>
      );
};

export default SearchByIngredients;

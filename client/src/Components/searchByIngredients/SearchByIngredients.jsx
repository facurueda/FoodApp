import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import "./SearchByIngredients.css";
import ProductCard from "./ProductCard";
import {
      actionAddRecipeToFavourites,
      actionCleanState,
      actionDeleteIngredientsAndRecipes,
      actionGetMoreRecipes,
      actionGetRecipesByIngredients,
      actionGetRecipeToShowByIngredients,
      actionSearchProduct,
      actionStartSpinner,
} from "../../Redux/recipesActions";
import {
      MDBCard,
      MDBCardBody,
      MDBCardImage,
      MDBCardTitle,
      MDBCol,
} from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import Heart from "../../Assets/Recipe/heart.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";
import SpinnerSearch from "./SpinnerSearch";
import buttonGoBack from "../../Assets/Home/reply.svg";

const SearchByIngredients = () => {
      toast.configure();
      const dispatch = useDispatch();
      const { user, isAuthenticated, isLoading } = useAuth0();

      ////////////////////////////////////////////////// -- States and Functions Ingredients  -- //////////////////////////////////////////////////

      const [valueSearch, setValueSearch] = useState("");
      const [listIngredients, setListIngredients] = useState([]);

      const [namesIngredients, setNamesIngredients] = useState([]);

      const [dispatchAction, setDispatchAction] = useState(false);

      const spinnerStatus = useSelector(
            (state) => state.recipesReducer.spinnerStatus
      );

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

      if (dispatchAction) {
            dispatch(
                  actionGetRecipesByIngredients(namesIngredients.toString())
            );
            setDispatchAction(false);
      }

      ////////////////////////////////////////////////// -- States and Functions Recipes By Ingredients  -- //////////////////////////////////////////////////

      const recipesByIngredients = useSelector(
            (state) => state.recipesReducer.recipesByIngredients
      );

      const history = useHistory();

      return (
            <div className="containerSearchByIngredients">
                  <div className="headerPageSearchByIngredientContainer">
                        <img
                              className="buttonGoBackPageSearch"
                              src={buttonGoBack}
                              onClick={(e) => {
                                    history.goBack();
                              }}
                        />
                        <div className="containerInputSearch">
                              <form
                                    onSubmit={(e) => {
                                          setNamesIngredients([
                                                ...namesIngredients,
                                                "+" + valueSearch.toUpperCase(),
                                          ]);

                                          e.preventDefault();
                                          getProductImage(
                                                listProductSearch.filter(
                                                      (ingredient) =>
                                                            ingredient.name ===
                                                            valueSearch.toLowerCase()
                                                )
                                          );
                                          setValueSearch("");
                                          setDispatchAction(true);
                                          dispatch(actionStartSpinner());
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
                                                ? listProductSearch.map(
                                                        (prod) => {
                                                              return (
                                                                    <option
                                                                          value={
                                                                                prod.name
                                                                          }
                                                                    />
                                                              );
                                                        }
                                                  )
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
                                    Clear Ingredients
                              </button>
                        </div>
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
                        {spinnerStatus ? (
                              <SpinnerSearch style={{ marginTop: "25vw" }} />
                        ) : (
                              recipesByIngredients.map((recipe) => {
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
                                                                  dispatch(actionCleanState())
                                                                  dispatch(
                                                                        actionStartSpinner()
                                                                  );
                                                                  dispatch(
                                                                        actionGetRecipeToShowByIngredients(
                                                                              recipe.id
                                                                        )
                                                                  );
                                                            }}
                                                      >
                                                            <MDBCardImage
                                                                  className="cardProductImage"
                                                                  src={
                                                                        recipe.image
                                                                  }
                                                                  waves
                                                            />
                                                      </Link>
                                                      <a
                                                            className="buttonToAddFavourite"
                                                            onClick={(e) => {
                                                                  if (
                                                                        isAuthenticated
                                                                  ) {
                                                                        dispatch(
                                                                              actionAddRecipeToFavourites(
                                                                                    recipe.id,
                                                                                    recipe.image,
                                                                                    recipe.title,
                                                                                    user.email
                                                                              )
                                                                        );
                                                                  } else {
                                                                        toast.error(
                                                                              "You Must LogIn",
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
                                                                  src={Heart}
                                                                  className="iconToAddFavourite"
                                                                  alt="icon"
                                                            />
                                                      </a>
                                                      <MDBCardBody className="cardBodyRecipes">
                                                            <MDBCardTitle className="cardTitleContainer">
                                                                  {recipe.title}
                                                            </MDBCardTitle>
                                                      </MDBCardBody>
                                                </MDBCard>
                                          </MDBCol>
                                    );
                              })
                        )}
                  </div>
            </div>
      );
};

export default SearchByIngredients;

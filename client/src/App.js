import React from "react";
import "./App.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Route, BrowserRouter as Router, HashRouter } from "react-router-dom";
import Home from "./Components/home/Home";
import SearchRecipesByIngredients from "./Components/searchByIngredients/SearchByIngredients";
import Recipe from "./Components/recipe/Recipe";
import SpinnerPage from "./Components/spinnerPage/Spinner";
import ItemList from "./Components/shoppingList/ItemList";
import NavBar from "./Components/navBar/NavBar";
import ShoppingList from "./Components/shoppingList/ShoppingList";
import FavouritesRecipes from "./Components/favouritesRecipes/FavouritesRecipes";
import Footer from "./Components/footer/Footer";
import PageRecipe from "./Components/pageRecipe/PageRecipe";
import RecipesByCountry from "./Components/recipesByCountry/RecipesByCountry";
import PageSearchRecipes from "./Components/pageSearchRecipes/PageSearchRecipes";

function App() {
      return (
            <div className="divAppContainer">
                  <HashRouter>
                        <Route
                              render={() => (
                                    <React.Fragment>
                                          <NavBar />
                                          <main>
                                                <Route
                                                      path="/"
                                                      exact
                                                      component={Home}
                                                />
                                                <Route
                                                      path="/Recipe"
                                                      component={Recipe}
                                                />
                                                <Route
                                                      path="/Search"
                                                      component={
                                                            PageSearchRecipes
                                                      }
                                                />
                                                <Route
                                                      path="/SearchRecipeByIngredients"
                                                      component={
                                                            SearchRecipesByIngredients
                                                      }
                                                />
                                                <Route
                                                      path="/Spinner"
                                                      component={SpinnerPage}
                                                />
                                                <Route
                                                      path="/test"
                                                      component={ItemList}
                                                />
                                                <Route
                                                      path="/shoppingList"
                                                      component={ShoppingList}
                                                />
                                                <Route
                                                      path="/FavouritesRecipes"
                                                      component={
                                                            FavouritesRecipes
                                                      }
                                                />
                                                <Route
                                                      path="/Recipes"
                                                      component={PageRecipe}
                                                />
                                                <Route
                                                      path="/RecipesByCountries"
                                                      component={
                                                            RecipesByCountry
                                                      }
                                                />
                                          </main>
                                          <Footer />
                                    </React.Fragment>
                              )}
                        />
                  </HashRouter>
            </div>
      );
}

export default App;

import React from "react";
import SideNav, {
      Toggle,
      Nav,
      NavItem,
      NavIcon,
      NavText,
} from "@trendmicro/react-sidenav";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "mdbreact/dist/css/mdb.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Components/home/Home";
import SearchRecipesByIngredients from "./Components/searchByIngredients/SearchByIngredients";
import Recipe from "./Components/recipe/Recipe";
import SpinnerPage from "./Components/spinnerPage/Spinner";
import ItemList from "./Components/shoppingList/ItemList";

import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./Components/navBar/NavBar";
import ShoppingList from "./Components/shoppingList/ShoppingList";
import FavouritesRecipes from "./Components/favouritesRecipes/FavouritesRecipes";
import Footer from "./Components/footer/Footer";

function App() {
      const { loginWithRedirect } = useAuth0();

      return (
            <div className="divAppContainer">
                  <Router>
                        <Route
                              render={({ location, history }) => (
                                    <React.Fragment>
                                          <NavBar/>
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
                                          </main>
                                          <Footer/>
                                    </React.Fragment>
                              )}
                        />
                  </Router>
            </div>
      );
}

export default App;

import React from "react";
import RandomRecipes from "../randomRecipes/RandomRecipes";
import WhatToCook from "../searchByIngredients/SearchByIngredients";
import SearchRecipes from "../../Assets/Home/SearchRecipes.png";
import SearchRecipesByIngredients from "../../Assets/Home/SearchRecipesByIngredients.png";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
      return (
            <div className="homeContainer">
                  <RandomRecipes />
                  <div className="searchRecipes">
                        {/* <Link
                              to={{
                                    pathname: "/SearchRecipe",
                              }}
                        >
                              <img
                                    alt="ImageSearch"
                                    src={SearchRecipes}
                                    className="modalOpenSearchRecipesByIngredients"
                              />
                        </Link> */}
                        <Link
                              to={{
                                    pathname: "/SearchRecipeByIngredients",
                              }}
                        >
                              <img
                                    alt="ImageSearch"
                                    src={SearchRecipesByIngredients}
                                    className="modalOpenSearchRecipesByIngredients"
                              />
                        </Link>
                  </div>
            </div>
      );
};

export default Home;

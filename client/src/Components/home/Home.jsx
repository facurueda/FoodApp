import React from "react";
import RandomRecipes from "../randomRecipes/RandomRecipes";

import "./Home.css";


const Home = () => {
      return (
            <div className="homeContainer">
                  <RandomRecipes />
            </div>
      );
};

export default Home;

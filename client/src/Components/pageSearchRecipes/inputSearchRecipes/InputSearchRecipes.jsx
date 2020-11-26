import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
      actionSearchRecipes,
      actionStartSpinner,
} from "../../../Redux/recipesActions";
import "./InputSearchRecipes.css";

const InputSearchRecipes = () => {
      const dispatch = useDispatch();

      const [valueSearch, setValueSearch] = useState();

      const onChange = (e) => {
            setValueSearch(e.target.value);
      };

      return (
            <div className="containerInputSearch">
                  <form
                        onSubmit={(e) => {
                              e.preventDefault();
                              dispatch(actionSearchRecipes(valueSearch));
                              dispatch(actionStartSpinner());
                        }}
                  >
                        <input
                              className="inputSearchByIngredients"
                              list="searchProduct"
                              type="search"
                              placeholder="Search Recipe..."
                              value={valueSearch}
                              onChange={onChange}
                        />
                  </form>
            </div>
      );
};

export default InputSearchRecipes;

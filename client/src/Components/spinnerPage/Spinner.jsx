import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Spinner.css";

const SpinnerPage = () => {
      const history = useHistory();

      const dataToShow = useSelector(
            (state) => state.recipesReducer.recipeToShow
      );

      return (
            <div className="spinner-container">
                  {dataToShow.title ? history.push("/Recipe") : ""}
                  <div className="spinner-border" role="status"></div>
                  <span className='text-spinner'>Loading...</span>
            </div>
      );
};

export default SpinnerPage;

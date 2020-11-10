import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./SpinnerSearch.css";

const SpinnerPage = () => {
      return (
            <div className="spinnerSearch-container">
                  <div className="spinner-border" role="status"></div>
                  <span className='text-spinner'>Loading...</span>
            </div>
      );
};

export default SpinnerPage;

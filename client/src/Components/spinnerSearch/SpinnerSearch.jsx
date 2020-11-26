import React from "react";
import "./SpinnerSearch.css";

const SpinnerSearch = () => {
      return (
            <div className="spinnerSearch-container">
                  <div className="spinner-border" role="status"></div>
                  <span className='text-spinner'>Loading...</span>
            </div>
      );
};

export default SpinnerSearch;

import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const SpinnerPage = () => {

      const history = useHistory()
      
      useEffect(() => {
            setTimeout(() => {
                  history.push('/Recipe')
            }, 1500)
      }, [])
      
      return (
            <div>
                  <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                  </div>
            </div>
      );
};

export default SpinnerPage;

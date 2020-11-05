import React from "react";
import { useState } from "react";
import { Checkbox } from "pretty-checkbox-react";

import "@djthoms/pretty-checkbox";
import "./ItemList.css";

const ItemList = (props) => {

      return (
            <div className="itemListContainer">
                  <Checkbox
                        color="success-o"
                        shape="round"
                  />
                  <label className="ingredientName">{props.name}</label>
            </div>
      );
};

export default ItemList;

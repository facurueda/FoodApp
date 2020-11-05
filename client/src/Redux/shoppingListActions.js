import axios from "axios";
import {
      CREATE_SHOPPING_LIST,
      GET_ALL_SHOPPINT_LIST
} from "./constants";
var qs = require("qs");

const URL = "http://localhost:5000/";

export const actionSendDataShoppingList = (userEmail, recypeByIngredients) => {
      return (dispatch) => {
            var data = qs.stringify({userEmail, recypeByIngredients})
            var config = {
                  method: "POST",
                  url: URL + "shoppingList/Create",
                  data: data
            };
            axios(config).then((res) => {
                  dispatch({
                        type: CREATE_SHOPPING_LIST,
                        payload: res.data,
                  });
            });
      };
};

export const actionGetAllShoppingList = (userEmail) => {
      return (dispatch) => {
            var data = qs.stringify({userEmail})
            var config = {
                  method: "POST",
                  url: URL + "shoppingList/GetAll",
                  data: data
            };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_ALL_SHOPPINT_LIST,
                        payload: res.data,
                  });
            });
      };
};

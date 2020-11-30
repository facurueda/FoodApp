import axios from "axios";
import {
      ADD_ELEMENT_PERSONAL_SHOPPING_LIST,
      CREATE_SHOPPING_LIST,
      DELETE_ELEMENT_PERSONAL_SHOPPING_LIST,
      DELETE_SHOPPING_LIST,
      GET_ALL_SHOPPINT_LIST,
      MARKED_INGREDIENT_PERSONAL_SHOPPING_LIST,
} from "./constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let qs = require("qs");
toast.configure();

const URL = "https://arcane-stream-46327.herokuapp.com/";

export const actionSendDataShoppingList = (userEmail, recypeByIngredients) => {
      return (dispatch) => {
            let data = qs.stringify({ userEmail, recypeByIngredients });
            let config = {
                  method: "POST",
                  url: URL + "shoppingList/Create",
                  data: data,
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
            let data = qs.stringify({ userEmail });
            let config = {
                  method: "POST",
                  url: URL + "shoppingList/GetAll",
                  data: data,
            };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_ALL_SHOPPINT_LIST,
                        payload: res.data,
                  });
            });
      };
};

export const actionDeleteShoppingList = (idShoppingList, userEmail) => {
      return (dispatch) => {
            let data = { userEmail, idShoppingList };
            var config = {
                  method: "delete",
                  url: URL + `shoppingList/Delete`,
                  data: data,
            };
            axios(config).then((res) => {
                  dispatch({
                        type: DELETE_SHOPPING_LIST,
                        payload: res.data,
                  });
                  toast.success("Shopping List Deleted", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                  });
            });
      };
};

export const actionAddElementPS = (element) => {
      return {
            type: ADD_ELEMENT_PERSONAL_SHOPPING_LIST,
            payload: element,
      };
};

export const actionDeleteElementPS = (index) => {
      return {
            type: DELETE_ELEMENT_PERSONAL_SHOPPING_LIST,
            payload: index,
      };
};

export const actionMarkElemPersonalShoppingList = (index) => {
      return {
            type: MARKED_INGREDIENT_PERSONAL_SHOPPING_LIST,
            payload: index,
      };
};

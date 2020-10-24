import axios from "axios";
import {
      GET_ALEATORY_RECIPES,
      GET_RECIPES_BY_PRODUCTS,
      GET_SEARCH_PRODUCTS,
} from "./constants";
var qs = require("qs");
axios.defaults.withCrendentails = true;

const APIKEY = "cb4a6fb71de442b593a8cf390d83ef61";

// FUNCTION TO GET ALEATORY RECIPES
export const actionGetAleatoryRecipes = () => {
      return (dispatch) => {
            var config = {
                  method: "get",
                  url: `https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=4`,
                  headers: {
                        Cookie:
                              "__cfduid=d68bdc4452e6af9f5c2f2e24fad7607e41602855582",
                  },
            };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_ALEATORY_RECIPES,
                        payload: res.data.recipes,
                  });
            });
      };
};

export const actionGetRecipesByProduct = (products) => {
      return (dispatch) => {
            var config = {
                  method: "get",
                  url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIKEY}&ingredients=${products}&number=4`,
            };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_RECIPES_BY_PRODUCTS,
                        payload: res.data,
                  });
            });
      };
};

export const actionSearchProduct = (product) => {
      return (dispatch) => {
            var config = {
                  method: "get",
                  url: `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=871cc9ddc1ea4733830dd2c30e3d691a&query=${product}&number=5`,
            };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_SEARCH_PRODUCTS,
                        payload: res.data,
                  });
            });
      };
};

// export const actionDeleteUser = (user) => {
//       return (dispatch) => {
//         var data = qs.stringify(user);
//         var config = {
//           withCredentials: true,
//           method: "DELETE",
//           url: "http://localhost:3000/user/" + user.idUser,
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           data: data,
//         };
//         axios(config).then(() => {
//           dispatch({
//             type: DELETE_USER,
//           });
//           return dispatch(actionGetUsers());
//         });
//       };
//     };
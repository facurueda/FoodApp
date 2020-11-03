import axios from "axios";
import {
      DELETE_BLUR,
      DISPLAY_NONE_BUTTON_BLUR,
      GET_ALEATORY_RECIPES,
      GET_RECIPES_BY_INGREDIENTS,
      GET_SEARCH_PRODUCTS,
      DELETE_INGREDIENTS_AND_RECIPES,
      GET_RECIPE_BY_INGREDIENTS,
      GET_NUTRITIONAL_INFO,
} from "./constants";
var qs = require("qs");

const APIKEY = "871cc9ddc1ea4733830dd2c30e3d691a";

const URL = "http://localhost:5000/";

// FUNCTION TO GET ALEATORY RECIPES
export const actionGetAleatoryRecipes = () => {
      return (dispatch) => {
            var config = {
                  method: "get",
                  url: URL + "recipes/random/home",
            };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_ALEATORY_RECIPES,
                        payload: res.data.recipes,
                  });
            });
      };
};

export const actionGetRecipesByIngredients = (ingredients) => {
      return (dispatch) => {
            var data = qs.stringify({ ingredients });
            var config = {
                  method: "post",
                  url: URL + "recipes/search/byIngredients",
                  data: data,
            };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_RECIPES_BY_INGREDIENTS,
                        payload: res.data,
                  });
            });
      };
};

export const actionGetRecipeToShowByIngredients = (id) => {
      return (dispatch) => {
            var data = qs.stringify({ id });
            var config = {
                  method: "post",
                  url: URL + "recipes/toShow",
                  data: data,
            };
            axios(config).then((res) => {
                  console.log("respuesta", res);
                  dispatch({
                        type: GET_RECIPE_BY_INGREDIENTS,
                        payload: res.data,
                  });
            });
      };
};

export const actionDeleteIngredientsAndRecipes = () => {
      return (dispatch) => {
            console.log("entro en delete");
            dispatch({
                  type: DELETE_INGREDIENTS_AND_RECIPES,
            });
      };
};

export const actionSearchProduct = (product) => {
      return (dispatch) => {
            var config = {
                  method: "get",
                  url: `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${APIKEY}&query=${product}&number=5`,
            };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_SEARCH_PRODUCTS,
                        payload: res.data,
                  });
            });
      };
};

export const actionGetNutritionalInfo = (id) => {
      return (dispatch) => {
            var data = qs.stringify({ id });
            var config = {
                  method: 'post',
                  url: URL + 'recipes/nutritionalInfo',
                  headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  data : data
                };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_NUTRITIONAL_INFO,
                        payload: res.data,
                  });
            });
      };
};

export const actionDeleteBlur = () => {
      return (dispatch) => {
            dispatch({
                  type: DELETE_BLUR,
            });
      };
};

export const actionDisplayNoneButtonBlur = () => {
      return (dispatch) => {
            dispatch({
                  type: DISPLAY_NONE_BUTTON_BLUR,
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

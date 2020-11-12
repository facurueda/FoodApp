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
      GET_FAVOURITES_RECIPES,
      DELETE_FAVOURITE_RECIPE,
      SET_START_SPINNER,
      GET_MORE_RECIPES,
      SET_STOP_SPINNER,
      VIEW_PERSONAL_SHOPPING_LIST,
      VIEW_BUTTON_PERSONAL_SHOPPING_LIST,
} from "./constants";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var qs = require("qs");
toast.configure();
axios.defaults.withCrendentails = true;

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
                  dispatch({
                        type: SET_STOP_SPINNER
                  })
            })

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
            })
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
                  method: "post",
                  url: URL + "recipes/nutritionalInfo",
                  headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                  },
                  data: data,
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

export const actionAddRecipeToFavourites = (
      recipeId,
      imageUrl,
      recipeName,
      mailUser
) => {
      return (dispatch) => {
            var data = qs.stringify({
                  recipeId,
                  imageUrl,
                  recipeName,
                  mailUser,
            });
            console.log("data", data);
            var config = {
                  method: "POST",
                  url: URL + "recipes/addFavourites",
                  headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                  },
                  data: data,
            };
            axios(config).then((res) => {
                  console.log('respADD', res)

                  if(res.data === 'Created'){
                        toast.success(
                              "Recipe Added to Favourites",
                              {
                                    position:
                                          "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                              }
                        );
                  } else if(res.data === 'Duplicated'){
                        toast.error(
                              "You Already Have This Recipe",
                              {
                                    position:
                                          "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                              }
                        );
                  }
            });
      };
};

export const actionGetActionRecipes = (email) => {
      return (dispatch) => {
            var data = qs.stringify({ email });
            var config = {
                  method: "post",
                  url: URL + "recipes/getFavouritesRecipes",
                  headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                  },
                  data: data,
            };
            axios(config).then((res) => {
                  dispatch({
                        type: GET_FAVOURITES_RECIPES,
                        payload: res.data,
                  });
            });
      };
}

export const actionDeleteFavouriteRecipe = (recipeId, email) => {
      return (dispatch) => {
            var data = qs.stringify({ recipeId, email });
            var config = {
                  method: "delete",
                  url: URL + "recipes/deleteFavouriteRecipe",
                  headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                  },
                  data: data,
            };
            axios(config).then((res) => {
                  dispatch({
                        type: DELETE_FAVOURITE_RECIPE,
                        payload: res.data,
                  })
                  toast.success(
                        "Recipe Deleted",
                        {
                              position:
                                    "top-center",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                        }
                  );
            });
      };
}

export const actionStartSpinner = () => {
      return (dispatch) => {
            dispatch({
                  type: SET_START_SPINNER,
            });
      };
}


///////////////////////// LOGOUT

export const actionLogout = () => {
      return (dispatch) => {
            var config = {
                  withCredentials: true,
                  method: "get",
                  url: 'https://henryproject.us.auth0.com/v2/logout',
            };
            axios(config)
      }
}

export const actionViewPersonalShoppingList = () => {
      return (dispatch) => {
            dispatch({
                  type: VIEW_PERSONAL_SHOPPING_LIST
            })
      }
}

export const actionViewButtonPersonalShoppingList = () => {
      return (dispatch) => {
            dispatch({
                  type: VIEW_BUTTON_PERSONAL_SHOPPING_LIST
            })
      }
}




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

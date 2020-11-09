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
} from "./constants";

const initialState = {
      aleatoryRecipesHome: [],
      searchProducts: [],
      productsInFridge: [],
      recipesByIngredients: [],
      recipeToShow : [],
      randomRecipesBlur: "setBlur",
      buttonBlurDisplay: "buttonAleatoryRecipes",
      nutritionalInfo: [],
      favouritesRecipes: [],
};

const recipesReducer = (state = initialState, action) => {
      switch (action.type) {
            case GET_ALEATORY_RECIPES:
                  return {
                        ...state,
                        aleatoryRecipesHome: action.payload,
                  };
            case GET_RECIPES_BY_INGREDIENTS:
                  return {
                        ...state,
                        recipesByIngredients: action.payload,
                  };
            case GET_RECIPE_BY_INGREDIENTS:
                  return {
                        ...state,
                        recipeToShow: action.payload
                  }
            case DELETE_INGREDIENTS_AND_RECIPES:
                  return {
                        ...state,
                        recipesByIngredients: []
                  }
            case GET_SEARCH_PRODUCTS:
                  return {
                        ...state,
                        searchProducts: action.payload,
                  };
            case DELETE_BLUR:
                  return {
                        ...state,
                        randomRecipesBlur: "randomRecipesContainer",
                  };
            case DISPLAY_NONE_BUTTON_BLUR:
                  return {
                        ...state,
                        buttonBlurDisplay: "buttonDisplayNone",
                  };
            case GET_NUTRITIONAL_INFO:
                  return {
                        ...state,
                        nutritionalInfo: action.payload
                  }
            case GET_FAVOURITES_RECIPES:
                  return {
                        ...state,
                        favouritesRecipes: action.payload
                  }
            case DELETE_FAVOURITE_RECIPE:
                  return {
                        ...state,
                        favouritesRecipes: action.payload
                  }
            default:
                  return state;
      }
};

export default recipesReducer;

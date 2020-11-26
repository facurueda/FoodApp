import {
      GET_ALEATORY_RECIPES,
      GET_RECIPES_BY_INGREDIENTS,
      GET_SEARCH_PRODUCTS,
      DELETE_INGREDIENTS_AND_RECIPES,
      GET_RECIPE_BY_INGREDIENTS,
      GET_NUTRITIONAL_INFO,
      GET_FAVOURITES_RECIPES,
      DELETE_FAVOURITE_RECIPE,
      SET_START_SPINNER,
      SET_STOP_SPINNER,
      VIEW_PERSONAL_SHOPPING_LIST,
      VIEW_BUTTON_PERSONAL_SHOPPING_LIST,
      GET_RECIPES_BY_COUNTRIES,
      ACTION_CLEAN_RECIPE,
      ACTION_ADD_INGREDIENT_TO_LIST,
      SEARCH_RECIPE,
} from "./constants";

const initialState = {
      aleatoryRecipesHome: [],
      searchProducts: [],
      productsInFridge: [],
      recipesByIngredients: [],
      recipesBySearch: [],
      listIngredientToSearch: [],
      recipeToShow: [],
      nutritionalInfo: [],
      favouritesRecipes: [],
      recipesByCountries: [],
      spinnerStatus: false,
      viewPersonalShoppingList: "none",
      viewButtonPersonalShoppingList: "flex",

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
                        recipeToShow: action.payload,
                  };
            case DELETE_INGREDIENTS_AND_RECIPES:
                  return {
                        ...state,
                        recipesByIngredients: [],
                        listIngredientToSearch: []
                  };
            case SEARCH_RECIPE:
                  return {
                        ...state,
                        recipesBySearch: action.payload
                  }
            case GET_SEARCH_PRODUCTS:
                  return {
                        ...state,
                        searchProducts: action.payload,
                  };
            case ACTION_ADD_INGREDIENT_TO_LIST:
                  return {
                        ...state,
                        listIngredientToSearch : [...state.listIngredientToSearch, action.payload]
                  }
            case ACTION_CLEAN_RECIPE:
                  return {
                        ...state,
                        recipeToShow: []
                  }
            case GET_NUTRITIONAL_INFO:
                  return {
                        ...state,
                        nutritionalInfo: action.payload,
                  };
            case GET_FAVOURITES_RECIPES:
                  return {
                        ...state,
                        favouritesRecipes: action.payload,
                  };
            case DELETE_FAVOURITE_RECIPE:
                  return {
                        ...state,
                        favouritesRecipes: action.payload,
                  };
            case GET_RECIPES_BY_COUNTRIES:
                  return {
                        ...state,
                        recipesByCountries: action.payload,
                  };
            case SET_START_SPINNER:
                  return {
                        ...state,
                        spinnerStatus: true,
                  };
            case SET_STOP_SPINNER:
                  return {
                        ...state,
                        spinnerStatus: false,
                  };
            case VIEW_PERSONAL_SHOPPING_LIST:
                  return {
                        ...state,
                        viewPersonalShoppingList: "flex",
                  };
            case VIEW_BUTTON_PERSONAL_SHOPPING_LIST:
                  return {
                        ...state,
                        viewButtonPersonalShoppingList: "none",
                  };
            default:
                  return state;
      }
};

export default recipesReducer;

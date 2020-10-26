import {
      DELETE_BLUR,
      DISPLAY_NONE_BUTTON_BLUR,
      GET_ALEATORY_RECIPES, GET_RECIPES_BY_INGREDIENTS, GET_SEARCH_PRODUCTS
} from './constants';

// import initialRecipesTEST from '../Components/randomRecipes/RESPONSE.json'
// import recipesByIngredient from '../Components/randomRecipes/RECIPES.json'
//https://api.spoonacular.com/recipes/findByIngredients?apiKey=cb4a6fb71de442b593a8cf390d83ef61&ingredients=apples

const initialState = {
      aleatoryRecipesHome : [],
      searchProducts : [],
      productsInFridge : [],
      recipesByIngredients : [],
      randomRecipesBlur: 'setBlur',
      buttonBlurDisplay: 'buttonAleatoryRecipes'

}

const recipesReducer = (state = initialState, action) => {
      switch (action.type){
            case GET_ALEATORY_RECIPES:
                  return {
                        ...state,
                        aleatoryRecipesHome: action.payload
                  }
            case GET_RECIPES_BY_INGREDIENTS:
                  return {
                        ...state,
                        recipesByIngredients: action.payload
                  }
            case GET_SEARCH_PRODUCTS:
                  return {
                        ...state,
                        searchProducts: action.payload
                  }
            case DELETE_BLUR:
                  return {
                        ...state,
                        randomRecipesBlur: 'randomRecipesContainer'
                  }
            case DISPLAY_NONE_BUTTON_BLUR:
                  return {
                        ...state,
                        buttonBlurDisplay: 'buttonDisplayNone'
                  }
            default:
                  return state;
      }
}

export default recipesReducer;
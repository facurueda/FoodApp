import {
      GET_ALEATORY_RECIPES, GET_RECIPES_BY_PRODUCTS, GET_SEARCH_PRODUCTS
} from './constants';

// import initialRecipesTEST from '../Components/randomRecipes/RESPONSE.json'
// import recipesByIngredient from '../Components/randomRecipes/RECIPES.json'
//https://api.spoonacular.com/recipes/findByIngredients?apiKey=cb4a6fb71de442b593a8cf390d83ef61&ingredients=apples

const initialState = {
      aleatoryRecipesHome : [],
      searchProducts : [],
      productsInFridge : [],
      recipesByProducts : [],

}

const recipesReducer = (state = initialState, action) => {
      switch (action.type){
            case GET_ALEATORY_RECIPES:
                  return {
                        ...state,
                        aleatoryRecipesHome: action.payload
                  }
            case GET_RECIPES_BY_PRODUCTS:
                  return {
                        ...state,
                        recipesByProducts: action.payload
                  }
            case GET_SEARCH_PRODUCTS:
                  return {
                        ...state,
                        searchProducts: action.payload
                  }
            default:
                  return state;
      }
}

export default recipesReducer;
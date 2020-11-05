import { combineReducers } from "redux";
import recipesReducer from "./recipesReducer";
import shoppingListReducer from './shoppingListReducer'

const rootReducers = combineReducers({
      recipesReducer,
      shoppingListReducer,
});

export default rootReducers;

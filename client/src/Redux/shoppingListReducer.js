import {
      GET_ALL_SHOPPINT_LIST
} from "./constants";

const initialState = {
      allShoppingList: []
};

const shoppingListReducer = (state = initialState, action) => {
      switch (action.type) {
            case GET_ALL_SHOPPINT_LIST:
                  return {
                        ...state,
                        allShoppingList: action.payload,
                  };
                  
            default:
                  return state;
      }
};

export default shoppingListReducer;

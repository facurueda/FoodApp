import {
      GET_ALL_SHOPPINT_LIST,
      ADD_PERSONAL_SHOPPING_LIST,
      MARKED_INGREDIENT_PERSONAL_SHOPPING_LIST,
} from "./constants";

const initialState = {
      allShoppingList: [],
      personalShoppingList: []
};

const shoppingListReducer = (state = initialState, action) => {
      switch (action.type) {
            case GET_ALL_SHOPPINT_LIST:
                  return {
                        ...state,
                        allShoppingList: action.payload,
                  };
            case ADD_PERSONAL_SHOPPING_LIST:
                  return {
                        ...state,
                        personalShoppingList: state.personalShoppingList.concat(
                              action.payload
                        ),
                  };
            case MARKED_INGREDIENT_PERSONAL_SHOPPING_LIST:
                  let aux = [...state.personalShoppingList]
                  aux[action.payload] = {...aux[action.payload], isCompleted:  !aux[action.payload].isCompleted}
                  return {
                        ...state,
                        personalShoppingList: aux
                  }
            default:
                  return state;
      }
};

export default shoppingListReducer;

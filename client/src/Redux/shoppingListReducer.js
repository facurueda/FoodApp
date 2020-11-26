import {
      GET_ALL_SHOPPINT_LIST,
      MARKED_INGREDIENT_PERSONAL_SHOPPING_LIST,
      DELETE_SHOPPING_LIST,
      ADD_ELEMENT_PERSONAL_SHOPPING_LIST,
      DELETE_ELEMENT_PERSONAL_SHOPPING_LIST,
} from "./constants";

const initialState = {
      allShoppingList: [],
      personalShoppingList: [],
};

const shoppingListReducer = (state = initialState, action) => {
      switch (action.type) {
            case GET_ALL_SHOPPINT_LIST:
                  return {
                        ...state,
                        allShoppingList: action.payload,
                  };
            case DELETE_SHOPPING_LIST:
                  return {
                        ...state,
                        allShoppingList: action.payload,
                  };
            case ADD_ELEMENT_PERSONAL_SHOPPING_LIST:
                  return {
                        ...state,
                        personalShoppingList: [
                              ...state.personalShoppingList,
                              action.payload,
                        ],
                  };
            case DELETE_ELEMENT_PERSONAL_SHOPPING_LIST:
                  return {
                        ...state,
                        personalShoppingList: state.personalShoppingList.filter(
                              (e, index) =>
                                    index !=
                                    action.payload
                        ),
                  };
            case MARKED_INGREDIENT_PERSONAL_SHOPPING_LIST:
                  let aux = [...state.personalShoppingList];
                  aux[action.payload] = {
                        ...aux[action.payload],
                        isCompleted: !aux[action.payload].isCompleted,
                  };
                  return {
                        ...state,
                        personalShoppingList: aux,
                  };
            default:
                  return state;
      }
};

export default shoppingListReducer;

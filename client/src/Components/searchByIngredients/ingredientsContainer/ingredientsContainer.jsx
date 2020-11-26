import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ingredientCard/ProductCard";

const IngredientsContainer = () => {
      
      const listIngredient = useSelector(state => state.recipesReducer.listIngredientToSearch)
      
      return (
            <div className="containerIngredients">
                  {listIngredient.map((ingredient) => {
                        return (
                              <ProductCard
                                    productPhoto={ingredient.ingredientPhoto}
                                    productName={ingredient.ingredientName}
                              />
                        );
                  })}
            </div>
      );
};

export default IngredientsContainer;

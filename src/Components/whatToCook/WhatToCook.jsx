import {
      MDBBtn,
      MDBModal,
      MDBModalBody,
      MDBModalHeader,
      MDBModalFooter,
      MDBInput,
} from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import "./WhatToCook.css";
import backgroundModal from "../../Assets/Modals/itemsFridge.jpg";
import ProductCard from "./ProductCard";
import {
      actionGetRecipesByProduct,
      actionSearchProduct,
} from "../../Redux/recipesActions";

const WhatToCook = () => {
      const dispatch = useDispatch();

      ////////////////////////////////////////////////// -- States and Functions Modal Refrigerator -- //////////////////////////////////////////////////

      const [modalRefrigerator, setModalRefrigerator] = useState(false);

      const openModalRefrigerator = () => {
            setModalRefrigerator(true);
      };

      const closeModalRefrigerator = () => {
            setModalRefrigerator(false);
      };

      const [productFridge, setProductFridge] = useState([]);

      ////////////////////////////////////////////////// -- States and Functions Product Search -- //////////////////////////////////////////////////

      const [valueSearch, setValueSearch] = useState("");

      let listProductSearch = useSelector(
            (state) => state.recipesReducer.searchProducts
      );

      const onChangeProductSearch = (e) => {
            setValueSearch(e.target.value);
            dispatch(actionSearchProduct(e.target.value));
      };

      const getProductImage = (ingredient) => {
            console.log('ingredienttt', ingredient)
            setProductFridge([
                  ...productFridge,
                  {
                        productName: valueSearch.toUpperCase(),
                        productPhoto: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient[0].image}`,
                  }
            ]);
      };

      ////////////////////////////////////////////////// -- States and Functions to Search Recipes by Product -- //////////////////////////////////////////////////

      let namesProducts = [];

      productFridge.map((e) => {
            namesProducts.push("+" + e.productName);
      });

      const actionSendProductToFindRecipes = () => {
            dispatch(actionGetRecipesByProduct(namesProducts.toString()));
      };

      ////////////////////////////////////////////////// --  -- //////////////////////////////////////////////////

      let productImageSearch = "";

      let auxiliar = listProductSearch.filter(
            (ingredient) => ingredient.name === valueSearch
      );

      return (
            <div className="whatToCookContainer">
                  <div className="textTitleContainer">What to Cook?</div>
                  <div className="optionsContainer">
                        <a onClick={(e) => openModalRefrigerator()}>
                              <img
                                    src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg"
                                    className="img-fluid z-depth-1 rounded-circle"
                                    alt=""
                              />
                        </a>
                        <MDBModal
                              isOpen={modalRefrigerator}
                              toggle={(e) => closeModalRefrigerator()}
                              centered
                        >
                              <MDBModalHeader
                                    toggle={(e) => closeModalRefrigerator()}
                              >
                                    <label>Add all item in your fridge</label>
                              </MDBModalHeader>
                              <MDBModalBody className="bodyModalContainer">
                                    {productFridge.length > 0 ? (
                                          productFridge.map((product) => {
                                                return (
                                                      <ProductCard
                                                            productPhoto={
                                                                  product.productPhoto
                                                            }
                                                            productName={
                                                                  product.productName
                                                            }
                                                      />
                                                );
                                          })
                                    ) : (
                                          <div></div>
                                    )}
                              </MDBModalBody>

                              <MDBModalFooter>
                                    <form
                                          onSubmit={(e) => {
                                                e.preventDefault();
                                                getProductImage(
                                                      listProductSearch.filter(
                                                            (ingredient) =>
                                                                  ingredient.name ===
                                                                  valueSearch.toLowerCase()
                                                      )
                                                );
                                                setValueSearch('')
                                          }}
                                    >
                                          <input
                                                list="searchProduct"
                                                type="search"
                                                placeholder="Search Product"
                                                value={valueSearch}
                                                onChange={onChangeProductSearch}
                                          />
                                          <datalist id="searchProduct">
                                                {
                                                      valueSearch.length > 1 ? (
                                                            listProductSearch.map(
                                                                  (prod) => {
                                                                        return (
                                                                              <option
                                                                                    value={
                                                                                          prod.name
                                                                                    }
                                                                              />
                                                                        );
                                                                  }
                                                            )      
                                                      ) : (
                                                            null
                                                      )
                                                      
                                                }
                                          </datalist>
                                    </form>
                                    <MDBBtn
                                          color="success"
                                          onClick={(e) => {
                                                actionSendProductToFindRecipes();
                                                closeModalRefrigerator();
                                          }}
                                    >
                                          Search Recipes
                                    </MDBBtn>
                              </MDBModalFooter>
                        </MDBModal>
                  </div>
            </div>
      );
};

export default WhatToCook;

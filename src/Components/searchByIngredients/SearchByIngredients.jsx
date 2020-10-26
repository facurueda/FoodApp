// import SearchRecipesByIngredients from '../../Assets/Home/SearchRecipesByIngredient.png'
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import "./SearchByIngredients.css";
import ProductCard from "./ProductCard";
import {
      actionGetRecipesByIngredients,
      actionSearchProduct,
} from "../../Redux/recipesActions";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";

const SearchByIngredients = () => {
      const dispatch = useDispatch();

      ////////////////////////////////////////////////// -- States and Functions Ingredients  -- //////////////////////////////////////////////////

      const [listIngredients, setListIngredients] = useState([]);

      const [valueSearch, setValueSearch] = useState("");

      const listProductSearch = useSelector(
            (state) => state.recipesReducer.searchProducts
      );

      const onChangeProductSearch = (e) => {
            setValueSearch(e.target.value);
            dispatch(actionSearchProduct(e.target.value));
      };

      const getProductImage = (ingredient) => {
            setListIngredients([
                  ...listIngredients,
                  {
                        ingredientName: valueSearch.toUpperCase(),
                        ingredientPhoto: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient[0].image}`,
                  },
            ]);
      };

      ////////////////////////////////////////////////// -- States and Functions Recipes By Ingredients  -- //////////////////////////////////////////////////

      let namesIngredients = [];

      listIngredients.map((e) => {
            namesIngredients.push("+" + e.ingredientName);
      });

      const actionSendProductToFindRecipes = () => {
            dispatch(actionGetRecipesByIngredients(namesIngredients.toString()));
      };

      const recipesByIngredients = useSelector(state => state.recipesReducer.recipesByIngredients)


      return (
            <div className="whatToCookContainer">
                  <div className="containerInputSearch">
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
                                    setValueSearch("");
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
                                    {valueSearch.length > 1
                                          ? listProductSearch.map((prod) => {
                                                  return (
                                                        <option
                                                              value={prod.name}
                                                        />
                                                  );
                                            })
                                          : null}
                              </datalist>
                        </form>
                        <button onClick={e => actionSendProductToFindRecipes()}>SEARCH</button>
                  </div>
                  <div className="containerIngredients">
                        {listIngredients.map((ingredient) => {
                              return (
                                    <ProductCard
                                          productPhoto={ingredient.ingredientPhoto}
                                          productName={ingredient.ingredientName}
                                    />
                              );
                        })}
                  </div>
                  <div className="containerRecipesByIngredients">
                        {recipesByIngredients.map(recipe => {
                              return (
                                    <MDBCol>
                                    <MDBCard className="cardContainer">
                                          <Link
                                                to={{
                                                      pathname: "/Recipe",
                                                      state: {
                                                            recipe: recipe,
                                                      },
                                                }}
                                          >
                                                <MDBCardImage
                                                      className="cardProductImage"
                                                      src={recipe.image}
                                                      waves
                                                />
                                          </Link>
                                          <MDBCardBody className="cardBodyRecipes">
                                                <MDBCardTitle className="cardTitleContainer">
                                                      {recipe.title}
                                                </MDBCardTitle>
                                          </MDBCardBody>
                                    </MDBCard>
                              </MDBCol>
                              )
                        })}
                  </div>
            </div>
      );
};

//       ////////////////////////////////////////////////// -- States and Functions Modal Refrigerator -- //////////////////////////////////////////////////

//       const [modalRefrigerator, setModalRefrigerator] = useState(false);

//       const openModalRefrigerator = () => {
//             setModalRefrigerator(true);
//       };

//       const closeModalRefrigerator = () => {
//             setModalRefrigerator(false);
//       };

//       const [productFridge, setProductFridge] = useState([]);

//       ////////////////////////////////////////////////// -- States and Functions Product Search -- //////////////////////////////////////////////////

//       const [valueSearch, setValueSearch] = useState("");

//       let listProductSearch = useSelector(
//             (state) => state.recipesReducer.searchProducts
//       );

//       const onChangeProductSearch = (e) => {
//             setValueSearch(e.target.value);
//             dispatch(actionSearchProduct(e.target.value));
//       };

//       const getProductImage = (ingredient) => {
//             console.log('ingredienttt', ingredient)
//             setProductFridge([
//                   ...productFridge,
//                   {
//                         productName: valueSearch.toUpperCase(),
//                         productPhoto: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient[0].image}`,
//                   }
//             ]);
//       };

//       ////////////////////////////////////////////////// -- States and Functions to Search Recipes by Product -- //////////////////////////////////////////////////

//       let namesProducts = [];

//       productFridge.map((e) => {
//             namesProducts.push("+" + e.productName);
//       });

//       const actionSendProductToFindRecipes = () => {
//             dispatch(actionGetRecipesByProduct(namesProducts.toString()));
//       };

//       ////////////////////////////////////////////////// --  -- //////////////////////////////////////////////////

//       let productImageSearch = "";

//       let auxiliar = listProductSearch.filter(
//             (ingredient) => ingredient.name === valueSearch
//       );

//       return (
//             <div className="whatToCookContainer">
//                   {/* <div className="textTitleContainer">What to Cook?</div> */}
//                   <div className="optionsContainer">
//                         {/* <a onClick={(e) => openModalRefrigerator()}>
//                               <img
//                                     src={SearchRecipesByIngredients}
//                                     className="modalOpenSearchRecipesByIngredients"
//                                     alt=""
//                               />
//                         </a> */}
//                         <MDBModal
//                               isOpen={modalRefrigerator}
//                               toggle={(e) => closeModalRefrigerator()}
//                               centered
//                         >
//                               <MDBModalHeader
//                                     toggle={(e) => closeModalRefrigerator()}
//                               >
//                                     <label>Add all item in your fridge</label>
//                               </MDBModalHeader>
//                               <MDBModalBody className="bodyModalContainer">
//                                     {productFridge.length > 0 ? (
//                                           productFridge.map((product) => {
//                                                 return (
//                                                       <ProductCard
//                                                             productPhoto={
//                                                                   product.productPhoto
//                                                             }
//                                                             productName={
//                                                                   product.productName
//                                                             }
//                                                       />
//                                                 );
//                                           })
//                                     ) : (
//                                           <div></div>
//                                     )}
//                               </MDBModalBody>

//                               <MDBModalFooter>
//                                     <form
//                                           onSubmit={(e) => {
//                                                 e.preventDefault();
//                                                 getProductImage(
//                                                       listProductSearch.filter(
//                                                             (ingredient) =>
//                                                                   ingredient.name ===
//                                                                   valueSearch.toLowerCase()
//                                                       )
//                                                 );
//                                                 setValueSearch('')
//                                           }}
//                                     >
//                                           <input
//                                                 list="searchProduct"
//                                                 type="search"
//                                                 placeholder="Search Product"
//                                                 value={valueSearch}
//                                                 onChange={onChangeProductSearch}
//                                           />
//                                           <datalist id="searchProduct">
//                                                 {
//                                                       valueSearch.length > 1 ? (
//                                                             listProductSearch.map(
//                                                                   (prod) => {
//                                                                         return (
//                                                                               <option
//                                                                                     value={
//                                                                                           prod.name
//                                                                                     }
//                                                                               />
//                                                                         );
//                                                                   }
//                                                             )
//                                                       ) : (
//                                                             null
//                                                       )

//                                                 }
//                                           </datalist>
//                                     </form>
//                                     <MDBBtn
//                                           color="success"
//                                           onClick={(e) => {
//                                                 actionSendProductToFindRecipes();
//                                                 closeModalRefrigerator();
//                                           }}
//                                     >
//                                           Search Recipes
//                                     </MDBBtn>
//                               </MDBModalFooter>
//                         </MDBModal>
//                   </div>
//             </div>
//       );
// };

export default SearchByIngredients;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
      MDBBtn,
      MDBCard,
      MDBCardBody,
      MDBCardImage,
      MDBCardTitle,
      MDBCol,
} from "mdbreact";
import {
      actionDeleteBlur,
      actionDisplayNoneButtonBlur,
      actionGetAleatoryRecipes,
      actionGetRecipeToShowByIngredients,
} from "../../Redux/recipesActions";
import "./RandomRecipes.css";
import { Link } from "react-router-dom";

const RandomRecipes = () => {
      // const history = useHistory();
      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(actionGetAleatoryRecipes());
      }, []);

      let getAleatoryRecipes = useSelector(
            (state) => state.recipesReducer.aleatoryRecipesHome
      );

      const imagesWithBlur = useSelector(
            (state) => state.recipesReducer.randomRecipesBlur
      );

      const buttonBlur = useSelector(
            (state) => state.recipesReducer.buttonBlurDisplay
      );

      return (
            <div style={{ position: "relative" }}>
                  <button
                        className={buttonBlur}
                        onClick={(e) => {
                              dispatch(actionDeleteBlur());
                              dispatch(actionDisplayNoneButtonBlur());
                        }}
                  >
                        CLEAN
                  </button>
                  <div className={imagesWithBlur}>
                        {getAleatoryRecipes.map((recipe) => {
                              return (
                                    <MDBCol>
                                          <MDBCard className="cardContainer">
                                                <Link
                                                      to={{
                                                            pathname:
                                                                  "/Spinner",
                                                            state: {
                                                                  recipe: recipe,
                                                            },
                                                      }}
                                                      onClick={(e) => {
                                                            dispatch(
                                                                  actionGetRecipeToShowByIngredients(
                                                                        recipe.id
                                                                  )
                                                            );
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
                              );
                        })}
                  </div>
            </div>
      );
};

export default RandomRecipes;

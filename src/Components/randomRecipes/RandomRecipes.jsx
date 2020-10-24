import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
      MDBBtn,
      MDBCard,
      MDBCardBody,
      MDBCardImage,
      MDBCardTitle,
      MDBCardText,
      MDBCol,
} from "mdbreact";
import { actionGetAleatoryRecipes } from "../../Redux/recipesActions";
import "./RandomRecipes.css";
import { Link, useHistory } from "react-router-dom";

const RandomRecipes = () => {
      const history = useHistory();
      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(actionGetAleatoryRecipes());
      }, []);

      let getAleatoryRecipes;

      let getAleatoryRecipes1 = useSelector(
            (state) => state.recipesReducer.recipesByProducts
      );

      let getAleatoryRecipes2 = useSelector(
            (state) => state.recipesReducer.aleatoryRecipesHome
      );

      if (getAleatoryRecipes1.length > 0) {
            getAleatoryRecipes = getAleatoryRecipes1;
      } else {
            getAleatoryRecipes = getAleatoryRecipes2;
      }

      const [imagesWithBlur, setImagesWithBlur] = useState("setBlur");

      const [buttonBlur, setButtonBlur] = useState("buttonAleatoryRecipes");

      return (
            <div style={{ position: "relative" }}>
                  <button
                        className={buttonBlur}
                        onClick={(e) => {
                              setImagesWithBlur("randomRecipesContainer");
                              setButtonBlur("buttonDisplayNone");
                        }}
                  >
                        CLEAN
                  </button>
                  <div className={imagesWithBlur}>
                        {getAleatoryRecipes.map((recipe) => {
                              return (
                                    <MDBCol>
                                          <MDBCard className="cardContainer">
                                                <Link to={{
                                                      pathname: '/Recipe',
                                                      state: { recipe : recipe }

                                                }}>
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

import React from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import CaloriesIcon from "../../../Assets/Nutrition/calories.svg";
import CarbsIcon from "../../../Assets/Nutrition/carbs.svg";
import FatIcon from "../../../Assets/Nutrition/fat.svg";
import ProteinIcon from "../../../Assets/Nutrition/protein.svg";
import { useSelector } from 'react-redux';

const ModalInfoNutritional = (props) => {

      const {modalState, closeModal} = props;

      const information = useSelector(
            (state) => state.recipesReducer.nutritionalInfo
      );

      return (
            <MDBModal isOpen={modalState} toggle={closeModal} centered>
                        <MDBModalHeader toggle={closeModal}>
                              Nutrition Info
                        </MDBModalHeader>
                        <MDBModalBody>
                              <div className="nutritionalInfoContainer">
                                    <div className="nutritionInfoContainerLeft">
                                          <div className="caloriesContainer">
                                                <div className="imageAndTextContainer">
                                                      <img
                                                            src={CaloriesIcon}
                                                            alt="iconCalories"
                                                            className="nutritionIcon"
                                                      />
                                                      <label>Calories</label>
                                                </div>
                                                <label className="propsText">
                                                      {information.calories}
                                                </label>
                                          </div>
                                          <div className="carbsContainer">
                                                <div className="imageAndTextContainer">
                                                      <img
                                                            src={CarbsIcon}
                                                            alt="iconCarbs"
                                                            className="nutritionIcon"
                                                      />
                                                      <label>Carbs</label>
                                                </div>
                                                <label className="propsText">
                                                      {information.carbs}
                                                </label>
                                          </div>
                                    </div>
                                    <div className="nutritionInfoContainerRight">
                                          <div className="fatContainer">
                                                <div className="imageAndTextContainer">
                                                      <img
                                                            src={FatIcon}
                                                            alt="iconFat"
                                                            className="nutritionIcon"
                                                      />
                                                      <label>Fat</label>
                                                </div>
                                                <label className="propsText">
                                                      {information.fat}
                                                </label>
                                          </div>
                                          <div className="proteinContainer">
                                                <div className="imageAndTextContainer">
                                                      <img
                                                            src={ProteinIcon}
                                                            alt="iconProtein"
                                                            className="nutritionIcon"
                                                      />
                                                      <label>Protein</label>
                                                </div>
                                                <label className="propsText">
                                                      {information.protein}
                                                </label>
                                          </div>
                                    </div>
                              </div>
                        </MDBModalBody>
                  </MDBModal>
      )
}

export default ModalInfoNutritional;
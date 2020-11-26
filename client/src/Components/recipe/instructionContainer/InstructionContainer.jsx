import React from "react";

const InstructionContainer = (props) => {
      const { recipeByIngredient } = props;

      return (
            <div className="recipeInstructions">
                  <h2 className="titleIngredients">Instructions</h2>
                  <div className="instructionsContainer">
                        {recipeByIngredient.analyzedInstructions.length > 0 ? (
                              <div className="fullRecipePreparation">
                                    <ol className="olRecipe">
                                          {recipeByIngredient.analyzedInstructions[0].steps.map(
                                                (s) => {
                                                      return (
                                                            <li className="liRecipe">
                                                                  {s.step}
                                                            </li>
                                                      );
                                                }
                                          )}
                                    </ol>
                              </div>
                        ) : (
                              <div>
                                    No have Instruction, please visit this
                                    <a src={recipeByIngredient.sourceUrl}>
                                          Link
                                    </a>
                              </div>
                              // <div
                              //       className="fullRecipePreparation"
                              //       dangerouslySetInnerHTML={test()}
                              // />
                        )}
                  </div>
            </div>
      );
};

export default InstructionContainer;

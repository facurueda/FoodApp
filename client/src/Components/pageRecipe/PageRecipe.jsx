import React from 'react';
import SearchRecipesByIngredients from "../../Assets/Home/SearchRecipesByIngredients.png";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import American from '../../Assets/RecipesByCountry/American.jpg'
import Chinese from '../../Assets/RecipesByCountry/Chinese.jpg'
import European from '../../Assets/RecipesByCountry/European.jpg'
import Indian from '../../Assets/RecipesByCountry/Indian.jpg'
import Italian from '../../Assets/RecipesByCountry/Italian.jpg'
import Japanese from '../../Assets/RecipesByCountry/Japanese.jpg'
import LatinAmerican from '../../Assets/RecipesByCountry/LatinAmerican.jpg'
import Mexican from '../../Assets/RecipesByCountry/Mexican.jpg'
import './PageRecipe.css'
import { actionGetRecipesByCountries, actionStartSpinner } from '../../Redux/recipesActions';
const countries = [[American, 'American'], [Chinese, 'Chinese'], [European, 'European'], [Indian, 'Indian'], [Italian, 'Italian'], [Japanese, 'Japanese'], [LatinAmerican, 'Latin American'], [Mexican, 'Mexican']];

const PageRecipe = () => {

      const dispatch =  useDispatch()
      const history = useHistory();

      return (
            <div className='pageRecipeContainer'>
                  <div className="searchRecipes">
                        <Link
                              to={{
                                    pathname: "/SearchRecipeByIngredients",
                              }}

                        >
                              <img
                                    alt="ImageSearch"
                                    src={SearchRecipesByIngredients}
                                    className="modalOpenSearchRecipesByIngredients"
                              />
                        </Link>
                  </div>
                  <div className="cuisinesByCounteryContainer">
                              {console.log(countries),
                              countries.map(country => {
                                    console.log(country)
                                    return (
                                          <div className="countryRecipeContainer"
                                                onClick={e => {
                                                      dispatch(actionGetRecipesByCountries(country[1]))
                                                      dispatch(
                                                            actionStartSpinner()
                                                      );
                                                      history.push({pathname: '/recipesByCountries', state: country[1]}
                                                            
                                                            )
                                                }
                                          }
                                          >
                                                <img src={country[0]} alt="Image" className="countryImage"/>
                                                <div className='countryName'>{country[1]}</div>
                                          </div>
                                    )
                              })}
                  </div>
            </div>
      )
}

export default PageRecipe;
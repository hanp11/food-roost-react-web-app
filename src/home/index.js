import React, {useEffect, useState} from "react";
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faDrumstickBite} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {findAllRecipeOfTheDayThunk} from "../services/recipe-of-the-day-thunk";
import {findRecipeWithIdThunk} from "../services/edamam/edamam-thunks";
import {Link} from "react-router-dom";
import {findRecipesLikedByUserThunk} from "../services/likes-thunks";
import {
  findAllExpertAdviceThunk,
} from "../services/expert-advice-thunk";
import {findFollowingThunk} from "../services/follows-thunks";

const HomeComponent = () => {

  const {currentUser} = useSelector((state) => state.users);
  const {currentRecipe, recipesLoading} = useSelector(state => state.recipesData);
  const {recipeOfTheDay} = useSelector((state) => state.recipeOfTheDay);
  const {likesRecipes} = useSelector((state) => state.likes);
  const {expertAdvice} = useSelector((state) => state.expertAdvice);
  const {following} = useSelector((state) => state.follows);

  const [followedUsernames, setFollowedUsernames] = useState([]);
  const [filteredExpertAdvice, setFilteredExpertAdvice] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(findFollowingThunk(currentUser._id));
    }
  }, []);

  useEffect(() => {
    dispatch(findAllRecipeOfTheDayThunk())
    dispatch(findAllExpertAdviceThunk())
    if (currentUser) {
      dispatch(findRecipesLikedByUserThunk(currentUser._id));
      setFollowedUsernames(following.map(f => f.followed.username));
    }
  }, [dispatch, following]);

  useEffect(() => {
    if (currentUser) {
      setFilteredExpertAdvice(expertAdvice.filter(advice => followedUsernames.includes(advice.user.username)));
    }
    else {
      setFilteredExpertAdvice(expertAdvice)
    }
  }, [dispatch, expertAdvice]);

  useEffect(() => {
    if (recipeOfTheDay && recipeOfTheDay.recipe) {
      dispatch(findRecipeWithIdThunk(recipeOfTheDay.recipe.edamamId))
    }
  }, [recipeOfTheDay]);

  return (
      <>
        <ul className="list-group">
          <li className="list-group-item">
            <h1 className="wd-food-roost text-center">
              Food Roost
              <FontAwesomeIcon className="ps-1" icon={faDrumstickBite} />
            </h1>
          </li>
          <li className="list-group-item">
            <h2 className="wd-page-title">Home</h2>
            <span>Discover recipes to help you make healthy eating choices.</span>
          </li>
          {recipeOfTheDay && (
            <li className="list-group-item">
              <h3 className="wd-sub-heading-title">Recipe of the Day</h3>
              <ul className="list-group">
                {
                    recipesLoading &&
                    <li className="list-group-item">
                      Loading...
                    </li>
                }
                {
                    currentRecipe && (
                        <>
                          <div className="row">
                            <div className="col-auto">
                              <img alt="recipe" className="rounded" height={70} src={currentRecipe['recipe'].image}/>
                            </div>
                            <div className="col">
                              <div className="fw-bold">{currentRecipe['recipe']['label']}</div>
                              <div className="row">
                                <div className="col-auto">
                                  <div className="small">
                                    <span className="fw-bold">Servings: </span>
                                    {currentRecipe['recipe']['yield']}
                                  </div>
                                  <div className="small">
                                    {Math.round(currentRecipe['recipe']['calories'] / currentRecipe['recipe']['yield'])} kcal
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="small">
                                    <FontAwesomeIcon icon={faCircle} className="pe-1 text-success"/>
                                    <span className="fw-bold">Protein: </span>
                                    {Math.round(currentRecipe['recipe']['totalNutrients']['PROCNT']['quantity'])}
                                    {currentRecipe['recipe']['totalNutrients']['PROCNT']['unit']}
                                  </div>
                                  <div className="small">
                                    <FontAwesomeIcon icon={faCircle} className="pe-1 text-warning"/>
                                    <span className="fw-bold">Fat: </span>
                                    {Math.round(currentRecipe['recipe']['totalNutrients']['FAT']['quantity'])}
                                    {currentRecipe['recipe']['totalNutrients']['FAT']['unit']}
                                  </div>
                                  <div className="small">
                                    <FontAwesomeIcon icon={faCircle} className="pe-1 text-danger"/>
                                    <span className="fw-bold">Carb: </span>
                                    {Math.round(currentRecipe['recipe']['totalNutrients']['CHOCDF']['quantity'])}
                                    {currentRecipe['recipe']['totalNutrients']['CHOCDF']['unit']}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                    )
                }
              </ul>
          </li>)}
          {likesRecipes && likesRecipes.length > 0 && (
            <li className="list-group-item">
              <h3 className="wd-sub-heading-title">Your Recipes:</h3>
              <ul>
                <li>
                  {
                      likesRecipes && likesRecipes.map(like =>
                          <Link key={like._id} to={`/details/${like.recipe.edamamId}`}>
                            {like.recipe.label}
                          </Link>
                      )
                  }
                </li>
              </ul>
            </li>
          )}
          {filteredExpertAdvice && filteredExpertAdvice.length > 0 && (
            <li className="list-group-item">
              <h3 className="wd-sub-heading-title">Expert Advice</h3>
              {filteredExpertAdvice.map(advice =>
                  <>
                    <div>
                      <Link to={`/profile/${advice.user._id}`} className="fw-bold pe-1 text-decoration-none">{advice.user.fullName} ({advice.user.username})
                      </Link>
                      &middot;
                      <span className="ps-1 fw-normal text-secondary">{new Date(advice.date).toLocaleDateString("en-US", {
                        timeZone: 'UTC',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                      <div className="mt-2 mb-2">{advice.content}</div>
                      Recipe: <Link to={`/details/${advice.recipe.edamamId}`}>{advice.recipe.label}</Link>
                    </div>
                    <hr/>
                  </>
              )}
            </li>
          )}
        </ul>
      </>
  );
};

export default HomeComponent;
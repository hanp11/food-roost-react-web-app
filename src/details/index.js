import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {
  findRecipeWithIdThunk
} from "../services/edamam/edamam-thunks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faThumbsDown,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import {
  createRecipesThunk, findRecipeByEdamamIdThunk,
} from "../services/recipes-thunk";
import {useNavigate} from "react-router-dom";
import {
  findUsersThatLikeRecipeThunk,
  userLikesRecipeThunk,
  userUnlikesRecipeThunk
} from "../services/likes-thunks";
import DetailsLikes from "./details-likes";

const Details = () => {

  const {currentUser} = useSelector((state) => state.users);
  const {currentRecipe, recipesLoading} = useSelector(state => state.recipesData);
  const {recipes} = useSelector(state => state.myRecipes);
  const {likesUsers} = useSelector(state => state.likes);

  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const paths = pathname.split('/')
  const uniqueIdentifier = paths[2];

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(findRecipeWithIdThunk(uniqueIdentifier));
    dispatch(findRecipeByEdamamIdThunk(uniqueIdentifier));
  }, [dispatch, uniqueIdentifier]);

  useEffect(() => {
    if (recipes && recipes._id) {
      dispatch(findUsersThatLikeRecipeThunk(recipes._id))
    }
    if (currentRecipe && !recipes) {
      dispatch(createRecipesThunk({
        label: currentRecipe['recipe']?.label,
        yield: currentRecipe['recipe']['yield'],
        calories: Math.round(currentRecipe['recipe']['calories'] / currentRecipe['recipe']['yield']),
        ingredients: currentRecipe['recipe']['ingredientLines'],
        directionsUrl: currentRecipe['recipe']['url'],
        edamamId: uniqueIdentifier
      }))
    }
  }, [dispatch, currentRecipe, recipes])

  const handleLike = () => {
    if (!currentUser) {
      navigate('/login');
    }
    else if (recipes) {
      dispatch(userLikesRecipeThunk(recipes._id));
      window.location.reload();
    }
  }

  const handleDislike = () => {
    if (!currentUser) {
      navigate('/login');
    }
    else if (recipes) {
      dispatch(userUnlikesRecipeThunk(recipes._id));
      window.location.reload();
    }
  }

  return (
      <ul className="list-group">
        {
            recipesLoading &&
            <li className="list-group-item">
              Loading...
            </li>
        }
        {
            currentRecipe &&
            <>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-auto">
                    <img alt="recipe" className="rounded" height={100} src={currentRecipe['recipe'].image}/>
                  </div>
                  <div className="col">
                    <h1 className="wd-page-title">{currentRecipe['recipe']?.label}</h1>
                    {currentUser && likesUsers && likesUsers.filter(l => l.user?._id === currentUser?._id)?.length > 0
                      ? <button className="btn btn-danger" onClick={handleDislike}>
                          <FontAwesomeIcon icon={faThumbsDown}/></button>
                      : <button className="btn btn-success me-1" onClick={handleLike}><FontAwesomeIcon icon={faThumbsUp}/></button>
                    }
                    {recipes && recipes._id && <div><DetailsLikes rid={recipes._id}/><span className="text-secondary">Likes</span></div>}
                    <div className="small">{currentRecipe['recipe']['healthLabels'].join(' • ')}</div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-4">
                    <div className="small">
                      <span className="fw-bold">Servings: </span>
                      {currentRecipe['recipe']['yield']}
                    </div>
                    <div className="fw-bold">
                      {Math.round(currentRecipe['recipe']['calories'] / currentRecipe['recipe']['yield'])} kcal
                    </div>
                  </div>
                  <div className="col-4">
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
                  <div className="col-4">
                    <div className="small">
                      <span className="fw-bold">Cholesterol: </span>
                      {Math.round(currentRecipe['recipe']['totalNutrients']['CHOLE']['quantity'])}
                      {currentRecipe['recipe']['totalNutrients']['CHOLE']['unit']}
                    </div>
                    <div className="small">
                      <span className="fw-bold">Sodium: </span>
                      {Math.round(currentRecipe['recipe']['totalNutrients']['NA']['quantity'])}
                      {currentRecipe['recipe']['totalNutrients']['NA']['unit']}
                    </div>
                    <div className="small">
                      <span className="fw-bold">Calcium: </span>
                      {Math.round(currentRecipe['recipe']['totalNutrients']['CA']['quantity'])}
                      {currentRecipe['recipe']['totalNutrients']['CA']['unit']}
                    </div>
                    <div className="small">
                      <span className="fw-bold">Magnesium: </span>
                      {Math.round(currentRecipe['recipe']['totalNutrients']['MG']['quantity'])}
                      {currentRecipe['recipe']['totalNutrients']['MG']['unit']}
                    </div>
                    <div className="small">
                      <span className="fw-bold">Potassium: </span>
                      {Math.round(currentRecipe['recipe']['totalNutrients']['K']['quantity'])}
                      {currentRecipe['recipe']['totalNutrients']['K']['unit']}
                    </div>
                    <div className="small">
                      <span className="fw-bold">Iron: </span>
                      {Math.round(currentRecipe['recipe']['totalNutrients']['FE']['quantity'])}
                      {currentRecipe['recipe']['totalNutrients']['FE']['unit']}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h2 className="wd-sub-heading-title">Ingredients</h2>
                  <ul>
                    {currentRecipe['recipe']['ingredientLines']?.map(i => <li>{i}</li>)}
                  </ul>
                </div>
                <div>
                  <h2 className="wd-sub-heading-title">Directions</h2>
                  <a href={currentRecipe['recipe']['url']}>{currentRecipe['recipe']['url']}</a>
                </div>
              </li>
            </>
        }
      </ul>
  );
};

export default Details;
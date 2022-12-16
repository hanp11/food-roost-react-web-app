import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {
  findRecipeWithIdThunk
} from "../services/edamam/edamam-thunks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {
  createRecipesThunk,
  findAllRecipesThunk
} from "../services/recipes-thunk";

const Details = () => {
  const {currentRecipe, recipesLoading} = useSelector(state => state.recipesData);
  const {recipes} = useSelector(state => state.myRecipes);

  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const paths = pathname.split('/')
  const uniqueIdentifier = paths[2];

  useEffect(() => {
    dispatch(findRecipeWithIdThunk(uniqueIdentifier));
  }, [dispatch, uniqueIdentifier]);

  //TODO: add rating
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
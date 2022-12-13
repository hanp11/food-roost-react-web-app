import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {findRecipesThunk} from "../services/edamam/edamam-thunks";
import React, {useEffect, useState} from "react";
import './index.css';
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";

const SearchComponent = () => {
  const {recipes, recipesLoading} = useSelector(state => state.recipesData);
  let [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const paths = pathname.split('/')
  const searchCriteria = paths[2];

  useEffect(() => {
    if (searchCriteria) {
      dispatch(findRecipesThunk(decodeURI(searchCriteria)));
      setSearchText(decodeURI(searchCriteria));
    } else {
      setSearchText("");
    }
  }, [dispatch, searchCriteria]);

  const recipeSearchHandler = () => {
    navigate(searchText);
  }

  return (
      <ul className="list-group">
        <li className="list-group-item">
          <h1 className="wd-page-title">Find a Recipe</h1>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-10">
              <div className="position-relative">
                <input placeholder="Search Recipes"
                       value={searchText}
                       className="form-control rounded-pill ps-5"
                       onChange={(e) => setSearchText(e.target.value)}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} transform="up-30 right-15"/>
              </div>
            </div>
            <div className="col-2">
              <button className="btn btn-primary rounded-pill"
                      onClick={recipeSearchHandler}>Search</button>
            </div>
          </div>
          <ul className="list-group">
            {
                recipesLoading &&
                <li className="list-group-item">
                  Loading...
                </li>
            }
            {
              recipes['hits']?.map(h => h['recipe'])?.map((r, idx) =>
                <button key={r.uri.match(`(?<=recipe_).*`) && idx}
                        className="list-group-item list-group-item-action"
                  onClick={() => navigate(`/details/${r.uri.match(`(?<=recipe_).*`)}`)}>
                  <div className="row">
                    <div className="col-auto">
                      <img alt="recipe" className="rounded" height={70} src={r.image}/>
                    </div>
                    <div className="col">
                      <div className="fw-bold">{r['label']}</div>
                      <div className="row">
                        <div className="col-auto">
                          <div className="small">
                            <span className="fw-bold">Servings: </span>
                            {r['yield']}
                          </div>
                          <div className="small">
                            {Math.round(r['calories'] / r['yield'])} kcal
                          </div>
                        </div>
                        <div className="col">
                          <div className="small">
                            <FontAwesomeIcon icon={faCircle} className="pe-1 text-success"/>
                            <span className="fw-bold">Protein: </span>
                            {Math.round(r['totalNutrients']['PROCNT']['quantity'])}
                            {r['totalNutrients']['PROCNT']['unit']}
                          </div>
                          <div className="small">
                            <FontAwesomeIcon icon={faCircle} className="pe-1 text-warning"/>
                            <span className="fw-bold">Fat: </span>
                            {Math.round(r['totalNutrients']['FAT']['quantity'])}
                            {r['totalNutrients']['FAT']['unit']}
                          </div>
                          <div className="small">
                            <FontAwesomeIcon icon={faCircle} className="pe-1 text-danger"/>
                            <span className="fw-bold">Carb: </span>
                            {Math.round(r['totalNutrients']['CHOCDF']['quantity'])}
                            {r['totalNutrients']['CHOCDF']['unit']}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>)
            }
          </ul>
        </li>
      </ul>
  );
};

export default SearchComponent;
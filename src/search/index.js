import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {findRecipesThunk} from "../services/edamam/edamam-thunks";
import {useState} from "react";

const SearchComponent = () => {
  const {recipes, recipesLoading} = useSelector(state => state.recipesData);
  let [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const recipeSearchHandler = () => {
    dispatch(findRecipesThunk(searchText));
  }

  return (
      <>
        Search
        <div className="row">
          <div className="col-10">
            <div className="position-relative">
              <input placeholder="Search Recipes"
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
              <li key={idx} className="list-group-item">
                {r['label']}
              </li>)
          }
        </ul>
      </>
  );
};

export default SearchComponent;
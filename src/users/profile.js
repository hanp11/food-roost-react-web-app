import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import Following from "../follows/following";
import Followers from "../follows/followers";
import React, {useEffect} from "react";
import {findRecipesLikedByUserThunk} from "../services/likes-thunks";

const Profile = () => {
  const {currentUser} = useSelector((state) => state.users);
  const {likesRecipes} = useSelector((state) => state.likes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(findRecipesLikedByUserThunk(currentUser._id));
    }
  }, []);

  return (
    <>
      {
        currentUser && (
          <div className="border rounded">
            <div>
              <img className="rounded-circle"
                   src={'/images/default_avatar.jpg'} width={130}/>
              <Link to="/edit-profile" className="btn btn-primary float-end rounded-pill mt-2 me-2">Edit profile</Link>
            </div>
            <div className="ms-3 me-3 mb-2">
              <div className="fw-bolder">{currentUser.fullName}</div>
              <div className="text-secondary">{`${currentUser.username} (${currentUser.role})`}</div>
              <div className="pt-2 overflow-auto">{`Email: ${currentUser.email}`}</div>
            </div>
            <div className="row ms-3 me-3">
              {currentUser.dateJoined && <div className="col-auto ps-0 me-2">
                <FontAwesomeIcon icon={faCalendar} className="pe-2"/>
                {`Joined ${new Date(currentUser.dateJoined).toLocaleDateString("en-US", {
                  timeZone: 'UTC',
                  month: 'long',
                  year: 'numeric'
                })}`}
              </div>}
              <div className="row mt-2 mb-3">
                {currentUser.role === 'FOODIE' && <div className="col-auto ps-0">
                  <Following uid={currentUser._id}/>
                  <span className="text-secondary">Following</span>
                </div>}
                {currentUser.role === 'NUTRITIONIST' && <div className="col-auto ps-0">
                  <Followers uid={currentUser._id}/>
                  <span className="text-secondary">Followers</span>
                </div>}
              </div>
            </div>
            {likesRecipes && likesRecipes.length > 0 &&
              <>
                <hr/>
                <h3 className="wd-sub-heading-title ps-3">Liked Recipes:</h3>
                <ul className="ms-3">
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
              </>
            }
          </div>
        )
      }
    </>
  );
}

export default Profile;
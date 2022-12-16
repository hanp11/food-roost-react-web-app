import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import Following from "../follows/following";
import Followers from "../follows/followers";
import {useEffect, useState} from "react";
import {findAllUsersThunk, findUserByIdThunk} from "../services/users-thunks";
import {
  findFollowersThunk,
  findFollowingThunk
} from "../services/follows-thunks";

const PublicProfile = () => {
  const {uid} = useParams();
  const {publicProfile} = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findUserByIdThunk(uid))
    dispatch(findFollowersThunk(uid))
    dispatch(findFollowingThunk(uid))
  }, [uid]);

  return (
    <>
      {
          publicProfile && (
          <div className="border rounded">
            <div>
              <img className="rounded-circle"
                   src={'/images/default_avatar.jpg'} width={130}/>
            </div>
            <div className="ms-3 me-3 mb-2">
              <div className="fw-bolder">{publicProfile.fullName}</div>
              <div className="text-secondary">{`${publicProfile.username} (${publicProfile.role})`}</div>
            </div>
            <div className="row ms-3 me-3">
              {publicProfile.dateJoined && <div className="col-auto ps-0 me-2">
                <FontAwesomeIcon icon={faCalendar} className="pe-2"/>
                {`Joined ${new Date(publicProfile.dateJoined).toLocaleDateString("en-US", {
                  timeZone: 'UTC',
                  month: 'long',
                  year: 'numeric'
                })}`}
              </div>}
              <div className="row mt-2 mb-3">
                {publicProfile.role === 'FOODIE' && <div className="col-auto ps-0">
                  <Following uid={publicProfile._id}/>
                  <span className="text-secondary">Following</span>
                </div>}
                {publicProfile.role === 'NUTRITIONIST' && <div className="col-auto ps-0">
                  <Followers uid={publicProfile._id}/>
                  <span className="text-secondary">Followers</span>
                </div>}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default PublicProfile;
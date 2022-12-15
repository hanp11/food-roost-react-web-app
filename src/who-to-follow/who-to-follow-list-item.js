import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  findFollowingThunk,
  followUserThunk,
  unfollowUserThunk
} from "../services/follows-thunks";

const WhoToFollowListItem = ({who}) => {

  const {currentUser} = useSelector((state) => state.users);
  const {following} = useSelector((state) => state.follows);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findFollowingThunk(currentUser._id));
  }, [following]);

  const handleFollow = () => {
    dispatch(followUserThunk({
      followed: who._id
    }))
  }

  const handleUnfollow = () => {
    const followId = following.filter(f => f.followed._id === who._id)[0]._id;
    dispatch(unfollowUserThunk(followId))
  }

  return(
      <li className="list-group-item">
        <div className="row">
          <div className="col-2">
            <img alt="avatar-icon" className="rounded-circle" height={48} src={'/images/default_avatar.jpg'}/>
          </div>
          <div className="col-8">
            <div className="fw-bold">{who.fullName}</div>
            <div className="small">{who.username}</div>
          </div>
          <div className="col-2">
            {(following && following.filter(f => f.followed._id === who._id).length > 0)
                ? <button className="btn btn-primary rounded-pill float-end" onClick={handleUnfollow}>Unfollow</button>
                : <button className="btn btn-primary rounded-pill float-end" onClick={handleFollow}>Follow</button>}
          </div>
        </div>
      </li>
  );
};
export default WhoToFollowListItem;
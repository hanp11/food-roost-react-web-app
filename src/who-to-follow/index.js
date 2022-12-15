import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import WhoToFollowListItem from "./who-to-follow-list-item";
import './index.css';
import {findAllUsersThunk} from "../services/users-thunks";

const WhoToFollowList = () => {
  const {users} = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAllUsersThunk());
  }, []);

  return(
      <ul className="list-group">
        <li className="list-group-item">
          <h1 className="wd-who-to-follow">Experts to follow</h1>
        </li>
        {
          users?.filter(who => who.role === 'NUTRITIONIST')?.map(who =>
              <WhoToFollowListItem
                  key={who._id}
                  who={who}/>
          )
        }
      </ul>
  );
};

export default WhoToFollowList;
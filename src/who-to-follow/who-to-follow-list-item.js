import React from "react";

const WhoToFollowListItem = ({who}) => {

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
            <button className="btn btn-primary rounded-pill float-end">Follow</button>
          </div>
        </div>
      </li>
  );
};
export default WhoToFollowListItem;
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faHouse, faNewspaper,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useSelector} from "react-redux";

const NavSidebar = () => {
  const {currentUser} = useSelector((state) => state.users);

  const {pathname} = useLocation();
  const paths = pathname.split('/')
  const active = paths[1];

  return (
      <div className="list-group mb-3">
        <div className="list-group-item">
          <img className="pe-1" alt="food-roost-icon" height={25} src="../..//food-roost-icon.png"/>
          {currentUser && currentUser.fullName && <span className="d-none d-xl-inline">Welcome {currentUser.fullName}!</span>}
        </div>
        <Link to="/" className={`list-group-item ${!active && 'active'}`} title="Home">
          <FontAwesomeIcon icon={faHouse} className='pe-1' />
          <span className="d-none d-xl-inline">Home</span>
        </Link>
        <Link to="/profile" className={`list-group-item ${active === 'profile' && 'active'}`} title="Profile">
          <FontAwesomeIcon icon={faUser} className='pe-1' />
          <span className="d-none d-xl-inline">Profile</span>
        </Link>
        <Link to="/search" className={`list-group-item ${(active === 'search' || active === 'details') && 'active'}`} title="Recipes">
          <FontAwesomeIcon icon={faBowlFood} className='pe-1' />
          <span className="d-none d-xl-inline">Recipes</span>
        </Link>
        <Link to="/expert-advice" className={`list-group-item ${active === 'expert-advice' && 'active'}`} title="Expert Advice">
          <FontAwesomeIcon icon={faNewspaper} className='pe-1' />
          <span className="d-none d-xl-inline">Expert Advice</span>
        </Link>
      </div>
  );
};

export default NavSidebar;
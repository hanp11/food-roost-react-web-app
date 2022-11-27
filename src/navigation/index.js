import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faDrumstickBite,
  faHouse,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const NavSidebar = () => {
  const {pathname} = useLocation();
  const paths = pathname.split('/')
  const active = paths[1];

  return (
      <div className="list-group">
        <a className="list-group-item">
          <FontAwesomeIcon icon={faDrumstickBite} />
        </a>
        <Link to="/" className={`list-group-item ${!active && 'active'}`}>
          <FontAwesomeIcon icon={faHouse} />
          <span className="d-none d-xl-inline">Home</span>
        </Link>
        <Link to="/profile" className={`list-group-item ${active === 'profile' && 'active'}`}>
          <FontAwesomeIcon icon={faUser} />
          <span className="d-none d-xl-inline">Profile</span>
        </Link>
      </div>
  );
};

export default NavSidebar;
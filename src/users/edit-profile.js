import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import Following from "../follows/following";
import Followers from "../follows/followers";
import {useState} from "react";
import {updateUserThunk} from "../services/users-thunks";

const EditProfile = () => {
  const {currentUser} = useSelector((state) => state.users);

  let [email, setEmail] = useState(currentUser.email);

  const dispatch = useDispatch();

  const saveEditsHandler = () => {
    dispatch(updateUserThunk({
      ...currentUser,
      email
    }))
  }

  return (
    <>
      {
        currentUser && (
          <div className="border rounded">
            <div>
              <img className="rounded-circle"
                   src={'/images/default_avatar.jpg'} width={130}/>
              <Link to="/profile" onClick={saveEditsHandler}
                    className="btn btn-primary float-end rounded-pill mt-2 me-2 ps-3 pe-3">Save</Link>
            </div>
            <div className="ms-3 me-3 mb-2">
              <div className="fw-bolder">{currentUser.fullName}</div>
              <div className="text-secondary">{`${currentUser.username} (${currentUser.role})`}</div>
              <div className="form-group row mt-2 mb-2">
                <label htmlFor="formEmail" className="col-auto col-form-label">Email</label>
                <div className="col">
                  <input className="form-control" id="formEmail"
                         placeholder="Email" value={email}
                         onChange={e => setEmail(e.target.value)}/>
                </div>
              </div>
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
          </div>
        )
      }
    </>
  );
}

export default EditProfile;
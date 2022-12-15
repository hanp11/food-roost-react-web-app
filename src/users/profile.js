import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Profile = () => {
  const {currentUser} = useSelector((state) => state.users);

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
            <div className="ms-3 me-3 position-relative wd-profile-info-nudge-down">
              <div className="fw-bolder">{currentUser.fullName}</div>
              <div className="text-secondary">{`${currentUser.username} (${currentUser.role})`}</div>
              <div className="pt-2 overflow-auto">{currentUser.bio}</div>
            </div>
            <div className="row ms-3 me-3">
              <div className="col-auto text-secondary ps-0 me-2">
                <i className="bi bi-geo-alt pe-2"></i>
                {currentUser.location}
              </div>
              {currentUser.dateOfBirth && <div className="col-auto text-secondary ps-0 me-2">
                <i className="bi bi-balloon pe-2"></i>
                {`Born ${new Date(currentUser.dateOfBirth).toLocaleDateString("en-US", {
                  timeZone: 'UTC',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}`}
              </div>}
              {currentUser.dateJoined && <div className="col-auto text-secondary ps-0 me-2">
                <i className="bi bi-calendar3 pe-2"></i>
                {`Joined ${new Date(
                    parseInt(currentUser.dateJoined.split('/')[1]),
                    parseInt(currentUser.dateJoined.split('/')[0]) - 1
                ).toLocaleDateString("en-US", {
                  timeZone: 'UTC',
                  month: 'long',
                  year: 'numeric'
                })}`}
              </div>}
              <div className="row mt-2 mb-3">
                {currentUser.role === 'FOODIE' && <div className="col-auto ps-0">
                  <span className="fw-bolder pe-1">{currentUser.followingCount ?? 0}</span>
                  <span className="text-secondary">Following</span>
                </div>}
                {currentUser.role === 'NUTRITIONIST' && <div className="col-auto ps-0">
                  <span className="fw-bolder pe-1">{currentUser.followersCount ?? 0}</span>
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

export default Profile;
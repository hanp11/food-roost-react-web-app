import {useSelector} from "react-redux";

const Profile = () => {
  const {currentUser} = useSelector((state) => state.users);

  return (
    <>
      <h3 className="wd-page-title text-center">Profile</h3>
      {
        currentUser &&
          <h4>Welcome {currentUser.username}</h4>
      }
    </>
  );
}

export default Profile;
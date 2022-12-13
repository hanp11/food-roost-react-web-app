import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "../services/users-thunks";
import {Navigate} from "react-router";
import {Link} from "react-router-dom";

const Role = {
  Nutritionist: 'NUTRITIONIST',
  Foodie: 'FOODIE'
}

const Register = () => {
  const {currentUser, error} = useSelector((state) => state.users);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNutritionist, toggleIsNutritionist] = useState(false);

  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(registerThunk({
      username,
      password,
      email,
      fullName,
      role: isNutritionist ? Role.Nutritionist : Role.Foodie
    }));
  }

  if (currentUser) {
    return (<Navigate to={'/profile'}/>);
  }
  return (
    <div className="mt-3">
      {error &&
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
      }
      <h3 className="wd-page-title text-center">Register</h3>
      <form>
        <div className="form-group row mb-2">
          <label htmlFor="formFullName" className="col-sm-2 col-form-label">Full name</label>
          <div className="col-sm-10">
            <input className="form-control" id="formFullName"
                   placeholder="Full name" value={fullName}
                   onChange={e => setFullName(e.target.value)}/>
          </div>
        </div>
        <div className="form-group row mb-2">
          <label htmlFor="formEmail" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="formEmail"
                   placeholder="Email" value={email}
                   onChange={e => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="form-group row mb-2">
          <label htmlFor="formUsername" className="col-sm-2 col-form-label">Username</label>
          <div className="col-sm-10">
            <input className="form-control" id="formUsername"
                   placeholder="Username" value={username}
                   onChange={e => setUsername(e.target.value)}/>
          </div>
        </div>
        <div className="form-group row mb-2">
          <label htmlFor="formPassword" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="formPassword"
                   placeholder="Password" value={password}
                   onChange={e => setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="form-group row mb-2">
          <span className="col-sm-2"/>
          <div className="form-check col-sm-10">
            <input className="form-check-input" type="checkbox" checked={isNutritionist}
                   id="nutritionistCheck" onChange={() => toggleIsNutritionist(!isNutritionist)}/>
            <label className="form-check-label" htmlFor="nutritionistCheck">
              I certify that I am a nutritionist and would like to register as a nutritionist.
            </label>
          </div>
        </div>
        <div className="form-group d-flex justify-content-center mb-2">
          <button type="submit" className="btn btn-primary" onClick={handleRegister}>Register</button>
        </div>
      </form>
      <div className="d-flex justify-content-center">
        <span className="me-1">Already have an account?</span>
        <Link className="text-decoration-none" to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Register;
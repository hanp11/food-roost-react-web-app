import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Navigate} from "react-router";
import {loginThunk} from "../services/users-thunks";
import {Link} from "react-router-dom";

const Login = () => {
  const {currentUser, error} = useSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginThunk({username, password}));
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
        <h3 className="wd-page-title text-center">Login</h3>
        <form>
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
          <div className="form-group d-flex justify-content-center mb-2">
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Log in</button>
          </div>
        </form>
        <div className="d-flex justify-content-center">
          <span className="me-1">Don't have an account yet?</span>
          <Link className="text-decoration-none" to="/register">Register</Link>
        </div>
      </div>
  );
}

export default Login;
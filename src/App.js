import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./home";
import Search from "./search";
import NavSidebar from "./navigation";
import WhoToFollowList from "./who-to-follow";
import Details from "./details";
import Register from "./users/register";
import Login from "./users/login";
import Profile from "./users/profile";
import CurrentUser from "./users/current-user";
import ProtectedRoute from "./users/protected-route";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "./services/users-thunks";

function App() {
  const {currentUser} = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <CurrentUser>
        <div className="container-fluid row mt-2">
          <div className="col-2 col-md-2 col-lg-1 col-xl-2">
            <NavSidebar/>
            {!currentUser && (
                <Link className="btn btn-primary w-100 rounded-pill" to="/login">Log in</Link>
            )}
            {currentUser && (
                <button className="btn btn-primary w-100 rounded-pill"
                        onClick={() => dispatch(logoutThunk())}>Log out</button>
            )}
          </div>
          <div className={`${currentUser && currentUser.role === 'FOODIE' ? "col-10 col-md-10 col-lg-7 col-xl-6" : "col"}`}>
            <Routes>
              <Route index element={<Home/>}/>

              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute>
              }/>

              <Route path='/search/*' element={<Search/>}/>
              <Route path='/details/:resultId' element={<Details/>}/>
            </Routes>
          </div>
          {currentUser && currentUser.role === 'FOODIE' && (<div className="d-none d-lg-block col-lg-4 col-xl-4">
            <WhoToFollowList/>
          </div>)}
        </div>
      </CurrentUser>
    </BrowserRouter>
  );
}

export default App;

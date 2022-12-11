import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home";
import Search from "./search";
import NavSidebar from "./navigation";
import WhoToFollowList from "./who-to-follow";
import DetailsComponent from "./details";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid row mt-2">
        <div className="col-2 col-md-2 col-lg-1 col-xl-2">
          <NavSidebar/>
        </div>
        <div className="col-10 col-md-10 col-lg-7 col-xl-6">
          <Routes>
            <Route index element={<Home/>}/>

            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>

            <Route path='/search/*' element={<Search/>}/>
            <Route path='/details/:resultId' element={<DetailsComponent/>}/>
          </Routes>
        </div>
        <div className="d-none d-lg-block col-lg-4 col-xl-4">
          <WhoToFollowList/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

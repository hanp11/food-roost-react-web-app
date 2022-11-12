import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home";
import Search from "./search";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route index element={<Home/>}/>
          <Route path={'/search'} element={<Search/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

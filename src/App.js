import {  Widgets } from "@mui/icons-material";
import {  useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Appointments from "./Components/Appointments";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";

function App() {
  const state = useSelector((state) => state);

  const [show, setShow] = useState(false);
  const [rot,setRot]=useState(false);

  const handleNav = () => {
    setShow((c) => !c);
    setRot(c=>!c);

    
    console.log(show);
  };
  return (
    <>
      <div className="head">
        {state.isAuthenticated && (
          // <img
          //   alt="menu icon"
          //   className="menuicon"
          //   onClick={() => handleNav()}
          //   src="https://img.icons8.com/ios-glyphs/24/000000/menu-rounded.png"
          // />
          <Widgets fontSize="large" className={rot?"menuicon rot":"menuicon"} onClick={() => handleNav()}/>
        )}
        <h3>Appointment System</h3>
      </div>
      
      
        
        <div>
          <BrowserRouter>
          <NavBar show={show} setShow={setShow} setRot={setRot}/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </div>

    </>
  );
}

export default App;

import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [patientLogin,setPatientLogin]=useState(false);
  const [doctorLogin,setDoctorLogin]=useState(false);
  const [selected,setSelected]=useState(true);

  const [dusername, setDUsername] = useState("");
  const [dpassword, setDPassword] = useState("");
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [dcheck, setDCheck] = useState(false);
  const navigate = useNavigate();

  const handlePatientLogin = (response) => {
    if (!response.login) {
      setCheck(true);
    } 
    else {
      setCheck(false);
      dispatch({
        type: "LOG_IN" ,
        payload: {
          name: response.login.name,
          email: response.login.email,
          username: response.login.username,
          isAuthenticated: true,
          phoneno: response.login.phoneno,
          accessToken:response.accessToken,
        },
      });
      navigate("/dashboard");
    }
  };

  const handleDoctorLogin = (response) => {
    if (!response.login) {
      setDCheck(true);
    } 
    else {
      setDCheck(false);
      dispatch({
        type: "LOG_IN_DOCTOR" ,
        payload: {
          name: response.login.name,
          email: response.login.email,
          username: response.login.username,
          isDoctor: true,
          phoneno: response.login.phoneno,
          education:response.login.education,
          speciality:response.login.speciality,
          accessToken:response.accessToken
        },
      });
      navigate("/dashboard");
    }
  };
  const handlePatientSubmit = (event) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_ROUTE}/patientlogin`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ username, password }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handlePatientLogin(response))
      .catch((error) => console.log("Form submit error", error));
  };

  const handleDoctorSubmit = (event) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_ROUTE}/doctorlogin`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dusername, dpassword }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handleDoctorLogin(response))
      .catch((error) => console.log("Form submit error", error));
  };
  return (
    <>
    <div className="centerdiv">
      {selected &&(
      <div className="logincarder">
        <Button size="large" variant="contained" onClick={()=>{setSelected(false);setPatientLogin(true);}}>Patient Login</Button><br/><br/>
        <Button size="large" variant="contained" onClick={()=>{setSelected(false);setDoctorLogin(true)}}>Doctor Login</Button>
      </div>)}
      {patientLogin && (
      <div className="carder">
        <h3>Patient Login</h3>
      <form method="post">
        <div className="forminput">Username:{" "}
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        /></div>
        <br />
        <div className="forminput">Password:{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        /></div>
        <br />
        <button onClick={handlePatientSubmit} className="btn btn-primary">
          Log In
        </button>
        <br />
        <br />
      </form>
      {check && (
        <p className="errormsg">
          Oops! Crendiatials entered is wrong! Try Again.
        </p>
      )}

     <Button variant="text" onClick={()=>{setSelected(true);setPatientLogin(false);setCheck(false);setDCheck(false);}}>&larr; back</Button>
      </div>)}

      {doctorLogin && (
      <div className="carder">
        <h3>Doctor Login</h3>
      <form method="post">
      <div className="forminput">Username:{" "}
        <input
          type="text"
          name="username"
          value={dusername}
          onChange={(event) => setDUsername(event.target.value)}
          required
        />
        </div>
        <br />
        <div className="forminput">Password:{" "}
        <input
          type="password"
          name="password"
          value={dpassword}
          onChange={(event) => setDPassword(event.target.value)}
          required
        /></div><br/>
        <button onClick={handleDoctorSubmit} className="btn btn-primary">
          Log In
        </button>
        <br />
        <br />
      </form>
      {dcheck && (
        <p className="errormsg">
          Oops! Crendiatials entered is wrong! Try Again.
        </p>
      )}

<Button variant="text" onClick={()=>{setSelected(true);setDoctorLogin(false);setCheck(false);setDCheck(false);}}>&larr;back</Button>
      </div>)}
      
      </div>
      <br/>
      <div className="login">
      <p>
        Don't have an account?<a href="/signup">create account</a>
      </p>
      </div>
     
    </>
  );
}

export default Home;

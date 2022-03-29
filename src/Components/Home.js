import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    else if(response.admin){
      setCheck(false);
      dispatch({type:"ADMIN",payload:{name: response.name,
        email: response.email,
        username: response.username,
        isAuthenticated: response.login,
        phoneno: response.phoneno}})

        // navigate('/admin');
    }
    else {
      setCheck(false);
      dispatch({
        type: "LOG_IN" ,
        payload: {
          name: response.name,
          email: response.email,
          username: response.username,
          isAuthenticated: response.login,
          phoneno: response.phoneno,
        },
      });
      navigate("/patientdashboard");
    }
  };

  const handleDoctorLogin = (response) => {
    if (!response.login) {
      setDCheck(true);
    } 
    else if(response.admin){
      setDCheck(false);
      dispatch({type:"ADMIN",payload:{name: response.name,
        email: response.email,
        username: response.username,
        isAuthenticated: response.login,
        phoneno: response.phoneno}})

        // navigate('/admin');
    }
    else {
      setDCheck(false);
      dispatch({
        type: "LOG_IN_DOCTOR" ,
        payload: {
          name: response.name,
          email: response.email,
          username: response.username,
          isDoctor: response.login,
          phoneno: response.phoneno,
          education:response.education,
          speciality:response.speciality,
        },
      });
      navigate("/doctordashboard");
    }
  };
  const handlePatientSubmit = (event) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_ROUTE}/patientlogin`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      <div className="carder">
        <h3>Patient Login</h3>
      <form method="post">
        Username:{" "}
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <br />
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <br />
        <br />
        <button onClick={handlePatientSubmit} className="btn btn-primary">
          Log In
        </button>
        <br />
        <br />
      </form>
      {check && (
        <p style={{ color: "red" }}>
          Oops! Crendiatials entered is wrong! Try Again.
        </p>
      )}

     
      </div>

      <div className="carder">
        <h3>Doctor Login</h3>
      <form method="post">
        Username:{" "}
        <input
          type="text"
          name="username"
          value={dusername}
          onChange={(event) => setDUsername(event.target.value)}
          required
        />
        <br />
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          value={dpassword}
          onChange={(event) => setDPassword(event.target.value)}
          required
        />
        <br />
        <br />
        <button onClick={handleDoctorSubmit} className="btn btn-primary">
          Log In
        </button>
        <br />
        <br />
      </form>
      {dcheck && (
        <p style={{ color: "red" }}>
          Oops! Crendiatials entered is wrong! Try Again.
        </p>
      )}

     
      </div>
     
      </div>
      <p>
        Don't have an account?<a href="/signup">create account</a>
      </p>
    </>
  );
}

export default Home;

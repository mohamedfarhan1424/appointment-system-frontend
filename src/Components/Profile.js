import { Breadcrumbs, Button, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Profile() {
  const state = useSelector((state) => state);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [edit,setEdit]=useState(false);
  const [name,setName]=useState(state.name);
  const [email,setEmail]=useState(state.email);
  const [phoneno,setPhoneno]=useState(state.phoneno);


  useEffect(()=>{
    const url = `${process.env.REACT_APP_API_ROUTE}/patientdetails/${state.username}`;
    const requestOptions = {
      method: "GET",
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json())).then((response)=>dispatch({type:"UPDATE_PATIENT",payload:{name:response[0].name,email:response[0].email,phoneno:response[0].phoneno}}))
      .catch((error) => console.log("Form submit error", error));
  },[state.username,dispatch,edit])

  const handleEditProfile=()=>{
    const url = `${process.env.REACT_APP_API_ROUTE}/updatepatient`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: state.username,
        name: name,
        email:email,
        phoneno:phoneno,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .catch((error) => console.log("Form submit error", error));

    setEdit(false);
  }
  

  if (!state.isAuthenticated) {
    navigate("/");
    return (
      <>
        <p>Need to login</p>
        <a href="/">Login</a>
      </>
    );
  }
  return (
    <>
      <div className="profilediv">
        <Breadcrumbs>
          <Link href="/dashboard">Dashboard</Link>
          <Link aria-current="page">Profile</Link>
        </Breadcrumbs>
        {!state.isDoctor && (
        <div className="carder">
          <div className="profile">
            <h6>Name:</h6> {!edit&&(name)} {edit&&(<input value={name} onChange={(e)=>setName(e.target.value)}/>)}
            <br />
            <br />
            <h6>Email:</h6> {!edit&&(email)} {edit&&(<input value={email} onChange={(e)=>setEmail(e.target.value)}/>)}
            <br />
            <br />
            <h6>Contact:</h6> {!edit&&(phoneno)} {edit&&(<input value={phoneno} onChange={(e)=>setPhoneno(e.target.value)}/>)}
            <br />
            <br />
            <h6>User Name:</h6> {state.username}
            <br />
            <br />
            {!edit &&(<Button variant="contained" onClick={()=>setEdit(true)}>EDIT</Button>)}
            {edit && (<Button variant="contained" color="success" onClick={()=>handleEditProfile()}>Save</Button>)}
          </div>
        </div>
        )}
      </div>
    </>
  );
}

export default Profile;

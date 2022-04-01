import { Breadcrumbs, Button, Link } from "@mui/material";
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Profile() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(state.name);
  const [email, setEmail] = useState(state.email);
  const [phoneno, setPhoneno] = useState(state.phoneno);
  const [education, setEducation] = useState(state.education);
  const [speciality, setSpeciality] = useState(state.speciality);

  

  const handleDoctorProfile = () => {
    const url = `${process.env.REACT_APP_API_ROUTE}/updatedoctor`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json","Authorization":`Bearer ${state.accessToken}`  },
      body: JSON.stringify({
        username: state.username,
        name: name,
        email: email,
        phoneno: phoneno,
        education: education,
        speciality: speciality,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .catch((error) => console.log("Form submit error", error));

      dispatch({
        type: "UPDATE_DOCTOR",
        payload: {
          name: name,
          email: email,
          phoneno: phoneno,
          speciality: speciality,
          education: education,
        },
      })
      
    setEdit(false);
  };

  const handleEditProfile = () => {
    const url = `${process.env.REACT_APP_API_ROUTE}/updatepatient`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json","Authorization":`Bearer ${state.accessToken}`  },
      body: JSON.stringify({
        username: state.username,
        name: name,
        email: email,
        phoneno: phoneno,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .catch((error) => console.log("Form submit error", error));

      dispatch({
        type: "UPDATE_PATIENT",
        payload: {
          name: name,
          email: email,
          phoneno: phoneno,
        },
      })
    setEdit(false);
  };

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

        <div className="carder">
          <div className="profile">
            <h6>Name:</h6> {!edit && name}{" "}
            {edit && (
              <input value={name} onChange={(e) => setName(e.target.value)} />
            )}
            <br />
            <br />
            <h6>Email:</h6> {!edit && email}{" "}
            {edit && (
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            )}
            <br />
            <br />
            <h6>Contact:</h6> {!edit && phoneno}{" "}
            {edit && (
              <input
                value={phoneno}
                onChange={(e) => setPhoneno(e.target.value)}
              />
            )}
            <br />
            <br />
            {state.isDoctor && (
              <>
                <h6>Education:</h6> {!edit && education}{" "}
                {edit && (
                  <input
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                )}
                <br />
                <br />
                <h6>Speciality:</h6> {!edit && speciality}{" "}
                {edit && (
                  <input
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                  />
                )}
                <br />
                <br />
              </>
            )}
            <h6>User Name:</h6> {state.username}
            <br />
            <br />
            <div className="d-flex justify-content-around">
              {!edit && (
                <Button variant="contained" onClick={() => setEdit(true)}>
                  EDIT
                </Button>
              )}
              {edit && (
                <Button variant="contained" onClick={() => setEdit(false)}>
                  Cancel
                </Button>
              )}
              {edit && !state.isDoctor && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleEditProfile()}
                >
                  Save
                </Button>
              )}
              {edit && state.isDoctor && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleDoctorProfile()}
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

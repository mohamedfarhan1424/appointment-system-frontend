import { Breadcrumbs, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomizedTable from "./CustomizedTable";

function Appointments() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [doctorRows, setDoctorRows] = useState([]);

  const handlePatientSchedules = (response) => {
    setRows(response);
  };
  const handleDoctorSchedules = (response) => {
    console.log(response);
    setDoctorRows(response);
  
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_ROUTE}/patientschedules/${state.username}`;
    const requestOptions = { method: "GET",headers:{"Authorization":`Bearer ${state.accessToken}` } };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handlePatientSchedules(response))
      .catch((error) => console.log("Form submit error", error));
  }, [state.username,state.accessToken,rows]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_ROUTE}/getappointments/${state.username}`;
    const requestOptions = { method: "GET",headers:{"Authorization":`Bearer ${state.accessToken}` } };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handleDoctorSchedules(response))
      .catch((error) => console.log("Form submit error", error));
  }, [state.username,state.accessToken]);

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
      <Breadcrumbs>
        <Link href="/dashboard">Dashboard</Link>
        <Link aria-current="page">Appointments</Link>
      </Breadcrumbs>
      {state.isAuthenticated && !state.isDoctor && (
        <div>
          <h3 style={{textAlign:"center"}}>Your Appointments</h3><br/>
          <CustomizedTable
            head1="Doctor Name"
            head2="Appointment Date"
            head3="Appointment Day"
            head4="Appointment Time"
            head5="Cancel"
            head6={false}
            rows={rows}
          />
        </div>
      )}
      {state.isDoctor && (
        <div>
          <h3 style={{textAlign:"center"}}>Your Appointments</h3><br/>
          <CustomizedTable head1="Patient Name" head2="Appointment Date" head3="Appointment Day" head4="Appointment Time" head5="Reason" head6={false} rows={doctorRows}/>
        </div>
      )}
    </>
  );
}

export default Appointments;

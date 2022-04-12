// import { Breadcrumbs, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomizedTable from "./CustomizedTable";
import "../App.css";
import { CalendarMonth } from "@mui/icons-material";
import {CircularProgress} from '@mui/material';

function Appointments() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [doctorRows, setDoctorRows] = useState([]);
  const [loading,setLoading]=useState(true);

  const handlePatientSchedules = (response) => {
    setLoading(false);
    setRows(response);
  };
  const handleDoctorSchedules = (response) => {
    setLoading(false);
    setDoctorRows(response);
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_ROUTE}/patientschedules/${state.username}`;
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${state.accessToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handlePatientSchedules(response))
      .catch((error) => console.log("Form submit error", error));
  }, [state.username, state.accessToken, rows]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_ROUTE}/getappointments/${state.username}`;
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${state.accessToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handleDoctorSchedules(response))
      .catch((error) => console.log("Form submit error", error));
  }, [state.username, state.accessToken]);

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
      <div className="bgclrappoint">
        {/* <div className="p-3 mt-3">
          <Breadcrumbs>
            <Link href="/dashboard">Dashboard</Link>
            <Link aria-current="page">Appointments</Link>
          </Breadcrumbs>
        </div> */}
         <div className="dashboard">
          <div className="dashicon">
          <CalendarMonth/>
          </div>
          <div className="dashtext">
            <h4>Your Appointments</h4>
          <h6>Username : {state.username}</h6>
          </div>
        </div>

        {state.isAuthenticated && !state.isDoctor && (
          <>
          <br/>
          <div className="appointments">
            {loading && (<CircularProgress/>)}
            {!loading && (
              <CustomizedTable
              head1="Doctor Name"
              head2="Appointment Date"
              head3="Appointment Day"
              head4="Appointment Time"
              head5="Cancel"
              head6={false}
              rows={rows}
            />
            )}
            
          </div>
          </>
        )}
        {state.isDoctor && (
          <>
          <br/>
          <div className="appointments">
            {loading?(<CircularProgress/>):(
              <CustomizedTable
              head1="Patient Name"
              head2="Appointment Date"
              head3="Appointment Day"
              head4="Appointment Time"
              head5="Reason"
              head6={false}
              rows={doctorRows}
            />
            )}
            
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default Appointments;

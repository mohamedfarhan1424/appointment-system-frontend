import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import CustomizedTable from "./CustomizedTable";

function PatientDashboard() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [scheduleRows, setScheduleRows] = useState([]);
  const [scheduleDate, setScheduleDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [scheduleTime, setScheduleTime] = useState("");
  const [open, setOpen] = useState(false);

  const handleSchedules = (response) => {
    setRows(response);
  };

  const handleAddSchedule = () => {
      setScheduleTime(scheduleTime+'');
    const url = `${process.env.REACT_APP_API_ROUTE}/addschedule`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scheduleDate,
        scheduleTime,
        username: state.username,
        name: state.name,
        education: state.education,
        speciality: state.speciality,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handleSchedules(response))
      .catch((error) => console.log("Form submit error", error));
  };
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_ROUTE}/getallschedules`;
    const requestOptions = {
      method: "GET",
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handleSchedules(response))
      .catch((error) => console.log("Form submit error", error));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <div className="dashboard">
        <h3>Welcome {state.name}</h3>
      </div>
      {!state.isDoctor && (
        <div className="tablediv">
          <h5>Available Doctors</h5>
          <CustomizedTable
            head1="Doctor Name"
            head2="Education"
            head3="Speciality"
            head4="Available Date"
            head5="Time"
            head6="Appointment"
            rows={rows}
          />
        </div>
      )}
      {state.isDoctor && (
        <div>
          <div className="tablediv">
            <div className="d-flex justify-content-around">
              <h5>Your Schedules</h5>
              <button
                className="btn btn-primary"
                onClick={() => handleClickOpen()}
              >
                Add Schedule
              </button>
            </div>
            <CustomizedTable
              head1="Schedule Date"
              head2="Schedule Day"
              head3="Schedule Time"
              head4="Remove"
              rows={scheduleRows}
            />
          </div>
          <div>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
              <DialogTitle>Add Schedule</DialogTitle>
              <DialogContent>
                Schedule Date:{" "}
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={moment().format("YYYY-MM-DD")}
                />
                <br />
                <br />
                Schedule Time:{" "}
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
                <br />
                <br />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={() => handleAddSchedule()}>
                  Add Schedule
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}

export default PatientDashboard;

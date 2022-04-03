import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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
  const [filter,setFilter]=useState(false);
  const [doctors,setDoctors]=useState([]);
  const [filterDoctorName,setFilterDoctorName]=useState("");
  const [filterDate,setFilterDate]=useState("");
  const [filterTime,setFilterTime]=useState("");
  const [allRows,setAllRows]=useState([]);

  const times=["8:00 am","8:30 am","9:00 am","9:30 am","10:00 am","10:30 am","11:00 am","11:30 am","12:00 pm","12:30 pm","1:00 pm","1:30 pm","2:00 pm","2:30 pm","3:00 pm","3:30 pm","4:00 pm","4:30 pm","5:00 pm","5:30 pm","6:00 pm"]
  

  const handleSchedules = (response) => {
    setRows(response);
    setAllRows(response);
  };

  const handleDoctorSchedules=(response)=>{
    setScheduleRows(response);
  }

  const handleFilterList=()=>{
    
    var doctornames=rows.map((row)=>row.doctor_name);
  
    var filteredRows=[...new Set(doctornames)]
    setDoctors(filteredRows);
  }

  const handleAddSchedule = () => {
    const url = `${process.env.REACT_APP_API_ROUTE}/addschedule`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json","Authorization":`Bearer ${state.accessToken}`  },
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
      headers:{"Authorization":`Bearer ${state.accessToken}`}
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handleSchedules(response))
      .catch((error) => console.log("Form submit error", error));

  }, [state.accessToken]);

  


 
    useEffect(()=>{
      const url=`${process.env.REACT_APP_API_ROUTE}/getschedule/${state.username}`;
      const requestOptions={method:"GET",headers:{"Authorization":`Bearer ${state.accessToken}` }};
      fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .then((response) => handleDoctorSchedules(response))
      .catch((error) => console.log("Form submit error", error));
    },[state.username,state.accessToken]);

    

    const requestSearch = (name,date,time) => {
      if(name===""&&date===""&&time===""){
        return;
      }
      else if(name==="" && date===""){
        const filteredRows = allRows.filter((row) => {
          return row.schedule_time.toLowerCase().includes(time.toLowerCase());
        });
        setRows(filteredRows);
      }
      else if(name===""&&time===""){
        const filteredRows = allRows.filter((row) => {
          return row.schedule_date.toLowerCase().includes(date.toLowerCase());
        });
        setRows(filteredRows);
      }
      else if(time===""&&date===""){
        const filteredRows = allRows.filter((row) => {
          return row.doctor_name.toLowerCase().includes(name.toLowerCase());
        });
        setRows(filteredRows);
      }
      else if(name===""){
        const filteredRows = allRows.filter((row) => {
          return (row.schedule_date.toLowerCase().includes(date.toLowerCase())&&row.schedule_time.toLowerCase().includes(time.toLowerCase()))
        });
        setRows(filteredRows);
      }
      else if(date===""){
        const filteredRows = allRows.filter((row) => {
          return (row.doctor_name.toLowerCase().includes(name.toLowerCase())&&row.schedule_time.toLowerCase().includes(time.toLowerCase()))
        });
        setRows(filteredRows);
      }
      else if(time===""){
        const filteredRows = allRows.filter((row) => {
          return (row.schedule_date.toLowerCase().includes(date.toLowerCase())&&row.doctor_name.toLowerCase().includes(name.toLowerCase()))
        });
        setRows(filteredRows);
      }
      else{
        const filteredRows = allRows.filter((row) => {
          return (row.schedule_date.toLowerCase().includes(date.toLowerCase())&&row.doctor_name.toLowerCase().includes(name.toLowerCase())&&row.schedule_time.toLowerCase().includes(time.toLowerCase()))
        });
        setRows(filteredRows);
      }
    
  };
  

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
        {!state.isDoctor &&(<h2>Patient Dashboard</h2>)}
        {state.isDoctor &&(<h2>Doctor Dashboard</h2>)}
        <h3>Welcome {state.name}</h3>
      </div>
      {!state.isDoctor && (
        <div className="tablediv">
          <div className="d-flex justify-content-between">
          <h5>Available Doctors</h5>
          <button className="btn btn-primary" onClick={()=>{handleFilterList();setFilter(f=>!f);}}>{filter?"Close":"Filter"}</button>
          </div>
          {filter && (
            <div className="d-flex justify-content-around align-items-center">
              <div>
              <InputLabel id="demo-simple-select-helper-label">Doctors</InputLabel>
        <Select style={{minWidth:160}}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={filterDoctorName}
          label="Doctors"
          onChange={(e)=>setFilterDoctorName(e.target.value)}
        >
          {doctors.map((doctor)=>(
            <MenuItem key={doctor} value={doctor}>{doctor}</MenuItem>
          ))}
          
          
        </Select>
        </div>
        <div>
        <InputLabel id="demo-simple-select-helper-label">Date</InputLabel>
        <TextField type="date" variant="outlined" value={filterDate} onChange={(e)=>setFilterDate(e.target.value)}/>
            </div>
            <div>
        <InputLabel id="demo-simple-select-helper-label">Time</InputLabel>
        <Select style={{minWidth:160}}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Time"
          value={filterTime}
          onChange={(e)=>setFilterTime(e.target.value)}
        >
          {times.map((time)=>(
            <MenuItem key={time} value={time}>{time}</MenuItem>
          ))}
          
          
        </Select>
            </div>
            <div>
              <Button variant="outlined" onClick={()=>requestSearch(filterDoctorName,filterDate,filterTime)}>Search</Button>
            </div>
            <div>
              <Button variant="outlined" onClick={()=>{setFilterDoctorName("");setFilterDate("");setFilterTime("");setRows(allRows)}}>Remove filter</Button>
            </div></div>
          )}
          <div className="tablediv">
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
          
        </div>
      )}
      {state.isDoctor && (
        <div>
          <div className="d-flex justify-content-between">
              <h5>Your Schedules</h5>
              <button
                className="btn btn-primary"
                onClick={() => handleClickOpen()}
              >
                Add Schedule
              </button>
            </div>
          <div className="tablediv">
            
            <CustomizedTable
              head1="Schedule Date"
              head2="Schedule Day"
              head3="Schedule Time"
              head4="Status"
              head5="Remove"
              head6={false}
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
                <Select style={{minWidth:160}}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Time"
          value={scheduleTime}
          onChange={(e)=>setScheduleTime(e.target.value)}
        >
          {times.map((time)=>(
            <MenuItem key={time} value={time}>{time}</MenuItem>
          ))}
          
          
        </Select>
                <br />
                <br />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={() => {handleClose();handleAddSchedule();}}>
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

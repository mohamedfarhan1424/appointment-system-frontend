import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "../App.css";
import { useSelector } from "react-redux";
import '../App.css'
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";


const useStyles=makeStyles({
  tableBody:{
    height:"2vw",
    textAlign:"center",
    color:"white"
  }
})

export default function CustomizedTable({
  head1,
  head2,
  head3,
  head4,
  head5,
  head6,
  rows,
}) {
  const classes=useStyles();
  const state = useSelector((state) => state);
  const columns = [
    { id: head1, label: head1, minWidth: 170 },
    { id: head2, label: head2, minWidth: 100 },
    {
      id: head3,
      label: head3,
      minWidth: 170,
      align: "center",
    },
    {
      id: head4,
      label: head4,
      minWidth: 170,
      align: "center",
    },
    {
      id: head5,
      label: head5,
      minWidth: 170,
      align: "center",
    },
    {
      id: head6,
      label: head6,
      minWidth: 170,
      align: "center",
    },
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [removeId, setRemoveId] = React.useState(0);
  const [cancelId, setCancelId] = React.useState(0);
  const [selected, setSelected] = React.useState({});
  const [reason, setReason] = React.useState("");
  const navigate=useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (row) => {
    setSelected(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelOpen = (scheduleId) => {
    setCancelId(scheduleId);
    setOpen2(true);
  };

  const handleCancelClose = () => {
    setOpen2(false);
  };

  const handleRemoveOpen = (scheduleId) => {
    setRemoveId(scheduleId);
    setOpen3(true);
  };

  const handleRemoveClose = () => {
    setOpen3(false);
  };

  const handleRemoveSchedule = () => {
    const url = `${process.env.REACT_APP_API_ROUTE}/deleteschedule/${removeId}`;
    const requestOptions = {
      method: "DELETE",
      headers:{"Authorization":`Bearer ${state.accessToken}` }
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .catch((error) => console.log("Form submit error", error));
  };

  const handleCancelAppointment = () => {
    const url = `${process.env.REACT_APP_API_ROUTE}/cancelappointment`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.accessToken}` },
      body: JSON.stringify({
        scheduleId: cancelId,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .catch((error) => console.log("Form submit error", error));
  };

  const handleGetAppointment = () => {
    const url = `${process.env.REACT_APP_API_ROUTE}/makeschedule`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json","Authorization":`Bearer ${state.accessToken}`  },
      body: JSON.stringify({
        patientName: state.username,
        reason: reason,
        scheduleId: selected.schedule_id,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .catch((error) => console.log("Form submit error", error));

      navigate('/appointments');
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      <Paper variant="outlined" sx={{ width: "100%", overflow: "hidden" }} >
        {rows && rows.length === 0 && (
          <>
            {head6 && head5 && (
              <p className="errormsg">There is no available doctors now.</p>
            )}
            {!head6 && head5 === "Remove" && (
              <p className="errormsg">You have not added any shcedules.</p>
            )}
            {!head6 && head5 === "Cancel" && (
              <p className="errormsg">
                You have not booked any appointments.
              </p>
            )}
            {!head6 && head5 === "Reason" && (
              <p className="errormsg">
                You have not booked by any patients
              </p>
            )}
          </>
        )}
        {rows && rows.length !== 0 && (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(
                      (column) =>
                        column.label && (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody  className={classes.tableBody}>
                  {head6 &&
                    head5 &&
                    rows &&
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.schedule_id}
                          >
                            <TableCell>{row.doctor_name}</TableCell>
                            <TableCell align="center">{row.education}</TableCell>
                            <TableCell align="center">
                              {row.speciality}
                            </TableCell>
                            <TableCell align="center">
                              {row.schedule_date}
                            </TableCell>
                            <TableCell align="center">
                              {row.schedule_time}
                            </TableCell>
                            <TableCell align="center">
                              <button
                                className="loopbutton"
                                onClick={() => handleClickOpen(row)}
                              >
                                <img alt="calender icon" src="https://img.icons8.com/material-outlined/20/000000/planner.png"/> Get Appointment
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {!head6 &&
                    head5 === "Remove" &&
                    rows &&
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.schedule_id}
                          >
                            <TableCell>{row.schedule_date}</TableCell>
                            <TableCell align="center">
                              {days[new Date(row.schedule_date).getDay()]}
                            </TableCell>
                            <TableCell align="center">
                              {row.schedule_time}
                            </TableCell>
                            <TableCell align="center">
                              {row.patient_booked === null && (
                                <p
                                  className="falsestatus"
                                >
                                  Not Booked
                                </p>
                              )}
                              {row.patient_booked !== null && (
                                <p
                                  className="truestatus"
                                >
                                  Booked
                                </p>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.patient_booked === null && (
                                
                                  <img className="imgicon" alt="trash icon" onClick={() =>
                                    handleRemoveOpen(row.schedule_id)
                                  } src="https://img.icons8.com/color/20/000000/delete-forever.png"/>
                              
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {!head6 &&
                    head5 === "Cancel" &&
                    rows &&
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.schedule_id}
                          >
                            <TableCell>{row.doctor_name}</TableCell>
                            <TableCell align="center">
                            {row.schedule_date}
                            </TableCell>
                            <TableCell align="center">
                              {days[new Date(row.schedule_date).getDay()]}
                            </TableCell>
                            <TableCell align="center">
                              {row.schedule_time}
                            </TableCell>
                            <TableCell align="center">
                              
                                <img className="imgicon" alt="trash icon" onClick={() =>
                                  handleCancelOpen(row.schedule_id)
                                } src="https://img.icons8.com/color/20/000000/delete-forever.png"/>
                           
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {!head6 &&
                    head5 === "Reason" &&
                    rows &&
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.schedule_id}
                          >
                            <TableCell>{row.patient_booked}</TableCell>
                            <TableCell align="center">
                              {row.schedule_date}
                            </TableCell>
                            <TableCell align="center">
                              {days[new Date(row.schedule_date).getDay()]}
                            </TableCell>
                            <TableCell align="center">
                              {row.schedule_time}
                            </TableCell>
                            <TableCell align="center">
                              {row.patient_reason}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
      <div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Get Appointment</DialogTitle>
          <DialogContent>
            <div>
              <h5 style={{ textAlign: "center" }}>Patient Details</h5>
              <hr />
              Patient Name: {state.name}
              <hr />
              Contact Number: {state.phoneno}
              <hr />
              Email Address: {state.email}
              <hr />
              <h5 style={{ textAlign: "center" }}>Appointment Details</h5>
              <hr />
              Doctor Name: {selected.doctor_name}
              <hr />
              Appointment Date: {selected.schedule_date}
              <hr />
              Appointment Day: {days[new Date(selected.schedule_date).getDay()]}
              <hr />
              Appointment Time: {selected.schedule_time}
              <hr/>
              Appointment Reason:{" "}
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleGetAppointment();
                handleClose();
              }}
            >
              Get Appointment
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={open2} onClose={handleCancelClose}>
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogContent>Are you sure to Cancel?</DialogContent>
          <DialogActions>
            <Button onClick={handleCancelClose}>No</Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                handleCancelAppointment();
                handleCancelClose();
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={open3} onClose={handleRemoveClose}>
          <DialogTitle>Remove Schedule</DialogTitle>
          <DialogContent>Are you sure to Remove?</DialogContent>
          <DialogActions>
            <Button onClick={handleRemoveClose}>No</Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                handleRemoveSchedule();
                handleRemoveClose();
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

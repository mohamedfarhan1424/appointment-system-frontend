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

export default function CustomizedTable({
  head1,
  head2,
  head3,
  head4,
  head5,
  head6,
  rows,
}) {
  const state = useSelector((state) => state);
  const columns = [
    { id: head1, label: head1, minWidth: 170 },
    { id: head2, label: head2, minWidth: 100 },
    {
      id: head3,
      label: head3,
      minWidth: 170,
      align: "right",
    },
    {
      id: head4,
      label: head4,
      minWidth: 170,
      align: "right",
    },
    {
      id: head5,
      label: head5,
      minWidth: 170,
      align: "right",
    },
    {
      id: head6,
      label: head6,
      minWidth: 170,
      align: "right",
    },
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [open2,setOpen2]=React.useState(false);
  const [open3,setOpen3]=React.useState(false);
  const [removeId,setRemoveId]=React.useState(0);
  const [cancelId,setCancelId]=React.useState(0);
  const [selected, setSelected] = React.useState({});
  const [reason, setReason] = React.useState("");

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

  const handleRemoveSchedule=()=>{
    const url = `${process.env.REACT_APP_API_ROUTE}/deleteschedule/${removeId}`;
    const requestOptions = {
      method: "DELETE"
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .catch((error) => console.log("Form submit error", error));
  }


  const handleCancelAppointment=()=>{
    const url = `${process.env.REACT_APP_API_ROUTE}/cancelappointment`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scheduleId: cancelId,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .catch((error) => console.log("Form submit error", error));
  }

  const handleGetAppointment = () => {
    const url = `${process.env.REACT_APP_API_ROUTE}/makeschedule`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName: state.username,
        reason: reason,
        scheduleId: selected.schedule_id,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => (response = response.json()))
      .catch((error) => console.log("Form submit error", error));
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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            <TableBody>
              {head6 &&
                head5 &&
                rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.schedule_id}
                      >
                        <TableCell>{row.doctor_name}</TableCell>
                        <TableCell align="right">{row.education}</TableCell>
                        <TableCell align="right">{row.speciality}</TableCell>
                        <TableCell align="right">{row.schedule_date}</TableCell>
                        <TableCell align="right">{row.schedule_time}</TableCell>
                        <TableCell align="right">
                          <button
                            className="loopbutton"
                            onClick={() => handleClickOpen(row)}
                          >
                            Get Appointment
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {!head6 &&
                head5 === "Remove" &&
                rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.schedule_id}
                      >
                        <TableCell>{row.schedule_date}</TableCell>
                        <TableCell align="right">
                          {days[new Date(row.schedule_date).getDay()]}
                        </TableCell>
                        <TableCell align="right">{row.schedule_time}</TableCell>
                        <TableCell align="right">
                          {row.patient_booked === null && (
                            <p
                              style={{
                                backgroundColor: "Grey",
                                color: "White",
                                width: "40%",
                                float: "right",
                                borderRadius: "7px",
                                textAlign: "Center",
                              }}
                            >
                              Not Booked
                            </p>
                          )}
                          {row.patient_booked !== null && (
                            <p
                              style={{
                                backgroundColor: "green",
                                color: "White",
                                width: "40%",
                                float: "right",
                                borderRadius: "7px",
                                textAlign: "Center",
                              }}
                            >
                              Booked
                            </p>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {row.patient_booked===null&&(<button className="loopbutton" onClick={()=>handleRemoveOpen(row.schedule_id)}>Remove</button>)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {!head6 &&
                head5 === "Cancel" &&
                rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.schedule_id}
                      >
                        <TableCell>{row.doctor_name}</TableCell>
                        <TableCell align="right">{row.schedule_date}</TableCell>
                        <TableCell align="right">
                          {days[new Date(row.schedule_date).getDay()]}
                        </TableCell>
                        <TableCell align="right">{row.schedule_time}</TableCell>
                        <TableCell align="right">
                          <button className="loopbutton" onClick={()=>handleCancelOpen(row.schedule_id)}>Cancel</button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {!head6 &&
                head5 === "Reason" &&
                rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.schedule_id}
                      >
                        <TableCell>{row.patient_booked}</TableCell>
                        <TableCell align="right">{row.schedule_date}</TableCell>
                        <TableCell align="right">
                          {days[new Date(row.schedule_date).getDay()]}
                        </TableCell>
                        <TableCell align="right">{row.schedule_time}</TableCell>
                        <TableCell align="right">
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
        <Dialog open={open2} onClose={handleCancelClose} >
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogContent>
            Are you sure to Cancel?
          </DialogContent>
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
        <Dialog open={open3} onClose={handleRemoveClose} >
          <DialogTitle>Remove Schedule</DialogTitle>
          <DialogContent>
            Are you sure to Remove?
          </DialogContent>
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

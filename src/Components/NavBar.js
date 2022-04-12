import {
  AccountBox,
  CalendarMonth,
  Dashboard,
  Logout,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";

function NavBar({ show, current, setCurrent }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogoutOpen = () => {
    setOpen(true);
  };
  const handleLogoutClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <div className={show ? "sidebar active" : "sidebar"}>
          <button
            onClick={() => {
              navigate("/dashboard");
              setCurrent("dashboard");
            }}
            className={
              current === "dashboard" ? "sidebarbutton" : "sidebarbuttonselect"
            }
          >
            <div className="d-flex justify-content-start p-2">
              <Dashboard />{" "}
              <div className={show ? "text" : "texthid"}>DashBoard</div>
            </div>
          </button>


          <button
            onClick={() => {
              navigate("/profile");
              setCurrent("profile");
            }}
            className={
              current === "profile" ? "sidebarbutton" : "sidebarbuttonselect"
            }
          >
            <div className="d-flex justify-content-start p-2">
              <AccountBox />{" "}
              <div className={show ? "text" : "texthid"}>Profile</div>
            </div>
          </button>
          <button
            onClick={() => {
              navigate("/appointments");
              setCurrent("appoint");
            }}
            className={
              current === "appoint" ? "sidebarbutton" : "sidebarbuttonselect"
            }
          >
            <div className="d-flex justify-content-start p-2">
              <CalendarMonth />{" "}
              <div className={show ? "text" : "texthid"}>Appointments</div>
            </div>
          </button>

          <button
            onClick={() => {
              handleLogoutOpen();
            }}
            className="sidebarbuttonselect"
          >
            <div className="d-flex justify-content-start p-2">
              <Logout /> <div className={show ? "text" : "texthid"}>Logout</div>
            </div>
          </button>
        </div>
        <div>
          <Dialog open={open} onClose={handleLogoutClose}>
            <DialogTitle>Log Out</DialogTitle>
            <DialogContent>Are you sure to Logout?</DialogContent>
            <DialogActions>
              <Button onClick={handleLogoutClose}>No</Button>
              <Button
                variant="contained"
                color="info"
                onClick={() => {
                  dispatch({ type: "LOG_OUT" });
                  setCurrent("dashboard");
                  handleLogoutClose();
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    </>
  );
}

export default NavBar;

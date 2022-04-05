import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Signup from "./Signup";
import PatientDashboard from "./Dashboard";
import Appointments from "./Appointments";
import Profile from "./Profile";

export default function ButtonAppBar() {
  const state = useSelector((state) => state);
  const [show, setShow] = React.useState(false);

  const [current, setCurrent] = React.useState("dashboard");
  const handleNav = () => {
    setShow((c) => !c);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {state.isAuthenticated && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => handleNav()}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Appointment System
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <BrowserRouter>
          <div className="main">
            {state.isAuthenticated && (
              <NavBar
                show={show}
                setShow={setShow}
                current={current}
                setCurrent={setCurrent}
              />
            )}
            <div className="routes">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/dashboard"
                  element={<PatientDashboard setCurrent={setCurrent} />}
                />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  //console.log("User ID = ", localStorage.getItem("userID"));
  //console.log("User token = ", localStorage.getItem("idToken"));
  //console.log("User email = ", localStorage.getItem("userEmail"));

  if (localStorage.getItem("idToken") == null)
    return (
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          className="bottomNav"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/" icon={<HomeIcon />} />
          <BottomNavigationAction
            component={Link}
            to="/login"
            icon={<LoginIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/signup"
            icon={<AppRegistrationIcon />}
          />
        </BottomNavigation>
      </Box>
    );
  else
    return (
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          className="bottomNav"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/" icon={<HomeIcon />} />
          <BottomNavigationAction
            component={Link}
            to="/upload"
            icon={<CreateIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/logout"
            icon={<LogoutIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/profile"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Box>
    );
}

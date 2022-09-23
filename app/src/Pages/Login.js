import "../Styles/App.css";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactComponent as GoogleLogo } from "../Content/Images/Google.svg";
import LoginImg from "../Content/Images/Login.svg";
import { useAlert } from "../component/useAlert";

function Login() {
  let navigate = useNavigate();
  const [AlertMessage, isVisible, getProps] = useAlert();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    //handle email & password requirements
    // if (!data.get("email").toString().includes("@")) {
    //   console.log("No @ provided in email.");
    //   return;
    // }
    // if (data.get("password").toString().length < 5) {
    //   console.log("Password must be atleast 5 characters long.");
    //   return;
    // }

    try {
      fetch(
        "http://localhost:3001/users/login?email=" +
          data.get("email") +
          "&password=" +
          data.get("password")
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === false) getProps({ variant: "error", message: "We could not find an existing user with these credentials, please try again." });
          else {
            localStorage.setItem("idToken", result.idToken);
            localStorage.setItem("userID", result.userID);
            localStorage.setItem("userEmail", data.get("email"));
            /*
            console.log(
              "Successfully logged in! idToken: ",
              localStorage.getItem("idToken")
            );
            console.log("User ID = ", localStorage.getItem("userID"));
            console.log("User Email = ", localStorage.getItem("userEmail"));
            */
            navigate("/");
            window.location.reload(false);
          }
        });
    } catch (e) {
      console.log("Error logging in: ", e.message);
    }
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* <Grid item xs={12} sm={12} md={6}>
        <Box>
          <img className="welcomeImg" src={`${LoginImg}`} />
        </Box>
      </Grid>
    */}
      <Grid item xs={12} sm={12} md={6} square>
        <Box
          sx={{
            my: "1em",
            mx: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography className="textPrimary">Login</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="standard"
            />
            <Button
              className="buttonMain"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {isVisible ? <AlertMessage /> : ""}
            <Grid container>
              <Grid item xs={12} sx={{ mt: "1rem" }}>
                {"or, login with..."}
                <Button
                  className="buttonGoogle"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: "1rem", mb: "1rem" }}
                >
                  <GoogleLogo className="googleLogo" /> Sign in with Google
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ mt: "1rem" }}>
                {"New to Tbay? "}
                <Link className="linkMain" to="/signup">
                  {"Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;

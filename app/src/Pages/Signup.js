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
import SignupImg from "../Content/Images/Signup.svg";
import { useAlert } from "../component/useAlert";

function Signup() {
  let navigate = useNavigate();
  const [AlertMessage, isVisible, getProps] = useAlert();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    });
    // Check if no @ in email
    if (!data.get("email").toString().includes("@")) {
      console.log("No @ provided in email.");
      getProps({ variant: "error", message: "Error: No @ provided in email." })
      return;
    }
    // Check is password long enough
    if (data.get("password").toString().length < 5) {
      console.log("Password must be atleast 5 characters long.");
      getProps({ variant: "error", message: "Error: Password must be at least 5 characters long." })
      return;
    }
    // Check passwords are equal
    if (data.get("password").toString() != data.get("confirmPassword").toString()) {
      console.log("Passwords don't match.");
      getProps({ variant: "error", message: "Error: Passwords don't match." })
      return;
    }

    try {
      fetch(
        "http://localhost:3001/users/signup?email=" +
          data.get("email") +
          "&password=" +
          data.get("password")
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === false){ getProps({ variant: "error", message: "Error: invalid email address." })
            console.log("Sign up failed!");}
          else {
            console.log("Successfully signed up!");
            //manual sign in
            localStorage.setItem("idToken", result.idToken);
            localStorage.setItem("userID", result.userID);
            console.log(
              "Successfully logged in! idToken: ",
              localStorage.getItem("idToken")
            );
            console.log("User ID = ", localStorage.getItem("userID"));
            //Route user to homepage
            navigate("/");
            window.location.reload(false);
          }
        });
    } catch (e) {
      console.log("Error logging in: ", e.message);
      getProps({ variant: "error", message: "Error: please try again." })
    }
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/*  
     <Grid item xs={12} sm={12} md={6}>
        <Box>
          <img className="welcomeImg" src={`${SignupImg}`} />
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
          <Typography className="textPrimary">Sign up</Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: "1rem" }}
          >
            <Grid item>
              <Button
                className="buttonGoogle"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: "1em" }}
              >
                <GoogleLogo className="googleLogo" /> Continue with Google
              </Button>
              {"Or, register with email…"}
            </Grid>
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
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm password"
              type="password"
              id="confirmPassword"
              variant="standard"
            />
            <Button
              className="buttonMain"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create account
            </Button>
            {isVisible ? <AlertMessage /> : ""}
            <Grid container>
              <Grid item xs={12} sx={{ mt: "1em", mb: "5em" }}>
                {"Already have an account? "}
                <Link className="linkMain" to="/login">
                  {"Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Signup;

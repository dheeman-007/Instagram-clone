import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { useState,useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import {UserContext} from '../../App'

const ariaLabel = { "aria-label": "description" };
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Signin() {
  const {state,dispatch} = useContext(UserContext)
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  let navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (success) {
      setOpen(false);
      setSuccess(false);
      navigate("/");
    }
    if (reason === "clickaway") {
      setError(false);
      return;
    }
    setOpen(false);
    setError(false);
  };

  const postData = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setText("Invalid email");
      setOpen(true);
      setError(true);
      return;
    }
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setText(data.error);
          setOpen(true);
          setError(true);
        } else {
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          setText("Redirecting");
          setOpen(true);
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      mt={10}
      mb={15}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        sx={{
          borderStyle: "solid",
          borderWidth: "3px",
          borderColor: "#700070",
          borderRadius: "10px",
          width: { xs: "90%", sm: "400px" },
          minHeight: "250px",
          bgcolor: "#E6DEDC",
        }}
      >
        {error ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" width="100%">
              {text}
            </Alert>
          </Snackbar>
        ) : null}
        {success ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" width="100%">
              {text}
            </Alert>
          </Snackbar>
        ) : null}
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Stack display="flex" justifyContent="center" alignItems="center">
            <Typography
              sx={{ fontSize: "40px", fontFamily: "Grand Hotel" }}
              color="text.primary"
              gutterBottom
            >
              Instagram
            </Typography>
          </Stack>
          <Box
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr 1fr" },
              gap: 2,
            }}
          ></Box>
          <Stack
            mt={0}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              sx={{ width: "100%" }}
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={ariaLabel}
            />
          </Stack>
          <Stack
            mt={2}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              sx={{ width: "100%" }}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={ariaLabel}
            />
          </Stack>
          <Button
            onClick={() => postData()}
            sx={{ marginTop: "20px", fontSize: "13px" }}
            variant="contained"
            size="medium"
          >
            Login
          </Button>
          <Stack></Stack>
        </CardContent>
      </Card>
      <br></br>
      <br></br>
      <br></br>
    </Box>
  );
}

export default Signin;

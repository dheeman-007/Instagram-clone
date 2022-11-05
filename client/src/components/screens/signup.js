import React,{useEffect} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const ariaLabel = { "aria-label": "description" };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  let navigate = useNavigate();
  useEffect(() => {
    if (url) {
      postFields()
    }
  }, [url]);
  const handleClose = (event, reason) => {
    if (success) {
      setOpen(false);
      setSuccess(false);
      navigate("/signin");
    }
    if (reason === "clickaway") {
      setError(false);
      return;
    }
    setOpen(false);
    setError(false);
  };
  const postFields = () => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      setText("Invalid email");
      setOpen(true);
      setError(true);
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
        pic:url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setText(data.error);
          setOpen(true);
          setError(true);
        } else {
          setText("User Created");
          setOpen(true);
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postData = () => {
    if (image) {
      uploadPic()
    } else {
      postFields()
    }
  };
  const uploadPic = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloud_name", "dfhrkctjk");

    fetch("https://api.cloudinary.com/v1_1/dfhrkctjk/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setUrl(result.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      mt={8}
      mb={15}
      display="flex"
      justifyContent="center"
      alignItems="center"
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
      <Card
        borderRadius={5}
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
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <Stack
            mt={3}
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
          >
            <Typography sx={{ fontSize: "14px", color: "grey" }}>
              Profile Picture:
            </Typography>
            <input
              style={{ paddingLeft: "10px" }}
              type="file"
              id="avatar"
              name="profile"
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </Stack>
          <Button
            onClick={() => postData()}
            sx={{ marginTop: "20px", fontSize: "13px" }}
            variant="contained"
            size="medium"
          >
            Sign Up
          </Button>
          <Stack></Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Signup;

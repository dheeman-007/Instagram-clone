import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const ariaLabel = { "aria-label": "description" };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UpdateProfilePic = () => {
  const {state,dispatch} = useContext(UserContext)
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (url) {
      fetch("/updateprofile", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setText(data.error);
            setOpen(true);
            setError(true);
          } else {
            localStorage.setItem("user", JSON.stringify({...state,profilepic:data.profilepic}));
            dispatch({type:"UPDATEPIC",payload:data.profilepic})
            setText("Profile picture updated");
            setOpen(true);
            setSuccess(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

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
  const postDetails = () => {
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
      mt={10}
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
          minHeight: "150px",
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
          <Stack mt={3} width="100%" display="flex" flexDirection='row' justifyContent="flex-start">
            <Typography sx={{fontSize:'14px'}}>
                Choose profile:
            </Typography>
            <input
            style={{paddingLeft:'5px'}}
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </Stack>
          <Button
            sx={{ marginTop: "20px", fontSize: "10px" }}
            variant="contained"
            size="medium"
            onClick={() => postDetails()}
          >
            Save 
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

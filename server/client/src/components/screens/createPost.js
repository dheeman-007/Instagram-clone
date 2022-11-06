import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  Input,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const ariaLabel = { "aria-label": "description" };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title: title,
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
            setText("Uploaded");
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
            mt={1}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              sx={{ width: "100%" }}
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              inputProps={ariaLabel}
            />
          </Stack>
          <Stack mt={3} width="100%" display="flex" justifyContent="flex-start">
            <input
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
            Submit Post
          </Button>
          <Stack></Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

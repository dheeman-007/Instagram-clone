import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
const ariaLabel = { "aria-label": "description" };

function Home() {
  const [data, setData] = useState([]);
  const [text,setText] = useState("");
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.posts);
      });
  }, []);
  const likepost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const newData = data.map((item) => {
          if (item._id === res._id) return res;
          else return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikepost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const newData = data.map((item) => {
          if (item._id === res._id) return res;
          else return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const newData = data.map((item) => {
          if (item._id === res._id) return res;
          else return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      width="100%"
      minHeight="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      pb={3}
    >
      {data.map((item, index) => {
        return (
          <Card
            key={index}
            sx={{
              maxWidth: 365,
              width: { xs: "90%" },
              borderStyle: "solid",
              borderWidth: "3px",
              borderColor: "#700070",
              borderRadius: "10px",
              bgcolor: "#F9F1F1",
              paddingBottom: "20px",
              marginTop: "20px",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor: red[500],
                  }}
                  aria-label="recipe"
                >
                  {item.postedBy.name.toUpperCase().charAt(0)}
                </Avatar>
              }
              title={item.postedBy.name}
            />
            <CardMedia
              component="img"
              height="194"
              image={item.photo}
              alt="Paella dish"
            />
            <CardActions
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              disableSpacing
            >
              <Stack
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" flexDirection="row">
                  <FavoriteIcon
                    style={{
                      color:'red',
                      paddingTop: "8px",
                      paddingLeft: "8px",
                      fontSize: "18px",
                    }}
                  />
                  <Typography
                    style={{
                      paddingTop: "7px",
                      paddingLeft: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {item.likes.length} likes
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => likepost(item._id)}
                    style={{ color: "Black" }}
                    aria-label="add to favorites"
                  >
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => unlikepost(item._id)}
                    style={{ color: "Black" }}
                    aria-label="add to favorites"
                  >
                    <ThumbDownIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Stack>
              <Typography
                style={{ fontSize: "12px", paddingLeft: "10px" }}
                color="text.secondary"
              >
                {item.title}
              </Typography>
              <Box
                style={{ paddingLeft: "11px", width: "94%" }}
                display="flex"
                flexDirection="row"
              >
                <Input
                  style={{ fontSize: "12px", width: "100%" }}
                  placeholder="Comment"
                  inputProps={ariaLabel}
                  value={text}
                  onChange={(e)=>setText(e.target.value)}
                />
                <SendIcon
                  style={{
                    paddingLeft: "12px",
                    paddingTop: "5px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}

export default Home;

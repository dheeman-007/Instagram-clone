import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Stack, Grid } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const ariaLabel = { "aria-label": "description" };

function Feed() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => {
    fetch("/followingpost", {
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
  const deletePost = (id) => {
    fetch(`/deletepost/${id}`, {
      method: "delete",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const newData = data.filter((item) => {
          return item._id !== res._id;
        });
        setData(newData);
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
              maxWidth: 300,
              width: { xs: "90%" },
              borderStyle: "solid",
              borderWidth: "3px",
              borderColor: "#700070",
              borderRadius: "10px",
              bgcolor: "#E8D8D7",
              paddingBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Stack display="flex" flexDirection="row">
              <CardHeader
                onClick={() =>
                  item.postedBy._id === state._id
                    ? navigate("/profile")
                    : navigate(`/profile/${item.postedBy._id}`)
                }
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: red[500],
                    }}
                    aria-label="recipe"
                  >
                    {item.postedBy?.name?.toUpperCase().charAt(0) || "NA"}
                  </Avatar>
                }
                sx={{
                  flex: "2",
                  cursor:'pointer'
                }}
                title={item.postedBy.name}
              />
              {item.postedBy._id === state._id && (
                <Stack
                  display="flex"
                  flex="1"
                  flexDirection="row"
                  justifyContent="flex-end"
                  width="100%"
                >
                  <DeleteIcon
                    onClick={() => deletePost(item._id)}
                    sx={{ pt: "22px", pr: "14%", cursor: "pointer" }}
                  />
                </Stack>
              )}
            </Stack>
            <CardMedia
              component="img"
              height="154"
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
                      color: "red",
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
              <Box maxHeight="60px" pt={1} width="100%" overflow="auto">
                {item?.comments?.map((comment, index) => (
                  <Grid
                    sx={{
                      height: "20px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                    key={index}
                  >
                    <Typography
                      fontWeight={50}
                      style={{
                        fontSize: "10px",
                        paddingLeft: "10px",
                        fontWeight: "100px",
                      }}
                      color="text.primary"
                    >
                      {comment.postedBy.name} :
                    </Typography>
                    <Typography
                      style={{ fontSize: "10px", paddingLeft: "10px" }}
                      color="text.secondary"
                    >
                      {comment.text}
                    </Typography>
                  </Grid>
                ))}
              </Box>
              <Box
                style={{ paddingLeft: "4%", width: "92%" }}
                display="flex"
                flexDirection="row"
              >
                <form
                  style={{ width: "100%" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}
                >
                  <Input
                    style={{ fontSize: "12px", width: "100%" }}
                    placeholder="Comment"
                    inputProps={ariaLabel}
                  />
                </form>
              </Box>
            </CardActions>
          </Card>
        );
      })}
      <br></br>
      <br></br>
    </Box>
  );
}

export default Feed;

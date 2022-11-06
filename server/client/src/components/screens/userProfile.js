import React, { useContext, useState, useEffect } from "react";
import { Box, Stack, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

function UserProfile() {
  const [userprofile, setUserprofile] = useState(null);
  const [follow, setFollow] = useState(true);
  const { state, dispatch } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`/user/${id}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserprofile(res);
        const user = JSON.parse(localStorage.getItem("user"));
        res?.user?.followers?.map((item) => {
          if (item.toString() === user?._id.toString()) setFollow(false);
        });
      });
  }, [id]);
  const followuser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followingId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "UPDATE",
          payload: {
            following: res.follower.following,
            followers: res.follower.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(res.follower));
        setUserprofile((prevState) => {
          return {
            ...prevState,
            user: res.followed,
          };
        });
        setFollow(false);
      });
  };
  const unfollowuser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowingId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "UPDATE",
          payload: {
            following: res.follower.following,
            followers: res.follower.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(res.follower));
        setUserprofile((prevState) => {
          return {
            ...prevState,
            user: res.followed,
          };
        });
        setFollow(true);
      });
  };
  const theme = useTheme();
  const smBreakPoint = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      minHeight="100%"
      sx={{
        marginLeft: { xs: "2px", sm: "10%" },
        marginRight: { xs: "2px", sm: "10%" },
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        color="white"
        mt={2}
        ml="2px"
        mr="2px"
      >
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {smBreakPoint ? (
            <img
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: "#700070",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
              }}
              alt="Img"
              src={userprofile?.user?.profilepic}
            />
          ) : (
            <img
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: "#700070",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
              }}
              alt="Img"
              src={userprofile?.user?.profilepic}
            />
          )}
        </Box>
        <Box
          pl="10px"
          sx={{ flex: { xs: "2", sm: "1" } }}
          display="flex"
          flexDirection="column"
          mt="2%"
        >
          <Stack>
            <Typography
              sx={{ fontSize: { xs: "15px", sm: "27px", color: "#E4F006" } }}
              gutterBottom
            >
              {userprofile?.user?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "11px", sm: "15px", color: "#E1E385" },
                pb: "3%",
              }}
              gutterBottom
            >
              {userprofile?.user?.email}
            </Typography>
          </Stack>
          <Stack flexDirection="row" color="#E6DEDC">
            <Typography
              sx={{ fontSize: { xs: "10px", sm: "13px", color: "#F59C00" } }}
              gutterBottom
            >
              {userprofile?.post.length ? userprofile?.post.length : 0} posts
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "13px", color: "#F0E0DE" },
                marginLeft: "3%",
              }}
              gutterBottom
            >
              {userprofile?.user?.followers?.length
                ? userprofile?.user?.followers?.length
                : 0}{" "}
              followers
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "13px", color: "#4CF500" },
                marginLeft: "3%",
              }}
              gutterBottom
            >
              {userprofile?.user?.following?.length
                ? userprofile?.user?.following?.length
                : 0}{" "}
              following
            </Typography>
          </Stack>

          {follow ? (
            <Stack width="50px" mt={0.5}>
              <Button
                onClick={() => followuser()}
                sx={{ height: { xs: "18px", sm: "21px" } }}
                variant="outlined"
              >
                <Typography
                  sx={{ fontSize: { xs: "9px", sm: "10px", color: "#3EE0E1" } }}
                >
                  follow
                </Typography>
              </Button>
            </Stack>
          ) : (
            <Stack width="70px" mt={0.5}>
              <Button
                onClick={() => unfollowuser()}
                sx={{ height: { xs: "18px", sm: "21px" } }}
                variant="outlined"
              >
                <Typography
                  sx={{ fontSize: { xs: "9px", sm: "10px", color: "#3EE0E1" } }}
                >
                  unfollow
                </Typography>
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
      <br></br>
      <hr style={{ width: "90%" }}></hr>
      <Box color="white" display="flex" pl="5%" pr="5%">
        <Grid container columns={{ xs: 12, sm: 12, md: 12 }} spacing="0">
          {userprofile?.post?.map((item, index) => {
            return (
              <Grid key={index} item xs={4} sm={4} md={4}>
                {smBreakPoint ? (
                  <img
                    style={{
                      width: "100%",
                      height: "22vw",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#58FFFB",
                    }}
                    alt="Img"
                    src={item.photo}
                  />
                ) : (
                  <img
                    style={{
                      width: "100%",
                      height: "28vw",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#58FFFB",
                    }}
                    alt="Img"
                    src={item.photo}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <br></br>
      <br></br>
      <br></br>
    </Box>
  );
}

export default UserProfile;

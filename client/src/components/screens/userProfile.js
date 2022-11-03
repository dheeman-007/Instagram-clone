import React, { useEffext, useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [userposts, setUserposts] = useState(null);
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
        setUserposts(res);
      });
  }, []);
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
              src="https://cdn.pixabay.com/photo/2016/11/18/15/03/man-1835195__480.jpg"
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
              src="https://cdn.pixabay.com/photo/2016/11/18/15/03/man-1835195__480.jpg"
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
              {userposts?.user?.name}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "11px", sm: "15px", color: "#E1E385" }, pb:'3%' }}
              gutterBottom
            >
              {userposts?.user?.email}
            </Typography>
          </Stack>
          <Stack flexDirection="row" color="#E6DEDC">
            <Typography
              sx={{ fontSize: { xs: "10px", sm: "13px", color: "#F59C00" } }}
              gutterBottom
            >
              {userposts?.post.length ? userposts?.post.length : 0} posts
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "13px", color: "#F0E0DE" },
                marginLeft: "3%",
              }}
              gutterBottom
            >
              40 followers
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "13px", color: "#4CF500" },
                marginLeft: "3%",
              }}
              gutterBottom
            >
              40 following
            </Typography>
          </Stack>
        </Box>
      </Box>
      <br></br>
      {smBreakPoint ? (
        <hr style={{ width: "90%" }}></hr>
      ) : (
        <hr style={{ width: "90%" }}></hr>
      )}
      <Box color="white" display="flex" pl="5%" pr="5%">
        <Grid container columns={{ xs: 12, sm: 12, md: 12 }} spacing="0">
          {userposts?.post?.map((item, index) => {
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
    </Box>
  );
}

export default UserProfile;

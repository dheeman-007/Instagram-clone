import React, { useContext, useEffect } from "react";
import { Box, Typography, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Navbar() {
  let navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const theme = useTheme();
  const smBreakPoint = useMediaQuery(theme.breakpoints.up("sm"));
  const [profile, setProfile] = React.useState(false);
  const [signin, setSignin] = React.useState(false);
  const [signup, setSignup] = React.useState(false);
  const [createpost, setCreatepost] = React.useState(false);
  const [logout, setLogout] = React.useState(false);

  useEffect(() => {
    if (state) {
      setProfile(true);
      setCreatepost(true);
      setLogout(true);
      setSignin(false);
      setSignup(false);
    } else {
      setProfile(false);
      setCreatepost(false);
      setLogout(false);
      setSignin(true);
      setSignup(true);
    }
  }, [state]);

  return (
    <>
      <Box display="flex" flexDirection="row" color="#EF9BCD" pl="4%" pr="1%">
        <Stack flex="1">
          <Typography
            style={{
              paddingTop: "5%",
              cursor: "pointer",
              fontFamily: "Grand Hotel",
              fontSize: "30px",
            }}
            onClick={() => (state ? navigate("/") : navigate("/signin"))}
            variant="h6"
          >
            Instagram
          </Typography>
        </Stack>
        <Stack
          flex="2"
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          pb={1.8}
        >
          {signin ? (
            <Box
              sx={{ width: { xs: "40px", sm: "60px" } }}
              onClick={() => navigate("/signin")}
            >
              {smBreakPoint ? (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#BE2881",
                  }}
                >
                  Sign In
                </Typography>
              ) : (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "10px",
                    color: "#BE2881",
                  }}
                >
                  Sign In
                </Typography>
              )}
            </Box>
          ) : null}
          {signup ? (
            <Box
              sx={{ width: { xs: "50px", sm: "80px" } }}
              onClick={() => navigate("/signup")}
            >
              {smBreakPoint ? (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#BE2881",
                  }}
                >
                  Sign Up
                </Typography>
              ) : (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "10px",
                    color: "#BE2881",
                  }}
                >
                  Sign Up
                </Typography>
              )}
            </Box>
          ) : null}
          {profile ? (
            <Box
              sx={{ width: { xs: "32px", sm: "60px" } }}
              onClick={() => navigate("/profile")}
            >
              {smBreakPoint ? (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#BE2881",
                  }}
                >
                  Profile
                </Typography>
              ) : (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "10px",
                    color: "#BE2881",
                  }}
                >
                  Profile
                </Typography>
              )}
            </Box>
          ) : null}
          {createpost ? (
            <Box
              sx={{ width: { xs: "55px", sm: "80px" } }}
              onClick={() => navigate("/createpost")}
            >
              {smBreakPoint ? (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#BE2881",
                  }}
                >
                  Create post
                </Typography>
              ) : (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "10px",
                    color: "#BE2881",
                  }}
                >
                  Create post
                </Typography>
              )}
            </Box>
          ) : null}
          {logout ? (
            <Box
              pl="1%"
              sx={{ width: { xs: "40px", sm: "80px" } }}
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                navigate("/signin");
              }}
            >
              {smBreakPoint ? (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#BE2881",
                  }}
                >
                  Logout
                </Typography>
              ) : (
                <Typography
                  style={{
                    cursor: "pointer",
                    fontSize: "10px",
                    color: "#BE2881",
                  }}
                >
                  Logout
                </Typography>
              )}
            </Box>
          ) : null}
        </Stack>
      </Box>
    </>
  );
}

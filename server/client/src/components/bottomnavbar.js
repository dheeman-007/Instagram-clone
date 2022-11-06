import * as React from "react";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PublicIcon from "@mui/icons-material/Public";
import PersonIcon from "@mui/icons-material/Person";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Bottomnavbar() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div>
      {state && (
        <AppBar
          position="fixed"
          sx={{
            display: "flex",
            flexDirection: "row",
            bgcolor: "black",
            height: "35px",
            top: "auto",
            bottom: "0",
            width: "100%",
            alignItems: "center",
            justifyContent:'center'
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              bgcolor: "black",
              height: "35px",
              top: "auto",
              bottom: "0",
              width: {xs:"100%",sm:'70%'},
              alignItems: "center",
            }}
          >
            <Stack flex="1">
              <IconButton color="inherit" onClick={() => navigate("/feed")}>
                <RssFeedIcon />
              </IconButton>
            </Stack>
            <Stack flex="1">
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
            </Stack>
            <Stack flex="1">
              <IconButton
                color="inherit"
                onClick={() => navigate("/createpost")}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <Stack flex="1">
              <IconButton color="inherit" onClick={() => navigate("/")}>
                <PublicIcon />
              </IconButton>
            </Stack>
            <Stack flex="1">
              <IconButton color="inherit" onClick={() => navigate("/profile")}>
                <PersonIcon />
              </IconButton>
            </Stack>
          </Box>
        </AppBar>
      )}
    </div>
  );
}

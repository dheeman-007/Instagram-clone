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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Bottomnavbar() {
  const { state, dispatch } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSearch("")
    setUsers([])
    setOpen(false);
  };

  const fetchUser = (key) => {
    setSearch(key);
    fetch("/search", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: key,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
        console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
            height: "45px",
            top: "auto",
            bottom: "0",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
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
              width: { xs: "100%", sm: "70%" },
              alignItems: "center",
            }}
          >
            <Stack flex="1">
              <IconButton color="inherit" onClick={() => navigate("/feed")}>
                <RssFeedIcon />
              </IconButton>
            </Stack>
            <Stack flex="1">
              <IconButton color="inherit" onClick={handleClickOpen}>
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

          <Dialog open={open} onClose={handleClose} sx={{ bgcolor: "black" }}>
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              <Stack display="flex" flexDirection="row">
                <InputBase
                  placeholder="Search user"
                  value={search}
                  onChange={(e) => fetchUser(e.target.value)}
                />
                <IconButton
                  type="button"
                  sx={{ pr: "0px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <List>
                <Divider />
                {users.map((item, index) => {
                  return (
                    <>
                      <ListItem
                        button
                        onClick={() => {
                          item._id === state._id
                            ? navigate("/profile")
                            : navigate(`/profile/${item._id}`);
                          handleClose();
                        }}
                      >
                        <img
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                          }}
                          alt="Img"
                          src={item?.profilepic}
                        />
                        <Stack pl="10%">
                          <Typography
                            color="text.secondary"
                            sx={{ fontSize: "10px" }}
                          >
                            {item?.name}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            sx={{ fontSize: "10px" }}
                          >
                            {item?.email}
                          </Typography>
                        </Stack>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
              </List>
            </DialogContent>
          </Dialog>
        </AppBar>
      )}
    </div>
  );
}

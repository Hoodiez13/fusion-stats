import React, { useState } from "react";
import {
  Menu,
  Box,
  AppBar,
  Toolbar,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router";

const AppNav = () => {
  const history = useHistory();

  const [anchor, setAnchor] = useState(null);

  const open = Boolean(anchor);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (route) => {
    setAnchor(null);
    if (route) {
      history.push("/raid/" + route);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/fusion-stats");
            }}
            variant="h6"
            color="inherit"
            component="div"
          >
            Home
          </Typography>
          <div style={{ width: 16 }}></div>
          <div>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={handleClick}
              variant="h6"
              color="inherit"
              component="div"
            >
              Raids
            </Typography>
            <Menu
              elevation={0}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorEl={anchor}
              open={open}
              onClose={() => {
                handleClose(null);
              }}
            >
              <div style={{ height: 8 }}></div>
              <span style={{ fontWeight: 500, fontSize: 18 }}>
                25 Man Raids
              </span>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                onClick={() => {
                  handleClose("X");
                }}
              >
                Raid X
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose("Y");
                }}
              >
                Raid Y
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose("SR");
                }}
              >
                Speedrun
              </MenuItem>
              <div style={{ height: 8, width: 200 }}></div>
              <span style={{ fontWeight: 500, fontSize: 18 }}>
                20 Man Raids
              </span>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                onClick={() => {
                  handleClose("ZG");
                }}
              >
                ZulGurub
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose("AQ20");
                }}
              >
                AQ20
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppNav;

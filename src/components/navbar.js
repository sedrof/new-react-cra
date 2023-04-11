import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  LinearProgress,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.api);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {isAuthenticated ? (
        // <div className="profile">
        <React.Fragment>
          <IconButton
            size="xlarge"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{
              size: "large",
              fontSize: "40px",
              width: "40px",
              height: "40px",
            }}
            style={{
              color: "#2ca58d",
            }}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            PaperProps={{
              style: {
                width: "10%",
                marginTop: "10px",
              },
            }}
            MenuListProps={{
              style: {
                display: "flex",
                flexDirection: "column",
              },
            }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
              width: "20%",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <NavLink className="nav-link-profile" to="/profile">
              <Typography
                    style={{
                      fontFamily: "GT Walsheim",
                    }}
                  >
                    Profile
                </Typography>
                
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography
                style={{
                  fontFamily: "GT Walsheim",
                }}
              >
                LogOut
              </Typography>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
          </Menu>
        </React.Fragment>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default Navbar;

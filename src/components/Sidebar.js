import React from "react";

import "styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ContactsIcon from '@mui/icons-material/Contacts';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import { logout } from "features/user";
import logo from "../images/logo.png";
//pt-5 position-fixed h-100 dashboard-sidebar col-sm-3
const Sidebar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const authLinks = (
    <>
      <a href="/" className="logo">
        <img src={logo} className="small-logo" />
      </a>
      <List>
        <NavLink className="nav-link" to="/" activeClassName="active">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </NavLink>
        <NavLink className="nav-link" to="/List" activeClassName="active">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>
        </NavLink>
        <NavLink className="nav-link" to="/UploadFile" activeClassName="active">
          <ListItem button>
            <ListItemIcon>
              <UploadFileRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Upload" />
          </ListItem>
        </NavLink>
        <NavLink className="nav-link" to="/FAQ" activeClassName="active">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItem>
        </NavLink>
        <NavLink className="nav-link" to="/Contacts" activeClassName="active">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItem>
        </NavLink>
        <NavLink onClick={() => dispatch(logout())} className="nav-link" to="/">
          <ListItem>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </NavLink>
      </List>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/#">
          Register
        </NavLink>
      </li>
    </>
  );
  return (
      <div >
        {isAuthenticated ? authLinks : guestLinks}
      </div>
  );
};

export default Sidebar;

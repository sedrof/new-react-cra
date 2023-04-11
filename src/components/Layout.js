import React from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "components/Sidebar";
import { LinearProgress, CircularProgress, Alert } from "@mui/material";
import "styles/Navbar.css";
import Navbar from "./navbar";

const Layout = ({ title, content, children }) => {
  const { loading, uploadStatus } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>
      {loading && <LinearProgress color="success" />}
      
      <div className="profile">
        <Navbar />
      </div>
      <div className="child1">
        <Sidebar />
      </div>
      <div className="child">{uploadStatus && (
       <Alert style={{ width:'60%'}} variant="filled" severity="success">File Uploaded successfully</Alert>
      )}{children}</div>
    </React.Fragment>
  );
};

export default Layout;

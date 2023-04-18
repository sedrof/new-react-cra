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
      {uploadStatus && (
        <div className="card">
          <div className="card-header">Uploading file</div>
          <div className="card-body">
            <div className="progress-bar"></div>
          </div>
        </div>
      )}
      <div className="profile">
        <Navbar />
      </div>
      <div className="child1">
        <Sidebar />
      </div>
      <div className="child">{children}</div>
    </React.Fragment>
  );
};

export default Layout;

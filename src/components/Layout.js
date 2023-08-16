import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import Sidebar from "components/Sidebar";
import Navbar from "./navbar";
import "../styles/Navbar.css";

const Layout = ({ title, content, children }) => {
  const { loading, uploadStatus, downloadPDFs } = useSelector((state) => state.api);

  const renderProgressBar = () => {
    if (uploadStatus || downloadPDFs) {
      return (
        <div className="card">
          <div className="card-header">{uploadStatus ? 'Uploading file' : 'Downloading file'}</div>
          <div className="card-body">
            <div className="progress-bar"></div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>
      {loading && <LinearProgress color="success" />}
      {renderProgressBar()}
      <div className="profile">
        <Navbar />
      </div>
      <div className="side-bar-parent">
        <Sidebar />
      </div>
      <div className="main">{children}</div>
    </React.Fragment>
  );
};

export default Layout;

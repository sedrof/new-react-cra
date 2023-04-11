import * as React from "react";
import { useSelector } from "react-redux";

import { NavLink, Navigate } from "react-router-dom";
import Layout from "components/Layout";
import ReactPlayer from "react-player";
import { Paper, Breadcrumbs, Typography } from "@mui/material";
import "../styles/faq.css";
import "styles/breadcrumb.css";

function VideoPlayer() {
  return (
      <div className="video-container">
        <ReactPlayer
          url={"https://www.dailymotion.com/video/k16NnCyUWHDXjEz0aJF"}
          width="30vw"
          height="20vw"
          controls={true}
        />
      </div>
  );
}

export default function Faq() {
  const [expandedIndex, setExpandedIndex] = React.useState(null);
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  function handleQuestionClick(index) {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  }
  if (!isAuthenticated) return <Navigate to="/" />;
  return (
    <Layout title="FAQ." content="FAQ">
      <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="nav-link-faq" to="/">
            Home
          </NavLink>
          <Typography color="text.primary">FAQ</Typography>
        </Breadcrumbs>
      </div>
      <div className="faq-container">
        <div className="video-player">
          <VideoPlayer />
        </div>
        <div className="faq-section-container">
        <div className="faq-section">
          <div
            className="faq-question-container"
            onClick={() => handleQuestionClick(0)}
          >
            <div className="faq-question">Who can access the website?</div>
            <div className="faq-toggle-button">
              {expandedIndex === 0 ? "-" : "+"}
            </div>
          </div>
          {expandedIndex === 0 && (
            <div className="faq-answer-container">
              <div className="faq-answer">
                Only users with a username and password provided by the website
                administrator can access the website.
              </div>
            </div>
          )}
        </div>
        <div className="faq-section">
          <div
            className="faq-question-container"
            onClick={() => handleQuestionClick(1)}
          >
            <div className="faq-question">
              Can users register for an account?
            </div>
            <div className="faq-toggle-button">
              {expandedIndex === 1 ? "-" : "+"}
            </div>
          </div>
          {expandedIndex === 1 && (
            <div className="faq-answer-container">
              <div className="faq-answer">
                No, users cannot register for an account. The website
                administrator creates usernames and passwords for users.
              </div>
            </div>
          )}
        </div>
        <div className="faq-section">
          <div
            className="faq-question-container"
            onClick={() => handleQuestionClick(2)}
          >
            <div className="faq-question">Can users change their password?</div>
            <div className="faq-toggle-button">
              {expandedIndex === 2 ? "-" : "+"}
            </div>
          </div>
          {expandedIndex === 2 && (
            <div className="faq-answer-container">
              <div className="faq-answer">
                Yes, users can change their password. Navigate to{" "}
                <NavLink to="/profile"> Profile</NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="faq-section">
          <div
            className="faq-question-container"
            onClick={() => handleQuestionClick(3)}
          >
            <div className="faq-question">
              What can users do on the website?
            </div>
            <div className="faq-toggle-button">
              {expandedIndex === 3 ? "-" : "+"}
            </div>
          </div>
          {expandedIndex === 3 && (
            <div className="faq-answer-container">
              <div className="faq-answer">
                Users can create new transactions by entering inputs into a
                form. When they save, the website will calculate the new CRA
                rates and household rent and display them in a table. Users can
                also edit transactions they have created and upload a CSV or
                XLSX file containing data for the website to calculate. Users
                can bulk download results as a PDF or CSV, as well as bulk
                delete transactions they have created.
              </div>
            </div>
          )}
        </div>
        <div className="faq-section">
          <div
            className="faq-question-container"
            onClick={() => handleQuestionClick(4)}
          >
            <div className="faq-question">
              Who can edit and delete transactions?
            </div>
            <div className="faq-toggle-button">
              {expandedIndex === 4 ? "-" : "+"}
            </div>
          </div>
          {expandedIndex === 4 && (
            <div className="faq-answer-container">
              <div className="faq-answer">
                Only the user who created the transaction can edit and delete
                it.
              </div>
            </div>
          )}
        </div>
        <div className="faq-section">
          <div
            className="faq-question-container"
            onClick={() => handleQuestionClick(5)}
          >
            <div className="faq-question">
              How secure is my data on the website?
            </div>
            <div className="faq-toggle-button">
              {expandedIndex === 5 ? "-" : "+"}
            </div>
          </div>
          {expandedIndex === 5 && (
            <div className="faq-answer-container">
              <div className="faq-answer">
                The website uses industry-standard security measures to protect
                your data. However, please be aware that no system is completely
                secure and there is always a risk of unauthorized access. It is
                recommended that you use strong, unique passwords and keep your
                login information confidential.
              </div>
            </div>
          )}
        </div>
        <div class="api-docs-container">
          <h2>API Documentation</h2>
          <p>
            For developers, we offer a comprehensive API that allows you to
            interact with our service programmatically. Our API documentation
            provides detailed information on how to get started, authentication,
            available endpoints, and response formats. Please refer to the{" "}
            <a href="https://cra-calc.azurewebsites.net/api-documentation/">API documentation</a> for more
            information.
          </p>
        </div>
      </div>
      </div>
    </Layout>
  );
}

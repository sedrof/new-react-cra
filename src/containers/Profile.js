import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import "styles/profile.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink, Navigate } from "react-router-dom";
import Layout from "components/Layout";
import { Typography } from "@mui/material";
import { changePassword } from "features/user";
import emailz from "../assets/530.jpg";

export default function Profile() {
  const [activeLink, setActiveLink] = React.useState("link1");
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.user);
  const email = userState ? userState.email : null;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  React.useEffect(() => {
    setActiveLink("link1");
  }, []);

  const renderContent = () => {
    if (activeLink === "link1") {
      return (
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "90%",
            padding: "24px",
            fontSize: "18px",
            fontFamily: "GT Walsheim",
            display: "flex",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <div style={{ flex: 1 }}>
            <p>{email}</p>
          </div>
          <div style={{ flex: 1, textAlign: "right" }}>
            <img src={emailz} alt="calculator" style={{ height: "130px" }} />
          </div>
        </div>
      );
    } else if (activeLink === "link2") {
      return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 rounded bg-white shadow-sm"
        >
          <div  className="form-group">
            <label htmlFor="oldPassword">Old Password:</label>
            <div style={{width:'30%', textAlign:'center'}} className="input-group">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                className="form-control"
                {...register("oldPassword", { required: true })}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <VisibilityOffIcon size={20} />
                  ) : (
                    <VisibilityIcon size={20} />
                  )}
                </span>
              </div>
            </div>
            {errors.oldPassword && (
              <p className="text-danger">This field is required</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <div style={{width:'30%', textAlign:'center'}} className="input-group">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="form-control"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot exceed 20 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    message:
                      "Password must contain at least one lowercase letter, one uppercase letter, and one number",
                  },
                })}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <VisibilityOffIcon size={20} />
                  ) : (
                    <VisibilityIcon size={20} />
                  )}
                </span>
              </div>
            </div>
            {errors.newPassword && (
              <p className="text-danger">{errors.newPassword.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div style={{width:'30%', textAlign:'center'}} className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="form-control"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                })}
              />

              <div className="input-group-append">
                <span
                  className="input-group-text"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon size={20} />
                  ) : (
                    <VisibilityIcon size={20} />
                  )}
                </span>
              </div>
            </div>

            {errors.confirmPassword && (
              <p className="text-danger">Password missmatch</p>
            )}

            <button
              type="submit"
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#2ca58d",
                color: "white",
                border: "none",
              }}
            >
              Change Password
            </button>
          </div>
        </form>
      );
    }
  };
  if (!isAuthenticated) return <Navigate to="/" />;
  const onSubmit = (data) => {
    data["email"] = email;
    // console.log(data);
    dispatch(changePassword(data)).then((res) => {
      // console.log(res);
      if (res["type"] === "users/ChangePassword/fulfilled") {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setActiveLink("link1");
          setShowSuccessMessage(false);
        }, 6000);
      }
    });
  };
  return (
    <Layout title="Profile" content="Profile">
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="nav-link-faq" to="/">
            Home
          </NavLink>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
      </div>
      {showSuccessMessage && (
        <div style={{ color: "green" }}>Password Updated successfully!</div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "10%",
          justifyContent: "space-around",
        }}
      >
        <NavLink
          className={activeLink === "link1" ? "active-link" : "normal-link"}
          to="#"
          onClick={() => handleLinkClick("link1")}
        >
          <Typography
            className={activeLink === "link1" ? "active-link" : "normal-link"}
            style={{
              fontSize: "1rem",
              fontWeight: "semibold",
              color: `${activeLink === "link1" ? "#2ca58d" : "black"}`,
              fontFamily: "GT Walsheim",
            }}
          >
            Profile
          </Typography>
        </NavLink>
        <NavLink
          className={activeLink === "link2" ? "active-link" : "normal-link"}
          to="#"
          onClick={() => handleLinkClick("link2")}
        >
          <Typography
            className={activeLink === "link1" ? "active-link" : "normal-link"}
            style={{
              fontSize: "1rem",
              fontWeight: "semibold",
              color: `${activeLink === "link2" ? "#2ca58d" : "black"}`,
              fontFamily: "GT Walsheim",
            }}
          >
            Password Change
          </Typography>
        </NavLink>
      </div>
      <hr />
      {renderContent()}
    </Layout>
  );
}

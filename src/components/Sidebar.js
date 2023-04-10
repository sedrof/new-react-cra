import "styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "features/user";
import logo from "../images/logo.png";
//pt-5 position-fixed h-100 dashboard-sidebar col-sm-3
const Sidebar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const authLinks = (
    <>
      <li className="navbar-item">
        <a href="/" className="logo">
          <img src={logo} className="small-logo" />
        </a>
        <NavLink className="nav-link" to="/">
          Home
          <span className="svg-span">
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69"
              />
            </svg>
          </span>
        </NavLink>
        <NavLink className="nav-link" to="/List">
          Transactions
          <span className="svg-span">
            <svg fill="none" viewBox="0 0 15 15" height="1.5em" width="1.5em">
              <path
                fill="currentColor"
                d="M4.5 6.995H4v1h.5v-1zm6 1h.5v-1h-.5v1zM4.5 9.5H4v.5h.5v-.5zm6 0v.5h.5v-.5h-.5zm-6-4V5H4v.5h.5zm6 0h.5V5h-.5v.5zm3-2h.5v-.207l-.146-.147-.354.354zm-3-3l.354-.354L10.707 0H10.5v.5zm-6 7.495h6v-1h-6v1zM4.5 10h6V9h-6v1zm0-4h6V5h-6v1zm8 8h-10v1h10v-1zM2 13.5v-12H1v12h1zm11-10v10h1v-10h-1zM2.5 1h8V0h-8v1zm7.646-.146l3 3 .708-.708-3-3-.708.708zM2.5 14a.5.5 0 01-.5-.5H1A1.5 1.5 0 002.5 15v-1zm10 1a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM2 1.5a.5.5 0 01.5-.5V0A1.5 1.5 0 001 1.5h1zm2 4v4h1v-4H4zm3 0v4h1v-4H7zm3 0v4h1v-4h-1zM4 4h3V3H4v1zm4 8h3v-1H8v1z"
              />
            </svg>
          </span>
        </NavLink>
        <NavLink className="nav-link" to="/UploadFile">
          Upload File
          <span className="svg-span">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1.7em"
              width="1.7em"
            >
              <path d="M518.3 459a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z" />
              <path d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0152.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 01-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z" />
            </svg>
          </span>
        </NavLink>
        <NavLink className="nav-link" to="/FAQ">
          FAQ
          <span className="svg-span">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1.7em"
              width="1.7em"
            >
              <path d="M20.5 14.5V16H19v-1.5h1.5m-2-5H17V9a3 3 0 013-3 3 3 0 013 3c0 .97-.5 1.88-1.29 2.41l-.3.19c-.57.4-.91 1.01-.91 1.7v.2H19v-.2c0-1.19.6-2.3 1.59-2.95l.29-.19c.39-.26.62-.69.62-1.16A1.5 1.5 0 0020 7.5 1.5 1.5 0 0018.5 9v.5M9 13c2.67 0 8 1.34 8 4v3H1v-3c0-2.66 5.33-4 8-4m0-9a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1m0-9A2.1 2.1 0 006.9 8 2.1 2.1 0 009 10.1 2.1 2.1 0 0011.1 8 2.1 2.1 0 009 5.9z" />
            </svg>
          </span>
        </NavLink>
        <NavLink
          className="nav-links"
          to="/#"
          onClick={() => dispatch(logout())}
        >
          Logout
          <span className="svg-span">
            <svg
              className="svg-side"
              viewBox="0 0 900 1000"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path d="M502 850V750h98v100c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 876.667 0 850V150c0-28 10-51.667 30-71s43.333-29 70-29h400c28 0 51.667 9.667 71 29s29 43 29 71v150h-98V150H100v700h402m398-326L702 720V600H252V450h450V330l198 194" />
            </svg>
          </span>
        </NavLink>
      </li>
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
    <div id="sidebar" className="position-fixed h-100 dashboard-sidebar ">
      <ul className="list-unstyled components">
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

export default Sidebar;

import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import Layout from "components/Layout";
import "styles/HomePage.css";
import upload from "../assets/upload.jpg";
import myPic from "../assets/trans.jpg";


const HomePage = () => {
  const date = new Date();
  const hour = date.getHours() % 12 || 12;
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }
  return (
    <Layout title="CRA HomePage." content="HomePage">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div
          style={{
            width: "50%",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "24px",
              fontFamily: "GT Walsheim",
              fontSize: "18px",
              marginBottom: "16px",
              marginTop: "30px",
            }}
          >
            Hi {user?.email}, welcome to the CRA Online Calculator!
          </div>
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              width: "150%",
              padding: "24px",
              fontSize: "14px",
              fontFamily: "GT Walsheim",
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <div style={{ flex: 1 }}>
              <p>
                Welcome to our online calculator! Create your first transaction
                and let us do the calculations for you. Our FAQ page is here to
                help if you need it. Start managing your CRA and household rent
                now!
              </p>
              <NavLink to="/list">
              <button
                style={{
                  backgroundColor: "#2ca58d",
                  color: "white",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  marginTop: "16px",
                  border: "none",
                  fontSize: "18px",
                }}
              >
                Get Started
              </button>
              </NavLink>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <img src={myPic} alt="calculator" style={{ height: "130px" }} />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              width: "150%",
              padding: "24px",
              fontSize: "14px",
              fontFamily: "GT Walsheim",
              display: "flex",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <div style={{ flex: 1 }}>
              <p>
                Upload your data easily and let the system do the calculations
                for you! Simply upload a CSV or XLSX file, and our system will
                save your data and calculate the CRA and household rent for you.
                First time uploading? Check out our instructions on the upload
                page!
              </p>
              <NavLink to="/UploadFile">
              <button
                style={{
                  backgroundColor: "#2ca58d",
                  color: "white",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  marginTop: "16px",
                  border: "none",
                  fontSize: "18px",
                }}
              >
                Get Started
              </button>
              </NavLink>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <img
                src={upload}
                alt="calculator"
                style={{ height: "130px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

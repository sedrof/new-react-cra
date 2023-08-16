import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { array, object } from "yup";
import * as Yup from "yup";
import { Button, Typography, Stack, Alert } from "@mui/material";
import Layout from "components/Layout";
import ParseXlsx from "./ParseXlsx";
import "styles/HomePage.css";
import { uploadTransactions, setUploadStatus } from "features/api";
import ErrorModal from "components/ErrorModal";
import myFile from "../assets/file.xlsx";
import myPic from "../assets/download.png";

const ParseFile = (props) => {
  const [openz, setOpenz] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const [showResponseMessage, setShowResponseMessage] = React.useState("");
  const [isFailResponse, setIsFailResponse] = React.useState(false);
  const [isSuccessResponse, setIsSuccessResponse] = React.useState(false);

  const handleChildChange = (newValue) => {
    setOpenz(newValue);
  };

  const ErrorAlert = (errors, openz) => {
    if (Object.values(errors.errors).length > 0) {
      return (
        <Stack
          sx={{
            width: "100%",
            transform: "translateY(-98px)",
            marginTop: "50px",
          }}
          spacing={2}
        >
          {
            <Alert severity="error">
              <Typography>The uploaded file has some errors</Typography>

              <Button
                onClick={() => {
                  setOpenz(true);
                }}
              >
                <Typography>Check Errors</Typography>
              </Button>
            </Alert>
          }
        </Stack>
      );
    } else {  
      return <></>;
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;
  
  const singleKids = [
    "tenant",
    "dc-lt 13y",
    "dc-13-15 years",
    "16-19 y sec. st. or",
    "dc-in app. child care or",
  ];
  const coupleKids = [
    "tenant",
    "partner",
    "dc-lt 13y",
    "dc-13-15 years",
    "16-19 y sec. st. or",
    "dc-in app. child care or",
  ];
  return (
    <Layout title="UploadPage." content="Upload">
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="nav-link-faq" to="/">
            Home
          </NavLink>
          <Typography color="text.primary">Uploading Section</Typography>
        </Breadcrumbs>
      </div>
      <Formik
        initialValues={{ files: [] }}
        validationSchema={object({
          files: array(
            object({
              transaction_chp_reference: Yup.string()
                .required("required")
                .min(4, "at least 4 chars")
                .max(50),
              transaction_property_market_rent: Yup.number()
                .required("required")
                .positive("positive required for market rent")
                .min(1, "min 1")
                .max(10000, " max 10000"),
              transaction_income_period: Yup.string().required("required"),
              transaction_rent_effective_date:
                Yup.date("required").required("required"),
              family_group_name: Yup.string().lowercase()
                .oneOf(
                  ["fg_1", "fg_2", "fg_3", "fg_4", "fg_5"],
                  "FG_Name should be one of FG_1, FG_2, FG_3, FG_4, FG_5"
                )
                .required("required"),
              family_group_family_type: Yup.string("family_type required").lowercase()
                .oneOf(
                  [
                    "single",
                    "couple",
                    "single 1-2 kids",
                    "couple 1-2 kids",
                    "single 3+ kids",
                    "couple 3+ kids",
                    "single sharer",
                  ],
                  "FG_Type should be one of Single, Couple, Single 1-2 kids, Couple 1-2 kids, Single 3+ kids, Couple 3+ kids, Single Sharer"
                )
                .required("required"),
              family_group_last_rent: Yup.number("last rent must be number")
                .positive("must be positive last_rent")
                .required("required"),
              family_member_name:
                Yup.string("name is required").required("required"),
              family_member_relationship: Yup.string(
                "relationship mut be string"
              ).lowercase()
                .oneOf(
                  [
                    "tenant",
                    "partner",
                    "dc-lt 13y",
                    "dc-13-15 years",
                    "16-19 y sec. st. or",
                    "dc-in App. child care org 0-19y",
                    "others",
                  ],
                  "FM_Relation should be one of Tenant, Partner, DC-LT 13Y, DC-13-15 years, 16-19 Y Sec. St. or, DC-In App. Child Care Org 0-19Y, Others"
                )
                .required("required"),
              family_member_date_of_birth:
                Yup.date("date").required("required"),
              family_member_income: Yup.number("must be a number"),
            })
          ).test(
            "unique-household",
            "Household must be unique",
            function (value) {
              const householdMap = value.reduce((map, obj) => {
                const key = `${obj.transaction_chp_reference}-${obj.family_group_name}`;
                if (key in map) {
                  map[key].push(obj);
                } else {
                  map[key] = [obj];
                }
                return map;
              }, {});
              let hasError = false;
              let errMsg = "";
              for (const key in householdMap) {
                const household = householdMap[key];
                const relationships = household.map(
                  (obj) => obj.family_member_relationship.toLowerCase()
                );
                const familyGroupFamilyTypeSet = new Set(
                  household.map((obj) => obj.family_group_family_type.toLowerCase())
                );
                if (
                  familyGroupFamilyTypeSet.has("single") &&
                  household.length !== 1
                ) {
                  errMsg = householdMap[key][0].transaction_chp_reference;
                  // console.log("first");
                  hasError = true;
                  break;
                }
                if (
                  familyGroupFamilyTypeSet.has("single sharer") &&
                  household.length !== 1 &&
                  relationships.every((r) => ["tenant", "others"].includes(r))
                ) {
                  errMsg = householdMap[key][0].transaction_chp_reference;
                  // console.log("first");
                  hasError = true;
                  break;
                }
                if (
                  familyGroupFamilyTypeSet.has("couple") &&
                  household.length !== 2 &&
                  relationships.every((r) => ["tenant", "partner"].includes(r))
                ) {
                  errMsg = householdMap[key][0].transaction_chp_reference;
                  // console.log("Coule");
                  // console.log(errMsg, 'err msg');
                  hasError = true;
                  break;
                }
                if (
                  familyGroupFamilyTypeSet.has("single 1-2 kids") &&
                  relationships.every((r) => singleKids.includes(r)) &&
                  (household.length > 3 || household.length < 2)
                ) {
                  errMsg = householdMap[key][0].transaction_chp_reference;
                  // console.log("Single 1-2 kids");
                  hasError = true;
                  break;
                }
                // console.log(household.length, "household length");
                if (
                  familyGroupFamilyTypeSet.has("single 3+ kids") &&
                  relationships.every((r) => singleKids.includes(r)) &&
                  household.length < 4
                ) {
                  errMsg = householdMap[key][0].transaction_chp_reference;
                  // console.log("Single 1-2 kids");
                  hasError = true;
                  break;
                }
                if (
                  familyGroupFamilyTypeSet.has("couple 3+ kids") &&
                  relationships.every((r) => coupleKids.includes(r)) &&
                  household.length < 5
                ) {
                  errMsg = householdMap[key][0].transaction_chp_reference;
                  // console.log("Couple 3+ kids");
                  hasError = true;
                  break;
                }
                if (
                  familyGroupFamilyTypeSet.has("couple 1-2 kids") &&
                  relationships.every((r) => coupleKids.includes(r)) &&
                  (household.length > 4 || household.length < 3)
                ) {
                  errMsg = householdMap[key][0].transaction_chp_reference;
                  // console.log("Couple 1-2 kids");
                  hasError = true;
                  break;
                }
              }
              return !hasError
                ? true
                : this.createError({
                    message: `errorMessage: Transaction: ${errMsg} has a wrong familyType`,
                  });
            }
          ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const body = JSON.stringify(values["files"]);
          dispatch(uploadTransactions(body))
            .then((data) => {
              console.log(data["type"], 'data sent')
              setShowResponseMessage(data["type"]);
              if (data["type"] === "api/uploadTransactions/rejected") {
                setIsFailResponse(true);

                setTimeout(() => {
                  setIsFailResponse(false);
                  // navigate("/");
                }, 4000);
              } else {
                console.log('elseeeee')
                setIsSuccessResponse(true);
                setTimeout(() => {
                  setIsSuccessResponse(false);
                  // navigate("/");
                }
                , 4000);

              }
            })
            

          setSubmitting(false);
          // navigate("/");
        }}
      >
        {({ values, errors, isValid, isSubmitting }) => (
          <>
            {isFailResponse && (
              <div style={{ color: "red" }}>{showResponseMessage}</div>
            )}
            {isFailResponse && (
              <div style={{ color: "green" }}>{showResponseMessage}</div>
            )}
            <ErrorAlert errors={errors} />

            <div
              style={{
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                width: "80%",
                padding: "24px",
                fontSize: "14px",
                fontFamily: "GT Walsheim",
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div style={{ flex: 1 }}>
                <p>
                  Please{" "}
                  <a href={myFile} download>
                    download
                  </a>{" "}
                  the guideline CSV file provided here to ensure a successful
                  file upload that matches our system's requirements. We
                  recommend reviewing the file prior to uploading your data.
                </p>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <a href={myFile} download>
                  <img
                    src={myPic}
                    alt="calculator"
                    style={{ height: "130px" }}
                  ></img>
                </a>
              </div>
            </div>
            <Form sx={{ justifyContent: "center" }}>
              <div
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  width: "80%",
                  padding: "24px",
                  fontSize: "14px",
                  fontFamily: "GT Walsheim",
                  display: "flex",
                  alignItems: "stretch",
                  marginTop: "20px",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1 }}>
                  <ParseXlsx name="files" />
                </div>
                <div style={{ flex: 1, textAlign: "right" }}></div>
                <button
                  disabled={!isValid || isSubmitting || values["files"].length === 0 || loading || isFailResponse}
                  type="submit"
                  style={{
                    backgroundColor: values["files"].length > 0 ? "#2ca58d" : "grey",
                    color: "white",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    marginTop: "16px",
                    border: "none",
                    fontSize: "18px",
                    fontFamily: "GT Walsheim",
                    fontWeight: "900",
                    fontStyle: "normal",
                  }}
                >
                  Submit
                </button>
              </div>
            </Form>

            <>
              <ErrorModal
                openz={openz}
                handleChildChange={handleChildChange}
                errors={errors}
              />
            </>
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default ParseFile;

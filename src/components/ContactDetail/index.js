import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Navigate, NavLink } from "react-router-dom";
import {
  Grid,
  Typography,
  Breadcrumbs,
  Container,
} from "@mui/material";import "styles/contacts.css";

import "styles/breadcrumb.css";
import TenancySummaryInfo from "components/TenantSummaryInfo";
import TenantInfo from "components/TenantInfo";
import HouseholdConfig from "components/HouseholdConfig";
import PropInformation from "components/PropertyInfo";
import TenancyInfo from "components/TenancyInfo";
import Layout from "components/Layout";
import CustomPaper from "components/CustomPaper";
import { getSingleFamilymemberTransaction } from "features/api";
import ListLoading from 'components/ListLoading';

export default function ContactDetail() {
    const { isAuthenticated } = useSelector((state) => state.user);
    const { transaction_fm, loading } = useSelector((state) => state.api);

    // Provide default values for transactions and familyGroup

    const [transactionsState, setTransactionsState] = useState();
    const [familyGroupsState, setFamilyGroupsState] = useState();

    const [familyMembersState, setFamilyMembersState] = useState();

    const { ids } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch single family member transaction only if it's not already loaded
        dispatch(getSingleFamilymemberTransaction(ids))
        .then( data => {
            const { transactions, familyGroup } = data.payload;
            console.log(transactions)
            setTransactionsState(transactions);
            setFamilyGroupsState(familyGroup);

            if (familyGroup && familyGroup.length > 0) {
            setFamilyMembersState(familyGroup[0].nestedArray);
            }
        })
        .catch(error => {
            // Handle error if needed
            console.error('Error fetching data:', error);
        })
    }, [dispatch, ids]);

    // Handle loading state
    if (loading) {
        return <ListLoading />; // Replace with your loading indicator
    }

  if (!isAuthenticated) return <Navigate to="/" />;
  return (
    <Layout title="Contacts" content="Contacts">
      <div role="presentation" style={{ margin: "15px" }}>
        <Breadcrumbs
          style={{ transform: "translateX(20px)" }}
          aria-label="breadcrumb"
        >
          <NavLink className="nav-link-faq" to="/">
            Home
          </NavLink>
          <Typography color="text.primary"><NavLink className="nav-link-faq" to="/contacts">
            Contacts
          </NavLink> / Details</Typography>
        </Breadcrumbs>
      </div>
      <Container
        maxWidth="5000px"
        sx={{
          minHeight: "100vw",
          padding: "10px",
        }}
      >
        <Grid container spacing={3}  direction="row" style={{ minHeight: "90vh", marginTop: "20px" }}>

          {/* Left Item  <-----> "" Includes: TenancySummaryInfo , HouseholdConfig, TenantInfo "" */}
          <Grid item xs={12} md={12} lg={9} xl={9} sx={{ maxHeight: "50px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <CustomPaper  sx={{ padding: 10, marginRight: "10px"}}
                >
                  <TenancySummaryInfo />
                </CustomPaper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
              <CustomPaper  sx={{ padding: 16, paddingBottom: 42}}>
                    <HouseholdConfig
                    houseHold={familyGroupsState}
                    />
                </CustomPaper>
              </Grid>
              <Grid item xs={12} md={9} lg={9}>
              <CustomPaper  sx={{padding: 20 }}>
                <TenantInfo />
                </CustomPaper>
              </Grid>
            </Grid>
          </Grid>

        {/* Right Item  <-----> "" Includes: PropInformation , TenancyInfo "" */}
          <Grid item xs={12} md={12} lg={3} xl={3} sx={{ maxHeight: "50px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
              <CustomPaper
              
              sx={{ padding: 16 }}
            >
                <PropInformation
                    propertyInformation={transactionsState}
                />
                </CustomPaper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
              <CustomPaper  sx={{padding: 16, paddingBottom: 42}}>
                <TenancyInfo />
                </CustomPaper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>

  );
}

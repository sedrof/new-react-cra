import * as React from "react";
import { Typography, Grid } from "@mui/material";
import ListLoading from "components/ListLoading";

export default function PropInformation({propertyInformation}) {
  
  if (!propertyInformation) {
    return <ListLoading />; // Replace with your loading indicator or a placeholder
  }
  const { chp_reference, income_period, state, rent_effective_date, property_market_rent } = propertyInformation;
  return (
    <>
      <Grid container direction="column"
       style={{ height: "150px",
        display:'flex',
        flexWrap:'nowrap'
    }}
       >
        <Grid item sm={12} md={12} lg={12} xl={12}>
          <Grid
            container
            direction="row"
            spacing={2}
            sx={{
              transform: "translate(-60px, -60px)",
              top: "0",
            }}
          >
            <Grid justifyContent="center" item sm={12} md={12} lg={12} xl={12} sx={{
              transform: "translateY(-60px)",
            //   top: "0",
            }}>
              <Typography
                color="textPrimary"
                style={{
                  fontFamily: "GT Walsheim",
                  fontWeight: "bold",
                  fontSize: "16px",
                  whiteSpace: "nowrap",
                }}
              >
                Property Information
                
              </Typography>
            </Grid>
            <Grid item sm={12} md={12} lg={12} xl={12}
            sx={{ 
                maxWidth:'100%',
                width:'100vh'
             }}
            >
              <Typography
                sx={{
                  fontFamily: "GT Walsheim",
                  fontSize: "12px",
                  padding: "-12px 50px 50px 40px",
                  transform:'translate(20px,-40px)',
                  whiteSpace: "nowrap",
                }}
              >
                Market Rent: {property_market_rent} <br></br>
                State: {state}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xl={12} 
        sx={{ 
          transform:'translate(-60px, -60px)'
         }}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <Typography>Map</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

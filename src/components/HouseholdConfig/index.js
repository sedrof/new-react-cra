import * as React from "react";
import { Typography, Grid } from "@mui/material";
import {
  oldMan,
  oldWoman,
  disabledOld,
  woman,
  man,
  child,
  dog,
  coupleTwoChild
} from "../../assets";
import ListLoading from "components/ListLoading";

export default function HouseholdConfig(houseHold) {

  if (!houseHold) {
    return <ListLoading />; // Replace with your loading indicator or a placeholder
  }
  const { family_group_name, family_group_last_rent, family_group_type, family_group_any_inc_supp_payment, family_group_cra_amount } = houseHold;

  console.log(houseHold)
  
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
                sx={{
                  fontFamily: "GT Walsheim",
                  fontWeight: "bold",
                  fontSize: "16px",
                  whiteSpace: "nowrap",
                }}
              >
                Household Config
                
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
                <div style={{ 
              position: "relative",

           }}>
            <img src={coupleTwoChild} style={{ height: "200px", transform:'translate(-30%,-15px)' }} />
          </div>
                <h3>HH_type : {family_group_type}</h3>
                <h3>data</h3>
                <h3>data</h3>
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
              {/* <Typography>Map</Typography> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

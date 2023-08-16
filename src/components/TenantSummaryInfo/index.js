import * as React from "react";
import { Typography, Grid, Box } from "@mui/material";
import ChartComponent from "components/ChartComponent";
import {
  oldMan,
  oldWoman,
  disabledOld,
  woman,
  man,
  child,
  dog,
} from "../../assets";

export default function TenancySummaryInfo(props) {
  return (
    <>
      <Grid container direction="row" style={{ height: "100px" }}>
        <Grid item sm={12} md={4} lg={4} xl={4}>
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{
              transform: "translate(-60px, -60px)",
              top: "0",
            }}
          >
            <Grid item sm={12} md={4} lg={4} xl={4}>
              <Typography
                color="textPrimary"
                style={{
                  fontFamily: "GT Walsheim",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Tenant Summary Information:
              </Typography>
            </Grid>
            <Grid item sm={12} md={4} lg={4} xl={4}>
              <Typography
                color="textPrimary"
                style={{
                  fontFamily: "GT Walsheim",
                  textAlign: "left",
                  fontSize: "12px",
                  padding: "10px 0 10px 10px",
                }}
              >
                <h4>Rent Balance: 55</h4>
                <h4>Rent Balance: 44</h4>
                <h4>Rent Balance: 44</h4>
                <h4>Rent Balance: 34</h4>
                <h4>Rent Balance: 34</h4>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={4} lg={6} xl={6}>
          <Grid container direction="row" spacing={2}>
            <Grid
              item
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ transform: "translate(80px,-60px)" }}
            >
              <Typography
                style={{
                  fontFamily: "GT Walsheim",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Tenant balance over 12 months
              </Typography>
            </Grid>
            <Grid
              item
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                transform: "translate(-90px, -30px)",
              }}
            >
              <ChartComponent />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={4} lg={2} xl={2}>
        <Box
        position="relative"
        height={240}
        sx={{
          '& img': {
            height: '100%',
            width: 'auto',
            position: 'relative',
            bottom: -10
            // borderRadius: '8px', // Adding a slightly soft border
          },
          '& .dogImage': {
            position: 'absolute',
            bottom: 50,
            right: {
              sm: '-10px',
              md: '-20px',
              lg: '10',
            },
            width: '100px', // Adjust the width as needed to make it smaller
            height: 'auto', // To maintain the aspect ratio
            
          },
          // Adding a slightly soft border and shadow to the container Box
          borderRadius: '8px',
          // boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          transform:'translate(40px,-70px)',
          display: 'flex', // Add flex display to center images vertically
          alignItems: 'center', // Center items vertically within the Box
          flexDirection:'column'
        }}
      >
        <img src={oldMan} alt="Old Man" />
        <img className="dogImage" src={dog} alt="Dog" />
      </Box>
    </Grid>
      </Grid>
    </>
  );
}

import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import SearchBar from "material-ui-search-bar";
import FileDownloads from "./TransactionDownload";
import NewForm from "./TransactionAdd2";

const TransactionListToolbar = (props) => {
  const ids = props.ids;
  const [rand, setRand] = React.useState();

  const updateRand = (r) => {
    setRand(r);
  };

  return (
    // <ThemeProvider theme={Theme}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "row-reverse",
      }}
    >
      <NewForm />
      <Box>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{
            backgroundColor: "white",
            borderRadius: "25px",
            boxShadow:
              "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            margin: {
              xs: "10px",
            },
            width:{
              xs:'100%',
              md:'100%',
              lg:'130%',
              xl:'150%'
            },
            transform: {
              xs: "translate(-20%)",
            },
          }}
        >
          <Grid
            item
            xs={3}
            style={{
              transform: "translateY(-15px)",
            }}
          >
            <Divider
              style={{
                marginTop: "14px",
              }}
              variant="middle"
            >
              <Typography
                sx={{
                  fontFamily: "GT Walsheim",
                  fontSize:{
                    xs:'.7rem',
                    md:'.7rem',
                    lg:'.9rem',
                    xl:'1rem'
                  
                  },
                  fontWeight:{
                    xs:"200",
                  } 
                }}
              >
                Select from list below to execute
              </Typography>
            </Divider>
          </Grid>
          <Grid
            item
            sx={{
              transform: "translateY(-10px)",
            }}
          >
            <FileDownloads updateRand={updateRand} ids={ids} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid
          sx={{
            width:{
              xs:'80%',
              md:'100%',
              lg:'130%',
              xl:'150%'
            },
            transform: {
              xs: "translate( 15%)",
              md: "translateX(17%)",
              lg: "translateX(17%)",
              xl: "translateX(20%)",
            },
          }}
          container
          spacing={6}
          direction="row"
        >
          <Grid item
           xs={12} md={10} lg={10} xl={10}>
            <SearchBar
              style={{
                backgroundColor: "white",
              }}
              value={props.newSearch}
              onChange={(newValue) => props.setSearch(newValue)}
              onCancelSearch={() => props.setSearch("")}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TransactionListToolbar;

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import SearchBar from "material-ui-search-bar";
import FileDownloads from "./TransactionDownload";
import NewForm from "./TransactionAdd2";

const TransactionListToolbar = (props) => {
  const ids = props.ids;
  const [rand, setRand] = React.useState();

  const updateRand = (r) => {
    setRand(r);
  };
  const len_of_trans = ids.length;
  const selected_list = (
    <>
      <Typography
        sx={{
          marginTop: "3px",
          textAlign: "center",
          fontSize: ".6rem",
        }}
      >
        {len_of_trans} transactions selected
      </Typography>
    </>
  );
  function updateList(list){
    console.log('update list')
  }
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
        <NewForm
          updateList = {updateList} />
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
              margin:{
                xs:"10px"
              },
              transform:{
                xs:"translate(-20%)"
              }
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
                  style={{
                    fontFamily: "GT Walsheim",
                    fontWeight: "400",
                  }}
                >
                  Select from list below to execute
                </Typography>
              </Divider>
            </Grid>
            <Grid
              item
              xs={4}
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
              transform:{
                xs:"translate(-30%, 15%)",
                md:"translateX(17%)",
                lg:"translateX(17%)",
                xl:"translateX(45%)",
              } 
            }}
            container
            spacing={6}
            direction="row"
          >
            <Grid item xs="12" md="10">
              <SearchBar
              style={{
                backgroundColor:"white",
              }}
                value={props.newSearch}
                onChange={(newValue) => props.setSearch(newValue)}
                onCancelSearch={() => props.setSearch("")}
              />
              {len_of_trans > 0 && selected_list}
            </Grid>
          </Grid>
        </Box>
      </Box>
    // </ThemeProvider>
  );
};

export default TransactionListToolbar;

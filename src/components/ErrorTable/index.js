import { Typography, Grid, Paper } from "@mui/material";

const ErrorTable = ({ errors }) => {
  // console.log(errors, "errors");
  const TableBodi = (errors) => {
    if (Object.keys(errors).length > 0) {
      // console.log(errors?.errors.errors.files, "errors");
      // console.log(typeof errors?.errors.errors.files, "errorszzz");
      if (
        Array.isArray(errors?.errors.errors.files) &&
        errors?.errors.errors.files.length > 1 &&
        typeof errors?.errors.errors.files === "object"
      ) {
        return (
          <Paper
            sx={{
              width: "100%",
            }}
          >
            {errors?.errors.errors.files
              .filter((file) => file !== null && file !== undefined)
              .map((file, index) => (
                
                <Grid
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "10px",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                    fontSize: "14px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                  container
                  key={index}
                >
                  <Grid xs={1} md={1} item>
                    <Typography>Row.{errors.errors.errors.files.indexOf(file) + 2})</Typography>
                  </Grid>
                  {Object.entries(file).map(([key, value], i) => (
                    <>
                      <Grid xs={12} md={12} item key={`${key}-${i}`}>
                        <Grid
                          style={{
                            width: "100%",
                            padding: "10px",
                            margin: "10px",
                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                            fontSize: "14px",
                            display: "flex",
                            flexDirection: "row",
                          }}
                          container
                        >
                          <Grid item>
                            <Typography
                              style={{
                                fontFamily: "GT Walsheim",
                              }}
                            >
                              Field: &nbsp;{" "}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              style={{
                                fontFamily: "GT Walsheim",
                              }}
                            >
                              {key}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid xs={12} md={12} item key={`${value}-${i}`}>
                        <Grid
                          style={{
                            width: "100%",
                            padding: "10px",
                            margin: "10px",
                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                            fontSize: "14px",
                            display: "flex",
                            flexDirection: "row",
                          }}
                          container
                        >
                          <Grid item>
                            <Typography
                              style={{
                                fontFamily: "GT Walsheim",
                              }}
                            >
                              Error message: &nbsp;{" "}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              style={{
                                fontFamily: "GT Walsheim",
                              }}
                            >
                              {value}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ))}
                </Grid>
              ))}
          </Paper>
        );
      } else {
        return <>
        {JSON.stringify(errors?.errors.errors.files)}
        </>;
      }
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "GT Walsheim",
          textAlign: "center",
          color: "red",
          weight: "400",
          // marginBottom: theme.spacing(2),
        }}
      >
        Errors
      </Typography>

      <TableBodi errors={errors} />
    </>
  );
};

export default ErrorTable;

//{Object.entries(errors?.errors.errors.files[0]).map(([field, message]) => (

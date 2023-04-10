import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeProvider, makeStyles, withStyles } from "@mui/styles";
import AppPagination from "containers/PaginationComponent";
import AlertDialog from "components/AlretDialog";
import { Theme } from "theme";
import "styles/Dialog.css";

const CustomizedTableContainer = styled(TableContainer)`
  color: #2ca58d;
  '&$active': {
    color: #2ca58d,
    backgroundColor:#2ca58d,
  },
  :hover {
    color:  ##2ca58d;
  }
`;

const btn_del = {
  borderRadius: 25,
  color: "rgb(240, 243, 227)",
  backgroundColor: "#2ca58d",
  fontSize: "14px",
  width: "80%",
  marginRIght: "50%",
  fontFamily: "GT Walsheim",
};

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: "green !important",
    "&:hover": {
      backgroundColor: "green !important",
    },
  },
  root: {
    "&$checked": {
      color: "green",
    },
  },
  checked: {
    "&$checked": {
      color: "green",
    },
  },
}));

const StyledTableContainer = withStyles((theme) => ({
  root: {
    // width: "max-content",
    "&$active": {
      color: "yellow",
      backgroundColor: "yellow",
    },
    width: "100%",
    alignItems: "center",
    // transform:'translateX(20px)'
  },
}))(TableContainer);

const TransactionListResults = (props) => {
  const classes = useStyles();
  const [SelectedTransactionIds, setSelectedTransactionIds] = useState([]);
  const navigate = useNavigate();
  const { results } = useSelector((state) => state.api);

  React.useEffect(() => {
    setSelectedTransactionIds([]);
  }, [results]);

  const handleSelectAll = (event) => {
    let newSelectedTransactionIds;

    if (event.target.checked) {
      newSelectedTransactionIds = props.transactions.map(
        (transaction) => transaction.id
      );
    } else {
      newSelectedTransactionIds = [];
    }
    setSelectedTransactionIds(newSelectedTransactionIds);
    props.updateIds(newSelectedTransactionIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = SelectedTransactionIds.indexOf(id);
    let newSelectedTransactionIds = [];

    if (selectedIndex === -1) {
      newSelectedTransactionIds = newSelectedTransactionIds.concat(
        SelectedTransactionIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedTransactionIds = newSelectedTransactionIds.concat(
        SelectedTransactionIds.slice(1)
      );
    } else if (selectedIndex === SelectedTransactionIds.length - 1) {
      newSelectedTransactionIds = newSelectedTransactionIds.concat(
        SelectedTransactionIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedTransactionIds = newSelectedTransactionIds.concat(
        SelectedTransactionIds.slice(0, selectedIndex),
        SelectedTransactionIds.slice(selectedIndex + 1)
      );
    }
    setSelectedTransactionIds(newSelectedTransactionIds);
    props.updateIds(newSelectedTransactionIds);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Paper
        style={{
          // alignItems:'center',
          transform: "translateX(5%)",
        }}
        sx={{ width: "90%" }}
      >
        <Grid container>
          <Grid item xs="12" md="12">
            <CustomizedTableContainer
              sx={{
                maxHeight: 2030,
              }}
              component={Paper}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                        checked={
                          SelectedTransactionIds.length ===
                          props.transactions?.length
                        }
                        // color="green"
                        indeterminate={
                          SelectedTransactionIds?.length > 0 &&
                          SelectedTransactionIds?.length <
                            props.transactions.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>Chp Reference</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Batch</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Market Rent</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Rent Effective Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Household Rent</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Last Rent</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody selected classes={{ selected: classes.selected }}>
                  {props.transactions
                    .slice(0, props.limit)
                    .map((transaction) => (
                      <TableRow
                        hover
                        style={{
                          height: "10px",
                        }}
                        key={transaction.id}
                        selected={
                          SelectedTransactionIds?.indexOf(transaction.id) !== -1
                        }
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            classes={{
                              root: classes.root,
                              checked: classes.checked,
                            }}
                            checked={
                              SelectedTransactionIds?.indexOf(
                                transaction.id
                              ) !== -1
                            }
                            onChange={(event) =>
                              handleSelectOne(event, transaction.id)
                            }
                            value="true"
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              {transaction.chp_reference}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {transaction.batch}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {transaction.property_market_rent}
                          </Typography>{" "}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {transaction.rent_effective_date}
                          </Typography>{" "}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {transaction.household_rent}
                          </Typography>{" "}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {transaction.last_rent}
                          </Typography>{" "}
                        </TableCell>
                        <TableCell>
                          <Grid
                            container
                            style={{
                              display: "flex",
                              flexDirection:'column',
                            }}
                            spacing={1}
                          >
                            <Grid item md={0.5}>
                              <Button
                                variant="outlined"
                                style={btn_del}
                                onClick={() =>
                                  navigate(`/Update/${transaction.id}`)
                                }
                              >
                                Edit
                              </Button>
                            </Grid>
                            <Grid item md={0.5}>
                              <AlertDialog transaction={transaction} />
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CustomizedTableContainer>
          </Grid>
        </Grid>
      </Paper>
      {/* </Box> */}

      <AppPagination
        setPage={props.setPage}
        loading={props.loading}
        page={props.page}
        counts={props.counts}
      />
    </ThemeProvider>
  );
};

export default TransactionListResults;

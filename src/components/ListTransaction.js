import React, { useState, useRef } from "react";
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
  TablePagination,
  Toolbar,
  alpha,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeselectIcon from '@mui/icons-material/Deselect';
import { ThemeProvider } from "@mui/styles";
import AlertDialog from "components/AlretDialog";
import { Theme } from "theme";
import ListLoading from "./ListLoading";



const btn_del = {
  borderRadius: 25,
  color: "rgb(240, 243, 227)",
  backgroundColor: "#2ca58d",
  fontSize: "14px",
  width: "80%",
  marginRIght: "50%",
  fontFamily: "GT Walsheim",
};



function EnhancedTableToolbar 
(props) {


  const { numSelected, updateListOfIds } = props
  const handleClick = () => {
    updateListOfIds([]);

  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Transactions
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Unselect all">
          <IconButton onClick={handleClick}>
            <Typography>Unselect all</Typography> <br></br>
            <DeselectIcon  />
          </IconButton>
        </Tooltip>
      ) }
    </Toolbar>
  );
}

const TransactionListResults = (props) => {
  const [SelectedTransactionIds, setSelectedTransactionIds] = useState([]);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.api);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  
  
  const selectedTransactionIdsRef = useRef([]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

const handleSelectOne = (event, transactionId) => {
  const selectedIndex = selectedTransactionIdsRef.current.indexOf(transactionId);
  let newSelectedTransactionIds = [];

  if (selectedIndex === -1) {
    newSelectedTransactionIds = newSelectedTransactionIds.concat(selectedTransactionIdsRef.current, transactionId);
  } else if (selectedIndex === 0) {
    newSelectedTransactionIds = newSelectedTransactionIds.concat(selectedTransactionIdsRef.current.slice(1));
  } else if (selectedIndex === selectedTransactionIdsRef.current.length - 1) {
    newSelectedTransactionIds = newSelectedTransactionIds.concat(selectedTransactionIdsRef.current.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelectedTransactionIds = newSelectedTransactionIds.concat(
      selectedTransactionIdsRef.current.slice(0, selectedIndex),
      selectedTransactionIdsRef.current.slice(selectedIndex + 1),
    );
  }

  selectedTransactionIdsRef.current = newSelectedTransactionIds;
  setSelectedTransactionIds(newSelectedTransactionIds);
  props.props.updateIds(newSelectedTransactionIds);
};

const handleSelectAll = (event) => {
  const transactionsOnPage = props.transactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const newTransactionIds = transactionsOnPage.map(
    (transaction) => transaction.id
  );

  let newSelectedTransactionIds;

  if (event.target.checked) {
    newSelectedTransactionIds = [      ...SelectedTransactionIds,      ...newTransactionIds,    ];
  } else {
    newSelectedTransactionIds = [...SelectedTransactionIds];
    newTransactionIds.forEach((transactionId) => {
      const index = newSelectedTransactionIds.indexOf(transactionId);
      if (index !== -1) {
        newSelectedTransactionIds.splice(index, 1);
      }
    });
  }

  setSelectedTransactionIds(newSelectedTransactionIds);
  selectedTransactionIdsRef.current = newSelectedTransactionIds;
  props.updateIds(newSelectedTransactionIds);
};

// Function to update the count state
function updateListOfIds(newCount) {
  setSelectedTransactionIds(newCount);
}

  const visibleRows = React.useMemo(
    () =>
      props.transactions.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [props.transactions, page, rowsPerPage]
  );

  return (
    <ThemeProvider theme={Theme}>
      <Paper
        style={{
          // alignItems:'center',
          transform: "translateX(5%)",
        }}
        sx={{ width: "90%" }}
      >
        <EnhancedTableToolbar 
        updateListOfIds={updateListOfIds}
        updateIds={props.updateIds}
         numSelected={SelectedTransactionIds.length} />
        <Grid container>
          <Grid item xs="12" md="12">
            <TableContainer
              sx={{
                maxHeight: 2030,
              }}
              // component={Paper}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
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
                {!loading ? (
                  <TableBody selected>
                    {visibleRows
                      .slice(0, props.limit)
                      .map((transaction) => (
                        <TableRow
                          hover
                          style={{
                            height: "10px",
                          }}
                          key={transaction.id}
                          selected={
                            SelectedTransactionIds?.indexOf(transaction.id) !==
                            -1
                          }
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
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
                              {transaction.household_rent_field}
                            </Typography>{" "}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">
                              {transaction.last_rent_field}
                            </Typography>{" "}
                          </TableCell>
                          <TableCell>
                            <Grid
                              container
                              style={{
                                display: "flex",
                                flexDirection: "column",
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
                ) : (
                  <ListLoading />
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={props.transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              SelectProps={{ native: true }}
              sx={{
                "& .MuiTablePagination-root": {
                  backgroundColor: "lightblue", // change the row background color here
                  color:'red'
                },
                "& .MuiInputBase-root": {
                  color: "#2ca58d", // change the input field font color here
                  marginBottom:'10px'
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default TransactionListResults;

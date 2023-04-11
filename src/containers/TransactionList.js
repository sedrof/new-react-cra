import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Box, Typography } from "@mui/material";
import { useDebounce } from "use-debounce";
import TransactionListToolbar from "components/ListToolbar";
import { getTransactions } from "features/api";
import Layout from "components/Layout";
import TransactionListResults from "components/ListTransaction";
import ListLoading from "components/ListLoading";

const TransactionsListPage = (props) => {
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = React.useState([]);
  const [counts, setCount] = React.useState();
  const [ids, setIds] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [newSearch] = useDebounce(search, 1000);
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { results, count, loading } = useSelector((state) => state.api);
  const updateIds = (id) => {
    setIds(id);
  };

  React.useEffect(() => {
    dispatch(getTransactions({ page, newSearch }));
  }, [page, newSearch, results?.length]);

  React.useEffect(() => {
    setTransactions(results);
    setCount(count);
  }, [count, results, loading, transactions?.length]);

  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <Layout>
      <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="nav-link-faq" to="/">
            Home
          </NavLink>
          <Typography color="text.primary">Transactions</Typography>
        </Breadcrumbs>
      </div>
      <Box
        component="main"
        sx={{
          // flexGrow: 1,
          py: 8,
          // mt: "100px",
        }}
      >
        {/* <Container maxWidth={false}> */}
        <TransactionListToolbar
          setSearch={setSearch}
          newSearch={newSearch}
          ids={ids}
          // setRandomDelete={setRandomDelete}
        />
        <Box sx={{ mt: 3 }}>
          {loading ? (
            <ListLoading />
          ) : (
            <TransactionListResults
              updateIds={updateIds}
              loading={loading}
              transactions={transactions}
              setPage={setPage}
              page={page}
              counts={counts}
            />
          )}
        </Box>
        {/* </Container> */}
      </Box>
    </Layout>
  );
};

export default TransactionsListPage;

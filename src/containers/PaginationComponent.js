import React, { Fragment } from "react";
import { Pagination } from "@mui/material";

const AppPagination = (props) => {
  const numberOfPages = Math.ceil(props.counts / 20);
  return (
    <div>
      <Pagination
        onChange={(event, val) => {
          window.scroll(0, 0);
          props.setPage(val);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          // backgroundColor: "#2ca58d", // set background color
          '& .Mui-selected': { // set styles for selected page
            backgroundColor: "#2ca58d",
            color: "white",
            '&:hover': { // set styles for hover on selected page
              backgroundColor: "#2ca58d",
              color: "white",
            },
          },
          '& .MuiPaginationItem-page:hover': { // set styles for hover on non-selected pages
            // backgroundColor: "#2ca58d",
            color: "white",
          },
          '& .MuiPaginationItem-root': { // set border radius and margin for all pages
            borderRadius: "50%",
            margin: "0 4px",
          },
          '& .Mui-selected.MuiPaginationItem-root': { // set border radius and margin for selected page
            borderRadius: "50%",
            margin: "0 4px",
          },
        }}
        shape="rounded"
        variant="outlined"
        count={numberOfPages}
        disabled={props.loading}
      />
    </div>
  );
};

export default AppPagination;

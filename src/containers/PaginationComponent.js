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

import React, { Fragment } from "react";
import { Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const AppPagination = (props) => {
  const numberOfPages = Math.ceil(props.counts / 20);
  const dispatch = useDispatch();
  const { results, count, loading } = useSelector((state) => state.api);
  return (
    <div>
      <Pagination
        onChange={(event, val) => {
          // console.log(loading, 'val change')
          props.setPage(val);
          setTimeout(() => {
            window.scroll(1, 0);
          }, 500);
          // if( !loading){
          //   window.scroll(1, 0);
          // }
          // window.scroll(1, 0);
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

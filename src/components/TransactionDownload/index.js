import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, styled, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteTransactions, downloadCSV, downloadPDF } from "features/api";
import useScreenSize from "components/ScreenSize";

const MyButton = styled(Button)`
  &&& {
    &.Mui-disabled {
      color: grey;
      // background: white;
      borderRadius:25;
    },
    borderRadius: 25;
    color: green;
    backgroundColor: white;
    fontSize: 14px;
    // width: 80%;
    marginRIght: 50%;
    fontFamily: GT Walsheim;
  }
`;

const FileDownloads = (props) => {
  const [randomNumber, setRandom] = React.useState("1");
  const [ids, setIds] = React.useState([]);
  const dispatch = useDispatch();
  const { loading, downloadPDFs } = useSelector((state) => state.api);
  const screenSize = useScreenSize();

  console.log(screenSize.width)
  React.useEffect(() => {
    setIds(props.ids);
  }, [props.ids]);

  const handlePDFDownload =  (ids) => {
    const body = JSON.stringify(ids);
    try {
      dispatch(downloadPDF(body))
    } catch (err) {}
  };

  const handleCSVDownload = (ids) => {
    const body = JSON.stringify(ids);
    try {
      dispatch(downloadCSV(body))
    } catch (err) {}
  };

  const handleDelete = async (ids) => {
    const body = JSON.stringify(ids);
    dispatch(deleteTransactions(body));
    setRandom(Math.random());
    setIds([]);
    props.updateRand(randomNumber);
  };
  return (
    <Grid container spacing={2} direction="row">
      <Grid item>
        <Tooltip title="Download Selected Items as PDF" placement="top-start">
          <MyButton
            disabled={downloadPDFs || ids?.length === 0}
            onClick={() => {
              handlePDFDownload(props.ids);
            }}
          >
            <FontAwesomeIcon size={screenSize.width > 1000?'3x':'2x'} icon={ faFilePdf }/>
          </MyButton>
        </Tooltip>
      </Grid>

      <Grid item>
        <Tooltip title="Download Selected Items as CSV" placement="top-start">
          <MyButton
            disabled={downloadPDFs || ids.length === 0}
            onClick={() => {
              handleCSVDownload(props.ids);
            }}
          >
            <FontAwesomeIcon size={screenSize.width > 1000?'3x':'1x'} icon={ faFileCsv }/>
          </MyButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Delete Selected Items" placement="top-start">
          <MyButton
            disabled={loading || downloadPDFs|| ids?.length === 0}
            onClick={() => {
              handleDelete(props.ids);
            }}
          >
            <FontAwesomeIcon size={screenSize.width > 1000?'3x':'1x'} icon={ faTrash }/>
          </MyButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default FileDownloads;

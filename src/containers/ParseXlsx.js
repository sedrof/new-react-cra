import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import XLSX from "xlsx";
import { Typography} from "@mui/material";
import { useField } from "formik";
import "styles/HomePage.css";

function ParseXlsx(name) {
  const [_, __, helpers] = useField(name);

  const [transaction, setTransaction] = React.useState([]);

  React.useEffect(() => {
    helpers.setValue(transaction);
  }, [transaction]);

  const handleDelete = (files) => {
    setTransaction([]);
  };
  const handleChange = (files) => {
    // files is an array of file
    // if I just want the first file
    const file = files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, {
        type: "array",
        cellDates: true,
        dateNF: "yyyy-mm-dd",
      });
      // find the name of your sheet in the workbook first
      let worksheet = workbook.Sheets["Sheet1"];

      // convert to json format
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      setTransaction(jsonData);
    };
    // console.log(transaction, "transaction")
    reader.readAsArrayBuffer(file);
  };

  return (
    <DropzoneArea
      dropzoneText={
        <Typography
          style={{
            fontFamily: "GT Walsheim",
          }}
        >
          Drag and drop an xlsx file here or click <br></br>
          Accepted formats: csv, xlsx
        </Typography>
      }
      filesLimit={1}
      acceptedFiles={[
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ]}
      showFileNamesInPreview={true}
      onDrop={(files) => {
        handleChange(files);
      }}
      onDelete={(files) => handleDelete(files)}
    />
  );
}

export default ParseXlsx;

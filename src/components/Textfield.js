import React from "react";
import { TextField } from "@material-ui/core";
import { useField, ErrorMessage } from "formik";

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    // variant: 'outlined'
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <TextField
      inputProps={{ style: { fontFamily: "GT Walsheim" } }}
      InputLabelProps={{
        shrink: true,
        style: {
          fontFamily: "GT Walsheim",
        },
      }}
      {...configTextfield}
    >
      {/* helperText={<ErrorMessage name={name} />}{" "} */}
    </TextField>
  );
};

export default TextfieldWrapper;

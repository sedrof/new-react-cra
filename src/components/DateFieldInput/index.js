import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const configDateTimePicker = {
  inputProps: { style: { fontSize: "12px", fontFamily: "GT Walsheim" } },
  InputLabelProps: {
    shrink: true,
    style: {
      fontFamily: "GT Walsheim",
    },
  },
  type: "date",
  fullWidth: true,
};


export const FormInputDate = ({ name, control, label }) => {
  
  return (
      <Controller
        name={name}
        control={control}
        render={({ field :{onChange, value}, fieldState: { error }, formState }) => (
          <TextField
          onChange={onChange} 
          label={label}
            {...configDateTimePicker}
            // helperText={error ? error.message : null}
            error={!!error}
            value={value}
            // {...onChange}
          />
        )}
      />
  );
};

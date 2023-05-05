import React from "react";
import { Controller, useWatch } from "react-hook-form";
import TextField from "@mui/material/TextField";

function calculateAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const FormInputText = ({
  name,
  control,
  label,
  disabled,
  nestIndex,
  k,
  setValue,
}) => {
  
  const date_of_birth = useWatch({
    control,
    name: `familyGroup.${nestIndex}.nestedArray.${k}.date_of_birth`
  });
  
  React.useEffect(() => {
    if (typeof setValue === "function") {
      
      setValue(
        `familyGroup.${nestIndex}.nestedArray.${k}.age`,
        calculateAge(
          date_of_birth
        )
      );

    }
  },[date_of_birth]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          disabled={disabled}
          sx={{
            "& .MuiFormLabel-root.Mui-disabled": {
              WebkitTextFillColor: "#6c757d",
              backgroundColor: "white",
              fontWeight: "100",
              // transform: "translateY(-4px)",
              fontFamily: "GT Walsheim",
              fontSize: "1px",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              backgroundColor: "white",
              ontFamily: "GT Walsheim",
              fontSize: "12px",
            },
          }}
          inputProps={{
            style: {
              fontSize: "12px",
              fontFamily: "GT Walsheim",
            },
          }}
          InputLabelProps={{
            shrink: true,
            style: {
              fontFamily: "GT Walsheim",
              // fontSize: "12px",
            },
          }}
          // helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          variant="standard"
          label={label}
        />
      )}
    />
  );
};

import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Controller } from "react-hook-form";

export const FormInputDropdown = ({
  name,
  control,
  label,
  options,
  defaultValues
}) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      '& .MuiSelect-selectMenu': {
        fontFamily: 'GT Walsheim',
        fontSize: '10px',
        whiteSpace: 'break-spaces',
      },
      transform: "translateY(-5px)",
      minWidth: '100%',
    },
  }));
  const classes = useStyles();

  const inputLabel = React.useRef(null);

  return (
    <FormControl className={`${classes.formControl} MuiFormControl-root`}>
      <InputLabel shrink ref={inputLabel}>
        <Typography
          style={{
            fontSize: "10px",
          }}
        >
          {label}
        </Typography>
      </InputLabel>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            style={{
               fontSize: "10px",
                transform: "translateY(8px)",
               fontFamily: "GT Walsheim"
               }}
            fullWidth
            onChange={onChange}
            helperText={error ? error.message : null}
            error={!!error}
            value={value}
            defaultValues={defaultValues}
            autoWidth
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

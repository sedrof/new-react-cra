import React from "react";
import { useFieldArray } from "react-hook-form";
import { Button, Grid, Typography, ThemeProvider } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { FormInputText } from "components/TextFieldInput";
import { FormInputDropdown } from "components/SelectFieldInput";
import { FormInputDate } from "components/DateFieldInput";
import Relation from "Data/Relation";
import { AddCircle } from "@mui/icons-material";
import { Theme } from "theme";

export default function NestedArrayHelper({ nestIndex, control, register, useWatch, setValue, getValues}) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `familyGroup.${nestIndex}.nestedArray`,
  });
  const [disabled, setDisable] = React.useState(true);

  return (
    <>
      {fields.map((item, k) => {
        return (
          <Grid container spacing={1} key={item.id} style={{ marginLeft: 20 }}>
            <Grid item md={1.5}>
              <FormInputText
                control={control}
                name={`familyGroup.${nestIndex}.nestedArray.${k}.name`}
                label="Name"
                
              />
            </Grid>
            <Grid item md={2}>
              <FormInputDate
                control={control}
                name={`familyGroup.${nestIndex}.nestedArray.${k}.date_of_birth`}
                label="Date Of Birth"
                               
              />
            </Grid>
            <Grid item md={0.5}>
              <FormInputText
              useWatch={useWatch}
              getValues={getValues}
              setValue={setValue}
              nestIndex={nestIndex}
              k={k}
              disabled={disabled}
                control={control}
                name={`familyGroup.${nestIndex}.nestedArray.${k}.age`}
                label="age"
                
              />
            </Grid>
            <Grid item md={2}>
              <FormInputDropdown
                minWidthh={100}
                control={control}
                name={`familyGroup.${nestIndex}.nestedArray.${k}.relationship`}
                label="Relationship"
                options={Relation}
              />
            </Grid>

            <Grid item md={1.5}>
              <FormInputText
                
                control={control}
                name={`familyGroup.${nestIndex}.nestedArray.${k}.income`}
                label="Income"
              />
            </Grid>
            <Grid item md={1.5}>
              <FormInputText
                control={control}
                name={`familyGroup.${nestIndex}.nestedArray.${k}.care_percentage`}
                label="Care %"
              />
            </Grid>
            <Grid item md={1.5}>
              <FormInputText
                control={control}
                name={`familyGroup.${nestIndex}.nestedArray.${k}.rent_percentage`}
                label="Rent %"
              />
            </Grid>
            <Grid
              style={{
                marginTop: "30px",
              }}
              

            >
              <Button type="button" onClick={() => remove(k)}>
                <RemoveIcon
                  style={{
                    color: "red",
                  }}
                />
              </Button>
            </Grid>
          </Grid>
        );
      })}
      <ThemeProvider theme={Theme}>

      <Button
        style={{
          // marginTop: "25px",
          marginLeft: "25px",
          color: "green",
        }}
        color="primary"
        size="small"
        type="button"
        onClick={() =>
          append({
            name: "2",
          })
        }
        startIcon={<AddCircle style={{
          color: "green",
        }} />}
      >
          
        Add FM
      </Button>
      </ThemeProvider>
      <hr />
    </>
  );
}

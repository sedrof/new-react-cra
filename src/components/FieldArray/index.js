import NestedArrayHelper from "components/NestedArray";
import React from "react";
import { useFieldArray } from "react-hook-form";
import {
  Button,
  Grid,
  Typography,
  Divider,
  ThemeProvider,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";

import RemoveIcon from "@mui/icons-material/Remove";
import { FormInputText } from "components/TextFieldInput";
import { FormInputDropdown } from "components/SelectFieldInput";
import FG_Types from "Data/FG_Type";
import Yes_No from "Data/Yes_No";
import Maintenance_Type from "Data/Maintenance_Type";
import { Theme } from "theme";
import fgNumber from "Data/fGNumber";


export default function Fields({
  control,
  register,
  setValue,
  getValues,
  watch,
}) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "familyGroup",
  });

  const [showField, setShowField] = React.useState(false);

  const setDefaultValue = (index) => {
    switch (index) {
      case 0:
        return "FG_1";
      case 1:
        return "FG_2";
      case 2:
        return "FG_3";
      case 3:
        return "FG_4";
      case 4:
        return "FG_5";
    }
  };


  return (
    <>
      <ThemeProvider theme={Theme}>
        <Grid
          style={{
            marginBottom: "15px",
          }}
          container
          spacing={2}
        >
          <Grid item md={5} xs={6}>
            <Typography variant="h5" align="center">
              {" "}
              Family Group
            </Typography>
          </Grid>
          <Grid item md={7} xs={6}>
            <Typography variant="h5" align="center">
              {" "}
              Family Member
            </Typography>
          </Grid>
        </Grid>
        {fields.map((item, index) => {
          return (
            <>
              <hr />

              <Grid key={index} container spacing={1}>
                <Grid
                  item
                  md={4.5}
                  className="item-outer"
                  style={{
                    // marginBottom: "20px",
                  }}
                >
                  <Grid sx={{ marginRight: "9px" }} container spacing={3}>
                    <Grid item md={2}>
                      <FormInputDropdown
                        control={control}
                        name={`familyGroup.${index}.family_group_name`}
                        label="FG"
                        options={fgNumber}
                        defaultValue={setDefaultValue(index)}
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormInputText
                        control={control}
                        name={`familyGroup.${index}.family_group_last_rent`}
                        label="Last Rent"
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormInputDropdown
                        control={control}
                        name={`familyGroup.${index}.family_group_any_inc_supp_payment`}
                        label="Any Inc. SP"
                        options={Yes_No}
                        defaultValues="Yes"
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormInputDropdown
                        control={control}
                        name={`familyGroup.${index}.family_group_cra_eligi`}
                        label="
                      CRA Eligibilty"
                        options={Yes_No}
                        defaultValues="Yes"
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormInputDropdown
                        // minWidthh='20px'
                        control={control}
                        name={`familyGroup.${index}.family_group_type`}
                        label="
                      FG Type"
                        options={FG_Types}
                        defaultValues="Single"
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormInputText
                        control={control}
                        name={`familyGroup.${index}.family_group_cra_amount`}
                        label="CRA Amount"
                      />
                    </Grid>

                    <Grid item md={2}>
                      <FormInputText
                        control={control}
                        name={`familyGroup.${index}.family_group_ftb_a`}
                        label="FTB A"
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormInputText
                        control={control}
                        name={`familyGroup.${index}.family_group_ftb_b`}
                        label="FTB B"
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormInputText
                        control={control}
                        name={`familyGroup.${index}.family_group_maint_amount`}
                        label="Maint Amount"
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormInputDropdown
                        control={control}
                        name={`familyGroup.${index}.family_group_maint_type`}
                        label="
                      Maint Type"
                        options={Maintenance_Type}
                        defaultValues="Single"
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormInputText
                        control={control}
                        name={`familyGroup.${index}.family_group_addi_child`}
                        label="Addi Child"
                      />
                    </Grid>
                    <Grid
                      style={{
                        marginTop: "25px",
                      }}
                      item
                      md={1}
                    >
                      <Button
                      style={{ transform:'translateY(5px)' }}
                        disabled={index === 0 ? true : false}
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <RemoveIcon
                          style={{
                            color: "red",
                          }}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  sx={{
                    borderLeft: ".5px solid black",
                    position: "relative",
                    margin: "3px",
                  }}
                  item
                  md={7}
                >
                  <NestedArrayHelper
                    watch={watch}
                    nestIndex={index}
                    setValue={setValue}
                    getValues={getValues}
                    {...{ control, register, watch }}
                  />
                </Grid>
              </Grid>
            </>
          );
        })}
        <Button
          type="button"
          // variant="contained"
          color="primary"
          size="small"
          style={{
            color:'green'
          }}
          onClick={() => {
            setValue("familyGroup", [
              ...(getValues().familyGroup || []),
              {
                nestedArray: [
                  {
                    name: "name",
                    relationship: "Tenant",
                    rent_percentage: 0,
                    care_percentage: 0,
                  },
                ],
              },
            ]);
          }}
          startIcon={<AddCircle style={{
            color: "green",
          }} />}
        >
          Add FG
        </Button>
      </ThemeProvider>
    </>
  );
}

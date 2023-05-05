import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
  Slide,
  Paper,
  styled,
  AppBar,
  Toolbar,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import { Theme } from "theme";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Fields from "components/FieldArray";
import { FormInputText } from "components/TextFieldInput";
import { FormInputDate } from "components/DateFieldInput";
import { FormInputDropdown } from "components/SelectFieldInput";
import { singleCreateTransaction } from "features/api";
import validationSchema from "components/ValidationSchema";
import { AddCircle } from "@mui/icons-material";

const MyButton = styled(Button)`
  &&& {
    &.Mui-disabled {
      color: grey;
      background: white;
      borderRadius:25;
    },
    borderRadius: 25;
    color: green;
    backgroundColor: green;
    // width: 80%;
    fontFamily: GT Walsheim;
  }
`;
const StyledPaper = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: "90%",
  color: theme.palette.text.primary,
  borderRadius: "25px",
}));

const defaultValues = {
  transactions: {
    chp_reference: "",
    property_market_rent: "0",
    income_period: "Weekly",
    state: "NSW",
    rent_effective_date: "",
  },
  familyGroup: [
    {
      family_group_addi_child: "0",
      family_group_any_inc_supp_payment: "Yes",
      family_group_cra_amount: "0",
      family_group_cra_eligi: "Yes",
      family_group_ftb_a: "0",
      family_group_ftb_b: "0",
      family_group_last_rent: "0",
      family_group_maint_amount: "0",
      family_group_maint_type: "None",
      family_group_name: "",
      family_group_type: "",
      nestedArray: [
        {
          name: "1",
          date_of_birth: "",
          income: "0",
          relationship: "Tenant",
          rent_percentage: 0,
          care_percentage: 0,
        },
      ],
    },
  ],
};

export default function NewForm() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [errs, setErrs] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (errors) {
      setErrs(true);
    } else {
      setErrs(false);
    }
  }, [errors]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const onSubmit = (data) => {
    const bod = JSON.stringify(data);
    dispatch(singleCreateTransaction(bod));
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/");
    }, 1000);
    // setOpen(false);
  };
  // console.log(errors.familyGroup? errors.familyGroup : "null");
  return (
    <ThemeProvider theme={Theme}>
    <div>
      <Button
        type="button"
        color="primary"
        size="large"
        style={{
          color: "#2ca58d",
        }}
        sx={{
          transform: {
            xs: "translate(-70%, 0px)",
            sm: "translate(-70%, 0px)",
            md: "translate(-70%, 0px)",
            lg: "translate(-70%, 0px)",
            xl: "translate(-170%, 0px)",
          },
        }}
        onClick={handleClickOpen}
        transitioncomponent={Transition}
        startIcon={
          <AddCircle
            style={{
              color: "#2ca58d",
            }}
          />
        }
      >
        Add New
      </Button>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#f8f9fa",
          },
        }}
        sx={{ position: "fixed" }}
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: "fixed" }}>
          <Toolbar sx={{ backgroundColor: "white" }}>
            <Grid container>
              <Grid item md={7}>
                <IconButton
                  edge="start"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon
                    style={{
                      color: "red",
                    }}
                  />
                  <Typography
                    style={{
                      color: "red",
                    }}
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Exit
                  </Typography>
                </IconButton>
              </Grid>
              <Grid sx={{ textAlign: "right" }} item md={2}>
                <MyButton onClick={() => reset(defaultValues)} type="submit">
                  <Typography>Reset</Typography>
                  <ClearAllIcon fontSize="large" />
                </MyButton>
              </Grid>
              <Grid sx={{ textAlign: "right" }} item md={3}>
                <MyButton
                  disabled={showSuccessMessage}
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                >
                  <Typography>Submit</Typography>
                  <GppGoodIcon fontSize="large" />
                </MyButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
        >
          New Transaction
        </DialogTitle>
        {showSuccessMessage && (
                <div className="card">
                  <div className="card-header">Submit success</div>
                  <div className="card-body">
                    <div className="progress-bar"></div>
                  </div>
                </div>
          )}
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.familyGroup && (
              <Alert
                severity="error"
                style={{backgroundColor: "#f6e3e9", color: "rgb(87, 41, 41)", width: "100%"}}
              >
                {errors.familyGroup.map((msg) => (
                  <>
                    <AlertTitle>Error</AlertTitle>
                    <div>{msg.nestedArray?.message}</div>
                  </>
                ))}
              </Alert>
            )}

            <Grid container spacing={2}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                  width: "100%",
                  mt: "40px",
                }}
              >
                

                <Grid
                  item
                  className="transaction_title"
                  md={12}
                  xs={12}
                  sx={{
                    alignContent: "center",
                    marginBottom: "25px",
                  }}
                >
                  <Typography variant="h5" align="center">
                    {" "}
                    Transaction
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4} md={2} className="chp_reference">
                    <FormInputText
                      control={control}
                      name="transactions.chp_reference"
                      label="CHP Reference"
                    />
                  </Grid>
                  <Grid item className="property_market_rent" xs={4} md={2}>
                    <FormInputText
                      control={control}
                      name="transactions.property_market_rent"
                      label="Property Market Rent"
                    />
                  </Grid>
                  <Grid
                    style={{
                      marginBottom: "12px",
                    }}
                    item
                    className="income_period"
                    xs={4}
                    md={2}
                  >
                    <FormInputDropdown
                      control={control}
                      name={`transactions.income_period`}
                      options={[
                        {
                          label: "Weekly",
                          value: "Weekly",
                        },
                        {
                          label: "Fortnightly",
                          value: "Fortnightly",
                        },
                      ]}
                      label="Income Period"
                    />
                  </Grid>
                  <Grid xs={6} md={2} item>
                    <FormInputDate
                      control={control}
                      name={"transactions.rent_effective_date"}
                      label="Rent Effective Date"
                    />
                  </Grid>
                  <Grid xs={6} md={2} item className="state">
                    <FormInputText
                      control={control}
                      name="transactions.state"
                      label="State"
                    />
                  </Grid>
                </Grid>
              </StyledPaper>
            </Grid>
         
          <StyledPaper
            sx={{
              my: 2,
              mx: "auto",
              width: "100vw",
              // fontSize: ".6rem",
            }}
          >
            <Fields
              {...{
                control,
                register,
                defaultValues,
                getValues,
                setValue,
                errors,
                watch,
              }}
            />
          </StyledPaper>
        </form>
      </Dialog>
    </div>
    </ThemeProvider>
  );
}

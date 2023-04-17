import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
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
  Alert,
  AlertTitle,
} from "@mui/material";
import Fields from "components/FieldArray";
import { FormInputText } from "components/TextFieldInput";
import { FormInputDate } from "components/DateFieldInput";
import { FormInputDropdown } from "components/SelectFieldInput";
import { getSingleTransaction, singleUpdateTransaction } from "features/api";
import { incomeOptions } from "Data/IncomePeriodSelect";
import validationSchema from "components/ValidationSchema";
import { Theme } from "theme";
import EditLoading from "components/TransactionEditLoading";

const MyButton = styled(Button)`
  &&& {
    &.Mui-disabled {
      // color: grey;
      // background: white;
      // borderRadius:25;
    },
    borderRadius: 25;
    color: green;
    backgroundColor: green;
    // width: 80%;
    fontFamily: GT Walsheim;
  }
`;
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: "90%",
  color: theme.palette.text.primary,
  borderRadius: "25px",
}));

export default function EditForm() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
    useWatch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [transaction, setTransaction] = React.useState();
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showResponseMessage, setShowResponseMessage] = React.useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { ids } = useParams();
  // console.log(errors , "errors");
  React.useEffect(() => {
    const api = async (objID) => {
      const res = await dispatch(getSingleTransaction(ids))
        .then((data) => {
          reset(data["payload"]);
          setTransaction(data["payload"]);
        })
        .catch((error) => {
          // console.log(error);
        });
    };
    if (ids) {
      api(ids);
      setIsLoading(false);
    }
  }, []);
  

  const [open, setOpen] = React.useState(true);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClose = () => {
    navigate("/list");
  };

  const onSubmit = (data) => {
    // console.log(errors, "bzz");
    // const bod = JSON.stringify(data);
    dispatch(singleUpdateTransaction({ data, ids })).then((data) => {
      // console.log(data, "data from dispatch");
      setShowResponseMessage(data.payload);
      setShowSuccessMessage(data.payload === "success");
      setShowErrorMessage(data.payload === "Error");
      setTimeout(() => {
        setShowResponseMessage(null);
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 6000);
    });
    // setOpen(false);
  };

  return (
    <div>
      {transaction? <ThemeProvider theme={Theme}>
        <Dialog
          PaperProps={{
            style: {
              backgroundColor: "#f8f9fa",
            },
          }}
          sx={{ position: "fixed" }}
          fullScreen
          open='true'
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
                  <MyButton onClick={() => reset(transaction)} type="submit">
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
                  <div style={{ color: "green", textAlign:'center' }}>
                    {showResponseMessage}
                  </div>
                )}
                {showErrorMessage && (
                  <div style={{color:'red'}}>{showResponseMessage}</div>
                )}
                {errors.familyGroup && (
              <Alert
                severity="error"
              >
                {errors.familyGroup.map((msg) => (
                  <>
                    <AlertTitle>Error</AlertTitle>
                    <div>{msg.nestedArray?.message}</div>
                  </>
                ))}
              </Alert>
            )}
          <form onSubmit={handleSubmit(onSubmit)}>
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
                <Grid container className="transaction_form" spacing={2}>
                  <Grid item xs={2} md={2} className="chp_reference">
                    <FormInputText
                      control={control}
                      name="transactions.chp_reference"
                      label="CHP Reference"
                    />
                  </Grid>
                  <Grid item className="property_market_rent" xs={3} md={2}>
                    <FormInputText
                      control={control}
                      name="transactions.property_market_rent"
                      label="Property Market Rent"
                    />
                  </Grid>
                  <Grid
                    style={
                      {
                        // marginBottom: "12px",
                      }
                    }
                    item
                    className="income_period"
                    xs={4}
                    md={4}
                    lg={2}
                  >
                    <FormInputDropdown
                      control={control}
                      name={"transactions.income_period"}
                      options={incomeOptions}
                      label="Income Period"
                      defaultValues="Weekly"
                    />
                  </Grid>
                  <Grid xs={4} md={2} item className="rent_effective_date">
                    <FormInputDate
                      control={control}
                      name="transactions.rent_effective_date"
                      label="Rent Effective Date"
                    />
                  </Grid>
                  <Grid xs={4} md={2} item className="state">
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
                fontSize: ".6rem",
              }}
            >
              <Fields
                {...{
                  control,
                  register,
                  // defaultValues,
                  getValues,
                  setValue,
                  errors,
                  useWatch,
                }}
              />
            </StyledPaper>
          </form>
        </Dialog>
      </ThemeProvider> : <EditLoading/>}
    </div>
  );
}

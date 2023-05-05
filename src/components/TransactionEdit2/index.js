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
import { getSingleTransaction, singleUpdateTransaction, downloadSinglePDF } from "features/api";
import { incomeOptions } from "Data/IncomePeriodSelect";
import validationSchema from "components/ValidationSchema";
import { Theme } from "theme";
import EditLoading from "components/TransactionEditLoading";
import PDFViewer from "components/PdfViewer";

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
  const [pdfUrl, setPdfUrl] = React.useState('');
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [showResponseMessage, setShowResponseMessage] = React.useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { ids } = useParams();
  // console.log(errors , "errors");
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionData, pdfData] = await Promise.all([
          dispatch(getSingleTransaction(ids)),
          dispatch(downloadSinglePDF(ids))
        ]);
  
        reset(transactionData.payload);
        setTransaction(transactionData.payload);
        setPdfUrl(URL.createObjectURL(pdfData.payload));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        // handle the error here
      }
    };
  
    if (ids) {
      fetchData();
    }
  }, [ids, dispatch]);


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClose = () => {
    navigate("/list");
  };

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(singleUpdateTransaction({ data, ids }));
      setShowResponseMessage(response.payload);
      setShowSuccessMessage(response.payload === "success");
      setShowErrorMessage(response.payload === "Error");
  
      // Update the PDF URL
      const pdfResponse = await dispatch(downloadSinglePDF(ids));
      setPdfUrl(URL.createObjectURL(pdfResponse.payload));
    } catch (error) {
      console.log(error);
      // handle the error here
    }
  
    setTimeout(() => {
      setShowResponseMessage(null);
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
    }, 6000);
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
                <div className="card">
                  <div className="card-header">Submit success</div>
                  <div className="card-body">
                    <div className="progress-bar"></div>
                  </div>
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
                      labelStyle={{ fontSize: "23px" }}
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
            <div className="pdfViewer" >
            {pdfUrl &&
             <iframe src={pdfUrl} width="100%" height="600px" title="PDF Document"></iframe>
             
             }
            </div>
            
          </form>
        </Dialog>
      </ThemeProvider> : <EditLoading/>}
    </div>
  );
}

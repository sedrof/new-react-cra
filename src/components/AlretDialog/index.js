import * as React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { singleDeleteTransactions } from "features/api";

const btn_del = {
  "&:disabled": {
    backgroundColor: "grey",
  },
  borderRadius: 25,
  color: "rgb(240, 243, 227)",
  backgroundColor: "red",
  fontSize: "14px",
  width: "50%",
  fontFamily: "GT Walsheim",
};
const btn_cancel = {
  "&:disabled": {
    backgroundColor: "grey",
  },
  borderRadius: 25,
  color: "rgb(240, 243, 227)",
  backgroundColor: "#2ca58d",
  fontSize: "14px",
  width: "50%",
  fontFamily: "GT Walsheim",
};
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={btn_del}
        variant="outlined"
        color="error"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        style={{
          borderRadius: "30%",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            <Typography
              style={{
                fontFamily: "GT Walsheim",
                fontWeight: "800",
              }}
            >
              {" "}
              Deletion Alrert
            </Typography>
          }
        </DialogTitle>
        <DialogContent>
          <Typography
            style={{
              fontFamily: "GT Walsheim",
              fontWeight: "400",
            }}
          >
            Are you sure you want to delete {props.transaction.chp_reference}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button style={btn_cancel} onClick={handleClose}>
            Disagree
          </Button>
          <Button
            style={btn_del}
            onClick={() => {
              const id = props.transaction.id;
              dispatch(singleDeleteTransactions(id));
              setOpen(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

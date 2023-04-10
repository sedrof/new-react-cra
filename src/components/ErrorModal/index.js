import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions } from "@mui/material";
import ErrorTable from "components/ErrorTable";

const ErrorModal = ( props ) => {
const {errors, handleChildChange, openz} = props;

  const [open, setOpen] = useState(false);
//   const [open, setOpen] = useState(false);

  const ErrorTablez = (errors) => {
    if (Object.keys(errors).length > 0) {
      return <ErrorTable errors={errors} />;
    } else {

      return <></>;
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      handleChildChange(true);

    } else {
        handleChildChange(false);
    }
  }, [errors]);

  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleChildChange(false);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}> Open errors </Button> */}
      <Dialog
        open={openz}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        
          <ErrorTablez errors={errors} />
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorModal;

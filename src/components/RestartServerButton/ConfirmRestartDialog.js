// components/RestartServerButton/ConfirmRestartDialog.js
import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ConfirmRestartDialog = ({ open, handleClose, handleConfirm, vmId }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Restart Virtual Server</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to restart the virtual server with ID {vmId}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary">
          Restart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmRestartDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  vmId: PropTypes.number.isRequired,
};

export default ConfirmRestartDialog;

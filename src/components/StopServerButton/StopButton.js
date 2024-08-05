// components/StopServerButton/StopButton.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import ConfirmStopDialog from "./ConfirmStopDialog";

const StopButton = ({ vmId, onStop, status }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onStop(vmId);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        style={{
          color: "white",
          backgroundColor: status === "stopped" ? "gray" : "#d32f2f",
        }}
        disabled={status === "stopped"} // Disable the button if status is "stopped"
      >
        Stop
      </Button>
      <ConfirmStopDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        vmId={vmId}
      />
    </>
  );
};

StopButton.propTypes = {
  vmId: PropTypes.number.isRequired,
  onStop: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default StopButton;

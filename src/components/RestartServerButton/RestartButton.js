// components/RestartServerButton/RestartButton.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import ConfirmRestartDialog from "./ConfirmRestartDialog";

const RestartButton = ({ vmId, onRestart, closeMenu }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onRestart(vmId);
    handleClose();
    closeMenu(); // Close the dropdown menu
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>Restart</MenuItem>
      <ConfirmRestartDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        vmId={vmId}
      />
    </>
  );
};

RestartButton.propTypes = {
  vmId: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default RestartButton;

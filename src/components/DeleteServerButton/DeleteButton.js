// components/DeleteServerButton/DeleteButton.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const DeleteButton = ({ vmId, onDelete, closeMenu }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onDelete(vmId);
    handleClose();
    closeMenu(); // Close the dropdown menu
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>Delete</MenuItem>
      <ConfirmDeleteDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        vmId={vmId}
      />
    </>
  );
};

DeleteButton.propTypes = {
  vmId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default DeleteButton;

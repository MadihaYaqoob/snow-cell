// components/MDDeleteButton/DeleteButton.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const DeleteButton = ({ token, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onDelete(token);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        style={{ color: "white", backgroundColor: "#d32f2f" }} // Adding style directly for correct color
      >
        Delete
      </Button>
      <ConfirmDeleteDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        token={token}
      />
    </>
  );
};

DeleteButton.propTypes = {
  token: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;

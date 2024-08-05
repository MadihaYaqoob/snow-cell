import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import axios from "axios";
import Icon from "@mui/material/Icon";

const GenerateTokenButton = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGenerateToken = async () => {
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 6); // Set the expiration date to 6 months from now

    const requestData = {
      note,
      expires: expires.toISOString(),
      status: "Active",
    };

    try {
      const response = await axios.post("http://localhost:8000/api/tokens", requestData, {
        withCredentials: true,
      });
      onSuccess(response.data);
      handleClose();
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  return (
    <div>
      <MDButton variant="gradient" color="dark" onClick={handleClickOpen}>
        <Icon>add</Icon>&nbsp; GENERATE NEW TOKEN
      </MDButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Generate New Token</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a note for the new token.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="note"
            label="Note"
            type="text"
            fullWidth
            variant="standard"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleClose}>Cancel</MDButton>
          <MDButton variant="gradient" color="dark" onClick={handleGenerateToken}>
            Generate
          </MDButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

GenerateTokenButton.propTypes = {
  onSuccess: PropTypes.func.isRequired, // Define prop types
};

export default GenerateTokenButton;

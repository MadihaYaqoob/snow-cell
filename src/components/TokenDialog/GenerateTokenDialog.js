import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const GenerateTokenDialog = ({ open, onClose, onGenerate }) => {
  const [note, setNote] = useState("");

  const handleGenerate = () => {
    onGenerate(note);
    setNote("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Generate New Token</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Note"
          type="text"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleGenerate} color="primary">
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

GenerateTokenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onGenerate: PropTypes.func.isRequired,
};

export default GenerateTokenDialog;

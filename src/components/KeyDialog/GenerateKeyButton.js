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

const GenerateKeyButton = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [name, setName] = useState(""); // Add state for name

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadPrivateKey = (privateKey, fileName) => {
    const element = document.createElement("a");
    const file = new Blob([privateKey], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const handleGenerateKey = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/ssh-keys",
        { name, note }, // Include name and note in the request
        {
          withCredentials: true,
        }
      );
      const privateKey = response.data.private_key;
      const fileName = `${name}.pem`;
      downloadPrivateKey(privateKey, fileName);
      onSuccess(response.data);
      handleClose();
    } catch (error) {
      console.error("Error generating SSH key:", error);
    }
  };

  return (
    <div>
      <MDButton variant="gradient" color="dark" onClick={handleClickOpen}>
        <Icon>add</Icon>&nbsp; GENERATE NEW SSH KEY
      </MDButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Generate New SSH Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name and note for the new SSH key. A private key will be downloaded to
            your computer.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
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
          <MDButton variant="gradient" color="dark" onClick={handleGenerateKey}>
            Generate
          </MDButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

GenerateKeyButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default GenerateKeyButton;

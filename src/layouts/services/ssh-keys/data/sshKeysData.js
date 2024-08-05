import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const PublicKeyCell = ({ value }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState("Copy Public Key");

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setTooltipTitle("Public key copied!");
    setTooltipOpen(true);
    setTimeout(() => {
      setTooltipTitle("Copy Public Key");
    }, 1000); // Revert tooltip title after 1 second
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "200px",
        }}
      >
        {value}
      </span>
      <Tooltip
        title={tooltipTitle}
        open={tooltipOpen}
        onClose={handleTooltipClose}
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        disableFocusListener
        disableTouchListener
      >
        <IconButton onClick={handleCopy} size="small" style={{ marginLeft: "5px" }}>
          <FileCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

PublicKeyCell.propTypes = {
  value: PropTypes.string.isRequired,
};

export const columns = [
  { Header: "NAME", accessor: "name" },
  {
    Header: "PUBLIC KEY",
    accessor: "public_key",
    Cell: PublicKeyCell,
  },
  { Header: "CREATED AT", accessor: "created_at" },
  { Header: "LAST USED", accessor: "last_used" },
  { Header: "ACTIONS", accessor: "actions" },
];

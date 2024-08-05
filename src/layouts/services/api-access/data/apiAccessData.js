import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const TokenCell = ({ value }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState("Copy Token");

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setTooltipTitle("Token copied!");
    setTooltipOpen(true);
    setTimeout(() => {
      setTooltipTitle("Copy Token");
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
          maxWidth: "150px",
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
        <IconButton onClick={handleCopy} size="small" style={{ marginLeft: "10px" }}>
          <FileCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

TokenCell.propTypes = {
  value: PropTypes.string.isRequired,
};

export const columns = [
  {
    Header: "TOKEN",
    accessor: "token",
    width: "20%", // Adjust width if necessary
    Cell: TokenCell,
  },
  { Header: "NOTE", accessor: "note", width: "10%" },
  { Header: "CREATED", accessor: "created_at", width: "10%" },
  { Header: "EXPIRES", accessor: "expires", width: "10%" },
  { Header: "STATUS", accessor: "status", width: "10%" },
  { Header: "CREATED BY", accessor: "created_by", width: "10%" },
  { Header: "ACTIONS", accessor: "actions", width: "10%" },
];

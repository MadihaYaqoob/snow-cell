import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

const GenerateVMInstanceButton = ({ redirectPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectPath);
  };

  return (
    <MDButton variant="gradient" color="dark" onClick={handleClick}>
      <Icon>add</Icon>&nbsp; Launch Instance
    </MDButton>
  );
};

GenerateVMInstanceButton.propTypes = {
  redirectPath: PropTypes.string.isRequired,
};

export default GenerateVMInstanceButton;

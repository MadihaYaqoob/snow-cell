import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import StopButton from "components/StopServerButton/StopButton.js";
import RestartButton from "components/RestartServerButton/RestartButton";
import DeleteButton from "components/DeleteServerButton/DeleteButton";
import MDButton from "components/MDButton";
import GenerateVMInstanceButton from "components/VirtualMachinesDialog/GenerateVMInstanceButton.js";
import { columns } from "layouts/services/virtual-servers/data/virtualServersData";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import useSupabaseRealtime from "flow/UseSupabaseRealTime";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import BasicInfo from "layouts/account/settings/components/BasicInfo";
import IncreaseQuotaForm from "./Form";

function QuotaIncrease() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Increase Quota Request
              </MDTypography>
              <MDTypography variant="button" color="text">
                Outlined below are the details for requesting an increase in your virtual server
                resources.
              </MDTypography>
              <MDBox mt={2} mb={2}>
                <IncreaseQuotaForm />
              </MDBox>
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default QuotaIncrease;

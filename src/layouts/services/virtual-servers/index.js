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

function VirtualServers() {
  const { data, loading, error, fetchData, setData } = useSupabaseRealtime("vm_instances", "*");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedVmId, setSelectedVmId] = useState(null);

  const handleStop = async (vmId) => {
    try {
      await axios.put(
        `http://localhost:8000/vm_instances/${vmId}/stop`,
        {},
        {
          withCredentials: true,
        }
      );
      setData((prevData) =>
        prevData.map((item) => (item.id === vmId ? { ...item, status: "stopped" } : item))
      );
    } catch (error) {
      console.error("Error stopping VM instance:", error);
    }
  };

  const handleRestart = async (vmId) => {
    try {
      await axios.put(
        `http://localhost:8000/vm_instances/${vmId}/restart`,
        {},
        {
          withCredentials: true,
        }
      );
      setData((prevData) =>
        prevData.map((item) => (item.id === vmId ? { ...item, status: "running" } : item))
      );
    } catch (error) {
      console.error("Error restarting VM instance:", error);
    }
  };

  const handleDelete = async (vmId) => {
    try {
      await axios.delete(`http://localhost:8000/vm_instances/${vmId}`, {
        withCredentials: true,
      });
      setData((prevData) => prevData.filter((item) => item.id !== vmId));
    } catch (error) {
      console.error("Error deleting VM instance:", error);
    }
  };

  const openMenu = (event, vmId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedVmId(vmId);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
    setSelectedVmId(null);
  };

  const rows = data.map((item) => ({
    ...item,
    actions: (
      <MDBox display="flex" alignItems="center">
        <StopButton vmId={item.id} onStop={handleStop} status={item.status} />
        <MDTypography
          color="secondary"
          onClick={(event) => openMenu(event, item.id)}
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            ml: 2,
          }}
        >
          <Icon fontSize="default">more_vert</Icon>
        </MDTypography>
        <Menu
          anchorEl={menuAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(menuAnchorEl) && selectedVmId === item.id}
          onClose={closeMenu}
          keepMounted
        >
          <RestartButton vmId={item.id} onRestart={handleRestart} closeMenu={closeMenu} />
          <DeleteButton vmId={item.id} onDelete={handleDelete} closeMenu={closeMenu} />
        </Menu>
      </MDBox>
    ),
  }));

  const vmInstancesData = {
    columns,
    rows,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Virtual Servers
              </MDTypography>
              <MDTypography variant="button" color="text">
                Displayed below is a compilation of active Virtual Servers within your organization.
              </MDTypography>
              <MDBox mt={2} mb={2}>
                <GenerateVMInstanceButton redirectPath="/create-vm-instance" />
              </MDBox>
            </MDBox>
            {loading ? (
              <MDTypography variant="button" color="text">
                Loading...
              </MDTypography>
            ) : (
              <>
                {error && (
                  <MDTypography variant="button" color="error">
                    Error fetching data
                  </MDTypography>
                )}
                <DataTable table={vmInstancesData} canSearch />
              </>
            )}
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default VirtualServers;

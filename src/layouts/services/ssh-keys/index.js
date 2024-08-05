import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DeleteButton from "components/DeleteKeyButton/DeleteButton.js";
import GenerateKeyButton from "components/KeyDialog/GenerateKeyButton.js";
import { format } from "date-fns";
import useSupabaseRealtime from "flow/UseSupabaseRealTime";
import { columns } from "layouts/services/ssh-keys/data/sshKeysData";

function SshKeys() {
  const { data, loading, error, setData } = useSupabaseRealtime("ssh_keys", "*");
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (keyId) => {
    try {
      console.log("Deleting key", keyId);
      await axios.delete(`http://localhost:8000/api/ssh-keys/${keyId}`, {
        withCredentials: true,
      });
      setData((prevData) => prevData.filter((item) => item.id !== keyId));
    } catch (error) {
      console.error("Error deleting SSH key:", error);
      setDeleteError(error);
    }
  };

  const handleGenerateKeySuccess = () => {
    console.log("New key generated");
    // No manual update to setData here
  };

  const rows = data.map((item) => ({
    ...item,
    created_at: format(new Date(item.created_at), "yyyy-MM-dd HH:mm:ss"),
    last_used: item.last_used ? format(new Date(item.last_used), "yyyy-MM-dd HH:mm:ss") : "Never",
    actions: <DeleteButton keyId={item.id} onDelete={handleDelete} />,
  }));

  const sshKeysData = {
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
                SSH Keys
              </MDTypography>
              <MDTypography variant="button" color="text">
                Below is a list of SSH keys you have generated for accessing your compute instances.
              </MDTypography>
              <MDBox mt={2} mb={2}>
                <GenerateKeyButton onSuccess={handleGenerateKeySuccess} />
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
                {deleteError && (
                  <MDTypography variant="button" color="error">
                    Error deleting SSH key
                  </MDTypography>
                )}
                <DataTable table={sshKeysData} canSearch />
              </>
            )}
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SshKeys;

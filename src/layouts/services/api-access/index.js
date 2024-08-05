import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Button from "@mui/material/Button";
import DeleteButton from "components/DeleteTokenButton/DeleteButton.js";
import GenerateTokenButton from "components/TokenDialog/GenerateTokenButton.js";
import { format } from "date-fns";
import useSupabaseRealtime from "flow/UseSupabaseRealTime";
import { columns } from "layouts/services/api-access/data/apiAccessData";

function ApiAccess() {
  const { data, loading, error, fetchData, setData } = useSupabaseRealtime("api_tokens", "*");

  const handleDelete = async (token) => {
    try {
      await axios.delete(`http://localhost:8000/api/tokens/${token}`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setData(data.filter((item) => item.token !== token));
    } catch (error) {
      setError(error);
    }
  };

  const handleGenerateTokenSuccess = (newToken) => {
    setData((prevData) => [...prevData, newToken]);
  };

  const rows = data.map((item) => ({
    ...item,
    created_at: format(new Date(item.created_at), "yyyy-MM-dd HH:mm:ss"),
    updated_at: format(new Date(item.updated_at), "yyyy-MM-dd HH:mm:ss"),
    expires: format(new Date(item.expires), "yyyy-MM-dd HH:mm:ss"),
    actions: <DeleteButton token={item.token} onDelete={handleDelete} />,
  }));

  const apiAccessData = {
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
                API tokens
              </MDTypography>
              <MDTypography variant="button" color="text">
                Displayed below is a compilation of active Access Tokens and their corresponding
                kubeconfigs for your organization within SnowCell. The generated kubeconfig files
                are designed to provide access to SnowCell&apos;s Kubernetes API through clients
                such as kubectl. The kubeconfig serves as a secure envelope for your Access Token,
                which can be retrieved from within the kubeconfig&apos;s contents should you need to
                recover it.
              </MDTypography>
              <MDBox mt={2} mb={2}>
                <GenerateTokenButton onSuccess={handleGenerateTokenSuccess} />
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
                <DataTable table={apiAccessData} canSearch />
              </>
            )}
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ApiAccess;

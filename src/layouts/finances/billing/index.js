import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data fetching functions
import { fetchCostOfInstances, fetchAccruedCosts } from "layouts/finances/billing/api";

const Billing = () => {
  const [costOfInstancesData, setCostOfInstancesData] = useState(null);
  const [accruedCostsData, setAccruedCostsData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const costData = await fetchCostOfInstances();
      const accruedData = await fetchAccruedCosts();
      setCostOfInstancesData(costData);
      setAccruedCostsData(accruedData);
    };

    getData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <MDBox p={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Cost of Instances
                  </MDTypography>
                  {costOfInstancesData && (
                    <Bar data={costOfInstancesData} options={{ responsive: true }} />
                  )}
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <MDBox p={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Accrued Costs
                  </MDTypography>
                  {accruedCostsData && (
                    <Line data={accruedCostsData} options={{ responsive: true }} />
                  )}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Billing;

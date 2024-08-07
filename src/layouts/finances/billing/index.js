import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

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
              <MDBox p={2}>
                {costOfInstancesData && (
                  <ReportsBarChart
                    color="warning"
                    title="Cost Breakdown"
                    description="Cost per instance or user"
                    date="updated 10 min ago"
                    chart={costOfInstancesData}
                  />
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox p={2}>
                {accruedCostsData && (
                  <ReportsLineChart
                    color="success"
                    title="Accrued Costs"
                    description="Accrued costs over time"
                    date="updated 4 min ago"
                    chart={accruedCostsData}
                  />
                )}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Billing;

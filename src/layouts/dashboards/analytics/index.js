// src/pages/Overview.js

import React from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDBadgeDot from "components/MDBadgeDot";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import PieChart from "examples/Charts/PieChart";

// Data
import gpuUsageData from "layouts/dashboards/analytics/data/gpuUsageData";
import activeInstancesData from "layouts/dashboards/analytics/data/activeInstancesData";
import resourceAllocationData from "layouts/dashboards/analytics/data/resourceAllocationData";
import systemPerformanceData from "layouts/dashboards/analytics/data/systemPerformanceData";
import costBreakdownData from "layouts/dashboards/analytics/data/costBreakdownData";

function Analytic() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Total GPU Usage"
                  description="Current GPU usage across all instances"
                  date="updated 2 min ago"
                  chart={gpuUsageData.usage}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Current Active Instances"
                  description="Number of active instances running"
                  date="updated 4 min ago"
                  chart={activeInstancesData.instances}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "93%", display: "flex", flexDirection: "column" }}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                  <MDTypography variant="h6">Resource Allocation</MDTypography>
                  <Tooltip title="See resource allocation" placement="bottom" arrow>
                    <MDButton variant="outlined" color="secondary" size="small" circular iconOnly>
                      <Icon>info</Icon>
                    </MDButton>
                  </Tooltip>
                </MDBox>
                <MDBox mt={1} flex={1} display="flex" alignItems="center">
                  <Grid container alignItems="center">
                    <Grid item xs={8}>
                      <MDBox p={2}>
                        <PieChart 
                          chart={resourceAllocationData.allocation}
                          height="15rem" // Adjust height as needed
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={4}>
                      <MDBox display="flex" flexDirection="column" alignItems="flex-start" p={2}>
                        <MDBox mb={1}>
                          <MDBadgeDot color="info" size="sm" badgeContent="CPU" />
                        </MDBox>
                        <MDBox mb={1}>
                          <MDBadgeDot color="primary" size="sm" badgeContent="Memory" />
                        </MDBox>
                        <MDBox mb={1}>
                          <MDBadgeDot color="dark" size="sm" badgeContent="Disk" />
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="primary"
                  title="Overall System Performance"
                  description="System uptime and latency"
                  date="updated 10 min ago"
                  chart={systemPerformanceData.performance}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="warning"
                  title="Cost Breakdown"
                  description="Cost per instance or user"
                  date="updated 10 min ago"
                  chart={costBreakdownData.cost}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytic;

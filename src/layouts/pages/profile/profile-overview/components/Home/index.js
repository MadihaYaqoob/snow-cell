/// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Data
import Configurator from "examples/Configurator/DeepConfigurator";
import DataTable from "examples/Tables/DataTable";
import Sessions from "layouts/account/settings/components/Sessions";

export const rows = [
  { id: 1, user: "John Doe", action: "Created Container", timestamp: "2024-08-01 10:00:00" },
  { id: 2, user: "Jane Smith", action: "Removed Container", timestamp: "2024-08-01 11:00:00" },
  // Add more data as needed
];

export const columns = [
  { Header: "ID", accessor: "id", width: "10%" },
  { Header: "User", accessor: "user", width: "30%" },
  { Header: "Action", accessor: "action", width: "40%" },
  { Header: "Timestamp", accessor: "timestamp", width: "20%" },
];

const userActivityDataTable = {
  columns,
  rows,
};
function Home() {
  return (
    <>
      <MDBox mt={5} mb={3}>
        <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>
          <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
          <ProfileInfoCard
            title="Profile Information"
            description="Hi, I’m Alec Thompson. Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term."
            info={{
              fullName: "Alec M. Thompson",
              mobile: "(44) 123 1234 123",
              email: "alecthompson@mail.com",
              location: "USA",
            }}
            social={[
              {
                link: "https://www.facebook.com/CreativeTim/",
                icon: <FacebookIcon />,
                color: "facebook",
              },
              {
                link: "https://twitter.com/creativetim",
                icon: <TwitterIcon />,
                color: "twitter",
              },
              {
                link: "https://www.instagram.com/creativetimofficial/",
                icon: <InstagramIcon />,
                color: "instagram",
              },
            ]}
            action={{ route: "", tooltip: "Edit Profile" }}
            shadow={false}
          />
          <Divider orientation="vertical" sx={{ mx: 0 }} />
        </Grid>
      </MDBox>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium">
          User Activity History
        </MDTypography>
        <MDBox mb={2}>
          <DataTable table={userActivityDataTable} canSearch />
        </MDBox>
      </MDBox>

      <Grid item xs={12}>
        <Sessions />
      </Grid>

      <Divider />

      {/* Resource Usage Statistics */}
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Resource Usage
        </MDTypography>
        <MDBox mb={2}>
          <MDTypography variant="body2" color="text">
            Total resources allocated: X units
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Average usage: Y units
          </MDTypography>
          {/* Implement a component to display resource usage statistics */}
        </MDBox>
      </MDBox>
      <Divider />
    </>
  );
}

export default Home;

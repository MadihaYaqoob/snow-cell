import React, { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { useTheme } from "@mui/material/styles";

import { useMaterialUIController } from "context";

const Cell = (props) => {
  const { value } = props;
  const theme = useTheme(); // Access the theme using useTheme hook

  return (
    <MDBox display="flex" alignItems="center">
      <MDTypography
        component="span"
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor:
            value === "Active"
              ? theme.palette.mode === "dark"
                ? "#00FF00"
                : "green"
              : theme.palette.mode === "dark"
              ? "#FF0000"
              : "red", // Adjust colors based on dark mode
          display: "inline-block",
          mr: 1,
        }}
      />
      <MDTypography
        variant="body2"
        sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }} // Ensure text is readable in both modes
      >
        {value}
      </MDTypography>
    </MDBox>
  );
};

// Define columns for DataTable
const containerRegistryColumns = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  {
    Header: "Status",
    accessor: "status",
    Cell,
  },
  { Header: "Actions", accessor: "actions" },
];

const currentImagesColumns = [
  { Header: "ID", accessor: "id" },
  { Header: "Image", accessor: "image" },
  { Header: "Size", accessor: "size" },
  { Header: "Actions", accessor: "actions" },
];

function ImagesPage() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const openMenu = (event, imageId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedImageId(imageId);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
    setSelectedImageId(null);
  };

  // Example data for tables (replace with actual data)
  const containerRegistryData = [
    { id: 1, name: "Container 1", status: "Active" },
    { id: 2, name: "Container 2", status: "Inactive" },
  ];

  const currentImagesData = [
    { id: 1, image: "Image 1", size: "10MB" },
    { id: 2, image: "Image 2", size: "20MB" },
  ];

  const rowsContainerRegistry = containerRegistryData.map((item) => ({
    ...item,
    actions: (
      <MDBox display="flex" alignItems="center">
        <MDButton variant="text" color="error" sx={{ minWidth: "auto", px: 0 }}>
          <Icon>delete</Icon>
        </MDButton>
        <MDButton
          variant="text"
          color={darkMode ? "#B0B0B0" : "dark"}
          sx={{ minWidth: "auto", px: 0, ml: 1 }}
        >
          <Icon>edit</Icon>
        </MDButton>
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
          open={Boolean(menuAnchorEl) && selectedImageId === item.id}
          onClose={closeMenu}
          keepMounted
        >
          <MenuItem>Action 1</MenuItem>
          <MenuItem>Action 2</MenuItem>
        </Menu>
      </MDBox>
    ),
  }));

  const rowsCurrentImages = currentImagesData.map((item) => ({
    ...item,
    actions: (
      <MDBox display="flex" alignItems="center">
        <MDButton variant="text" color="error" sx={{ minWidth: "auto", px: 0.5 }}>
          <Icon>delete</Icon>
        </MDButton>
        <MDButton
          variant="text"
          color={darkMode ? "#B0B0B0" : "dark"}
          sx={{ minWidth: "auto", px: 0.5, ml: 1 }}
        >
          <Icon>edit</Icon>
        </MDButton>
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
          open={Boolean(menuAnchorEl) && selectedImageId === item.id}
          onClose={closeMenu}
          keepMounted
        >
          <MenuItem>Action 1</MenuItem>
          <MenuItem>Action 2</MenuItem>
        </Menu>
      </MDBox>
    ),
  }));

  const containerRegistryDataTable = {
    columns: containerRegistryColumns,
    rows: rowsContainerRegistry,
  };

  const currentImagesDataTable = {
    columns: currentImagesColumns,
    rows: rowsCurrentImages,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Container Registry
              </MDTypography>
              <MDTypography variant="button" color="text">
                Below is the container registry information.
              </MDTypography>
            </MDBox>
            <MDBox p={3}>
              <DataTable table={containerRegistryDataTable} canSearch />
            </MDBox>
          </Card>
        </MDBox>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Current Loaded Images
              </MDTypography>
              <MDTypography variant="button" color="text">
                Below is the list of currently loaded images.
              </MDTypography>
            </MDBox>
            <MDBox p={3}>
              <DataTable table={currentImagesDataTable} canSearch />
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

Cell.propTypes = {
  value: PropTypes.string,
};

export default ImagesPage;

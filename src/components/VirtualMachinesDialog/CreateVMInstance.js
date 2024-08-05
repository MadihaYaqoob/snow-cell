import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ServerCard from "examples/Cards/ServerCards";
import MDInput from "components/MDInput";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";

// data
import {
  cardData,
  operatingSystems,
  memoryOptions,
  gpuCountOptions,
  coreCountOptions,
  filesystemTypeOptions,
  filesystemSizeOptions,
  regions,
} from "./data/gpuData";

function ServerNameInput({ serverName, setServerName }) {
  return (
    <MDBox>
      <MDTypography variant="h6" fontWeight="bold" gutterBottom>
        Give your server a name
      </MDTypography>
      <MDInput
        fullWidth
        label="Server Name"
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
        variant="standard"
      />
    </MDBox>
  );
}

ServerNameInput.propTypes = {
  serverName: PropTypes.string.isRequired,
  setServerName: PropTypes.func.isRequired,
};

function RegionDropdown({ selectedRegion, setSelectedRegion }) {
  return (
    <MDBox>
      <MDTypography variant="h6" fontWeight="bold" gutterBottom>
        Select Region
      </MDTypography>
      <Autocomplete
        options={regions}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          setSelectedRegion(newValue?.value || "");
        }}
        renderInput={(params) => <MDInput {...params} label="Region" variant="standard" />}
      />
    </MDBox>
  );
}

RegionDropdown.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  setSelectedRegion: PropTypes.func.isRequired,
};

function ChooseOperatingSystem({ selectedOS, setSelectedOS, attachPublicIP, setAttachPublicIP }) {
  const handleOSClick = (osId) => {
    setSelectedOS(osId);
  };

  return (
    <Card sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5" fontWeight="bold">
          Operating System
        </MDTypography>
        <MDTypography variant="body2" color="text" mb={2}>
          Select an OS Image that will run on your virtual server.
        </MDTypography>
        <Grid container spacing={3}>
          {operatingSystems.map((os) => (
            <Grid item xs={12} sm={4} key={os.id}>
              <MDButton
                fullWidth
                variant="outlined"
                color={selectedOS === os.id ? "info" : "info"}
                onClick={() => handleOSClick(os.id)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "150px",
                  border: selectedOS === os.id ? "2px solid #1A73E8" : "1px solid #ddd",
                }}
              >
                <img src={os.icon} alt={os.name} style={{ width: "54px", height: "54px" }} />
                <MDTypography variant="h6" fontWeight="bold" mt={1}>
                  {os.name}
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  {os.version}
                </MDTypography>
              </MDButton>
            </Grid>
          ))}
        </Grid>
        <MDBox mt={3} display="flex" alignItems="center">
          <MDTypography variant="body2" color="text" mr={1}>
            Attach Public IP
          </MDTypography>
          <Tooltip title="Attaching a public IP allows your virtual server to be accessible from the internet.">
            <Switch checked={attachPublicIP} onChange={() => setAttachPublicIP(!attachPublicIP)} />
          </Tooltip>
        </MDBox>
      </MDBox>
    </Card>
  );
}

ChooseOperatingSystem.propTypes = {
  selectedOS: PropTypes.string,
  setSelectedOS: PropTypes.func.isRequired,
  attachPublicIP: PropTypes.bool.isRequired,
  setAttachPublicIP: PropTypes.func.isRequired,
};

function CreateVMInstance() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [serverName, setServerName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedOS, setSelectedOS] = useState(null);
  const [attachPublicIP, setAttachPublicIP] = useState(false);
  const [memory, setMemory] = useState("");
  const [gpuCount, setGpuCount] = useState(1);
  const [coreCount, setCoreCount] = useState(1);
  const [filesystemType, setFilesystemType] = useState("");
  const [filesystemSize, setFilesystemSize] = useState("");

  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    setSelectedCards((prevSelectedCards) =>
      prevSelectedCards.includes(id)
        ? prevSelectedCards.filter((cardId) => cardId !== id)
        : [...prevSelectedCards, id]
    );
  };

  const handleDeployNow = async () => {
    const selectedCard = cardData.find((card) => selectedCards.includes(card.id));
    if (!selectedCard) {
      alert("Please select a GPU type.");
      return;
    }

    if (!serverName) {
      alert("Please provide a server name.");
      return;
    }

    if (!selectedRegion) {
      alert("Please select a region.");
      return;
    }

    if (!memory) {
      alert("Please select memory.");
      return;
    }

    if (!gpuCount) {
      alert("Please select GPU count.");
      return;
    }

    if (!coreCount) {
      alert("Please select core count.");
      return;
    }

    if (!filesystemType) {
      alert("Please select filesystem type.");
      return;
    }

    if (!filesystemSize) {
      alert("Please select filesystem size.");
      return;
    }

    const vmData = {
      name: serverName,
      type: selectedCard.title,
      hardware: selectedCard.description,
      available: selectedCard.availability === "In Stock",
      ip_address: "", // Leave blank, should be set by the backend during provisioning
      uptime: 0, // Start at 0, backend should update this based on VM's running time
      cost_per_hour: parseFloat(selectedCard.price.replace("$", "").replace("/hr", "")),
      region: selectedRegion,
      status: "creating",
      memory,
      gpu_count: gpuCount,
      core_count: coreCount,
      filesystem_type: filesystemType,
      filesystem_size: filesystemSize,
      user_id: null, // Update as needed
    };

    try {
      const response = await axios.post("http://localhost:8000/vm_instances", vmData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/services/virtual-servers");
      }
    } catch (error) {
      console.error("Error deploying VM instance:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3}>
        <MDBox pb={5}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={7}>
              <MDBox mb={1}>
                <MDTypography variant="h5">Configure Virtual Machine</MDTypography>
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="body2" color="text">
                  The Snowcell virtual machines are highly configurable and can be customized to fit
                  your needs.
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: "right" }}>
              <MDButton variant="gradient" color="info">
                <Icon>add</Icon>&nbsp; Add New
              </MDButton>
            </Grid>
          </Grid>

          {/* Server Name Input */}
          <MDBox mt={5}>
            <ServerNameInput serverName={serverName} setServerName={setServerName} />
          </MDBox>

          {/* Region Selection */}
          <MDBox mt={5}>
            <RegionDropdown selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
          </MDBox>

          {/* Hardware Configuration */}
          <MDBox mt={5}>
            <MDTypography variant="h5" fontWeight="bold" gutterBottom>
              Hardware Configuration
            </MDTypography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  options={memoryOptions}
                  getOptionLabel={(option) => option}
                  onChange={(event, newValue) => setMemory(newValue)}
                  renderInput={(params) => (
                    <MDInput {...params} label="Memory (GB)" variant="standard" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  options={gpuCountOptions}
                  getOptionLabel={(option) => `${option}`}
                  onChange={(event, newValue) => setGpuCount(newValue)}
                  renderInput={(params) => (
                    <MDInput {...params} label="GPU Count" variant="standard" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  options={coreCountOptions}
                  getOptionLabel={(option) => `${option}`}
                  onChange={(event, newValue) => setCoreCount(newValue)}
                  renderInput={(params) => (
                    <MDInput {...params} label="Core Count" variant="standard" fullWidth />
                  )}
                />
              </Grid>
            </Grid>
          </MDBox>

          {/* GPU Instance Selection */}
          <MDBox mt={7}>
            <Grid container spacing={3}>
              {cardData.map((card) => (
                <Grid item xs={12} md={6} lg={3} key={card.id}>
                  <MDBox mb={1.5} mt={1.5}>
                    <ServerCard
                      image={card.image}
                      title={card.title}
                      description={card.description}
                      availability={card.availability}
                      price={card.price}
                      isChecked={selectedCards.includes(card.id)}
                      onChange={() => handleCheckboxChange(card.id)}
                    />
                  </MDBox>
                </Grid>
              ))}
            </Grid>
          </MDBox>

          {/* Attach Filesystem */}
          <MDBox mt={5}>
            <MDTypography variant="h5" fontWeight="bold" gutterBottom>
              Attach Filesystem
            </MDTypography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={filesystemTypeOptions}
                  getOptionLabel={(option) => option}
                  onChange={(event, newValue) => setFilesystemType(newValue)}
                  renderInput={(params) => (
                    <MDInput {...params} label="Filesystem Type" variant="standard" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={filesystemSizeOptions}
                  getOptionLabel={(option) => option}
                  onChange={(event, newValue) => setFilesystemSize(newValue)}
                  renderInput={(params) => (
                    <MDInput {...params} label="Filesystem Size" variant="standard" fullWidth />
                  )}
                />
              </Grid>
            </Grid>
          </MDBox>

          {/* Operating System Selection */}
          <MDBox mt={5}>
            <ChooseOperatingSystem
              selectedOS={selectedOS}
              setSelectedOS={setSelectedOS}
              attachPublicIP={attachPublicIP}
              setAttachPublicIP={setAttachPublicIP}
            />
          </MDBox>

          {/* Deploy and Cancel Buttons */}
          <MDBox mt={5} display="flex" justifyContent="flex-end">
            <MDButton
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/services/virtual-servers")}
              sx={{ mr: 2 }}
            >
              Cancel
            </MDButton>
            <MDButton variant="contained" color="info" onClick={handleDeployNow}>
              Deploy Now
            </MDButton>
          </MDBox>
        </MDBox>
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateVMInstance;

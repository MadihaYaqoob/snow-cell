// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "layouts/account/components/FormField";

// Data
import selectData from "layouts/account/settings/components/BasicInfo/data/selectData";
import MDButton from "components/MDButton";

function IncreaseQuotaForm() {
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              defaultValue={2}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="Requested CPU Increase (Cores)"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              defaultValue={4}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="Requested Memory Increase (GB)"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              defaultValue={20}
              options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="Requested Storage Increase (GB)"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Reason for Increase"
              placeholder="Storage is less"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <MDBox
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              style={{ float: "right" }}
            >
              <MDButton variant="outlined" color="primary">
                Send Request
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default IncreaseQuotaForm;

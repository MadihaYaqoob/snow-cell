import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

function ServerCard({
  color,
  image,
  title,
  description,
  availability,
  price,
  isChecked,
  onChange,
}) {
  return (
    <Card>
      <MDBox p={2}>
        <MDBox display="flex" alignItems="center">
          <MDAvatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 1, mt: -6, borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl }}
          />
          <MDBox ml={2} mt={-2} lineHeight={0}>
            <MDTypography variant="h6" textTransform="capitalize" fontWeight="medium">
              {title}
            </MDTypography>
          </MDBox>
          <Checkbox
            checked={isChecked}
            onChange={onChange}
            sx={{
              ml: "auto",
              mt: -1,
              alignSelf: "flex-start",
            }}
          />
        </MDBox>
        <MDBox my={2} lineHeight={1}>
          <MDTypography variant="body2" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox display="flex" flexDirection="column" lineHeight={0}>
            <MDTypography variant="button" fontWeight="medium">
              {price}
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="secondary">
              Price
            </MDTypography>
          </MDBox>
          <MDBox display="flex" flexDirection="column" lineHeight={0}>
            <MDTypography variant="button" fontWeight="medium">
              {availability}
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="secondary">
              Availability
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ServerCard
ServerCard.defaultProps = {
  color: "dark",
  isChecked: false,
  onChange: () => {},
};

// Typechecking props for the ServerCard
ServerCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  availability: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default ServerCard;

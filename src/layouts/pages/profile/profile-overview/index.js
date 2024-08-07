// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Overview page components
import Header from "layouts/pages/profile/components/Header";

import Home from "./components/Home";
import DeepConfigurator from "examples/Configurator/DeepConfigurator";
import Billing from "./components/Billing";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header tabs={[<Home key="1" />, <Billing key="2" />, <DeepConfigurator key="3" />]}></Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;

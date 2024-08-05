// Images
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAsana from "assets/images/small-logos/logo-asana.svg";
import logoInvision from "assets/images/small-logos/logo-invision.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoUbuntu from "assets/images/small-logos/logo-ubuntu.svg";
import logoWindows from "assets/images/small-logos/logo-windows.svg";
import logoRedHat from "assets/images/small-logos/logo-redhat.svg";
import logoNvidia from "assets/images/small-logos/nvidia-icon.svg";

export const memoryOptions = ["4GB", "128GB", "256GB", "512GB"];
export const gpuCountOptions = Array.from({ length: 16 }, (_, i) => i + 1);
export const coreCountOptions = Array.from({ length: 128 }, (_, i) => i + 1);
export const filesystemTypeOptions = ["SSD", "HDD"];
export const filesystemSizeOptions = ["100GB", "500GB", "1TB", "2TB"];
export const regions = [
  { value: "us-west", label: "US West" },
  { value: "us-east", label: "US East" },
  // Add other regions as necessary
];
export const cardData = [
  {
    id: 1,
    image: logoNvidia,
    title: "Nvidia",
    description: "HGX H100 - 80GB",
    availability: "In Stock",
    price: "$5/hr",
  },
  {
    id: 2,
    image: logoNvidia,
    title: "Nvidia",
    description: "H100 PCIe - 40GB",
    availability: "Out of Stock",
    price: "$4.5/hr",
  },
  {
    id: 3,
    image: logoNvidia,
    title: "Nvidia",
    description: "A100 NVLink - 80GB",
    availability: "In Stock",
    price: "$4/hr",
  },
  {
    id: 4,
    image: logoNvidia,
    title: "Nvidia",
    description: "A100 PCIe - 40GB",
    availability: "Limited Stock",
    price: "$3.8/hr",
  },
  {
    id: 5,
    image: logoNvidia,
    title: "Nvidia",
    description: "A100 NVLink - 80GB",
    availability: "In Stock",
    price: "$4/hr",
  },
  {
    id: 6,
    image: logoNvidia,
    title: "Nvidia",
    description: "A100 PCIe - 40GB",
    availability: "Out of Stock",
    price: "$3.8/hr",
  },
];

export const operatingSystems = [
  {
    id: "os-1",
    name: "Ubuntu",
    version: "20.04 LTS",
    icon: logoUbuntu,
  },
  {
    id: "os-2",
    name: "Windows",
    version: "2019",
    icon: logoWindows,
  },
  {
    id: "os-3",
    name: "Red Hat Linux",
    version: "8",
    icon: logoRedHat,
  },
];

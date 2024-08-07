// src/api/billing.js

export const fetchCostOfInstances = async () => {
  // Simulate API call
  return {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: {
      label: "Cost of Instances",
      data: [300, 400, 500, 600, 700, 800],
    },
  };
};

export const fetchAccruedCosts = async () => {
  // Replace with actual API call
  return {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: {
      label: "Accrued Cost",
      data: [20, 35, 18, 70, 89, 33],
    },
  };
};

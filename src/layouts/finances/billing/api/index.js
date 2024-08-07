// src/api/billing.js

export const fetchCostOfInstances = async () => {
  // Simulate API call
  return {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Cost of Instances",
        data: [300, 400, 500, 600, 700, 800],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
};

export const fetchAccruedCosts = async () => {
  // Simulate API call
  return {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Accrued Costs",
        data: [100, 150, 200, 250],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
};

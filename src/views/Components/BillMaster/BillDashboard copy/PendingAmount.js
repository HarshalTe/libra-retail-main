import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["ICIC", "Axis", "RBL", "SBI"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const PendingAmount = () => (
  <>
    {/* <div className="header">
      <h1 className="title">Pending Amount</h1>
    </div> */}
    <Bar data={data} options={options} />
  </>
);

export default PendingAmount;

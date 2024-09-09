import React from "react";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["NET Amount", "GST", "TDS"],
  datasets: [
    {
      label: "# of Votes",
      data: [1000, 180, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        // "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        // "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const PendingAmountPie = () => (
  <>
    {/* <div className="header">
      <h1 className="title">Pending Amount</h1>
    </div> */}
    <Pie data={data} />
  </>
);

export default PendingAmountPie;

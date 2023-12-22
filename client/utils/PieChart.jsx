import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["In Progess", 6],
  ["Cancelled TV", 3],
  ["Pending", 6],
  ["Completed", 11],
  ["Not Started", 5],
];

export const options = {
  title: "My Daily Activities",
  is3D: true,
};

export default function PieChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"70%"}
      height={"200px"}
    />
  );
}

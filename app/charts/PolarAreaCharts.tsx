"use client";
import React, { useEffect } from "react";
import ApexCharts from "apexcharts"; // Import ApexCharts library

const PolarAreaChartComponent = () => {
  useEffect(() => {
    const options = {
      series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
      chart: {
        type: "polarArea",
      },
      stroke: {
        colors: ["#023e8a"],
      },
      fill: {
        opacity: 0.8,
      },
      colors: ["#023e8a", "#adb5bd"],
      tooltip: {
        theme: "dark",
        style: {
          fontSize: "12px",
          fontFamily: undefined,
          background: ["#023e8a", "#adb5bd"],
        },
        marker: {
          show: true,
          fillColors: ["#023e8a", "#adb5bd"],
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Cleanup function to destroy the chart on component unmount
    return () => {
      chart.destroy();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return <div id="chart">{/* Chart will be rendered here */}</div>;
};

export default PolarAreaChartComponent;

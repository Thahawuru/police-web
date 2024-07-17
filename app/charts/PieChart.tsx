"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      series: [44, 55, 100],
      chart: {
        type: "pie",
        height: 300,
      },
      labels: ["Identity", "License", "Both"],
      colors: ["#023e8a", "#adb5bd", "#023e8a"],
      dataLabels: {
        enabled: true,
        style: { fontSize: "14px", colors: ["#fff"] },
      },
      legend: {
        position: "bottom",
        labels: {
          colors: ["#000"],
          useSeriesColors: false,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontSize: "12px",
          color: "#023e8a",
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, chartOptions);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div ref={chartRef} id="chart" />;
};

export default PieChart;

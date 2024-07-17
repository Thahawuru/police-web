"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      series: [
        { data: [44, 55, 41, 64, 22, 43, 21] },
        { data: [53, 32, 33, 52, 13, 44, 32] },
      ],
      chart: {
        type: "bar",
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: { position: "top" },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: { fontSize: "12px", colors: ["#fff"] },
      },
      stroke: { show: true, width: 1, colors: ["#fff"] },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontSize: "12px",
          color: "#023e8a",
        },
      },
      xaxis: { categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007] },
      colors: ["#023e8a", "#adb5bd"],
    };

    const chart = new ApexCharts(chartRef.current, chartOptions);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div ref={chartRef} id="chart" />;
};

export default BarChart;

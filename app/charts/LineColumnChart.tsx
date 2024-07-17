"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const ColumnChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      series: [
        {
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        },
      ],
      chart: {
        height: 300,
        type: "bar", // Changed to bar for column chart
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          endingShape: 'rounded',
        },
      },
      fill: {
        opacity: 1,
        colors: ["#023e8a", "#adb5bd"],
      },
      labels: [
        "01/01/2003",
        "02/01/2003",
        "03/01/2003",
        "04/01/2003",
        "05/01/2003",
        "06/01/2003",
        "07/01/2003",
        "08/01/2003",
        "09/01/2003",
        "10/01/2003",
        "11/01/2003",
      ],
      xaxis: {
        type: "datetime",
        labels: {
          format: "dd MMM",
        },
      },
      yaxis: {
        title: {
          text: "Points",
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
      colors: ["#023e8a", "#adb5bd"],
    };

    const chart = new ApexCharts(chartRef.current, chartOptions);
    chart.render();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return <div ref={chartRef} id="chart" />;
};

export default ColumnChart;

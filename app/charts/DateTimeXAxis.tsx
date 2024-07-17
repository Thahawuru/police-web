"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const DateTimeXAxis: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      series: [
        {
          data: [
            [1327359600000, 30.95],
            [1327446000000, 31.34],
            [1361919600000, 39.6],
            [1362006000000, 40.34],
            [1362092400000, 40.1],
            [1362351600000, 40.52],
            [1362438000000, 40.84],
            [1362524400000, 40.44],
            [1362783600000, 40.1],
            [1362870000000, 40.0],
            [1362956400000, 40.0],
            [1363042800000, 39.29],
            [1363302000000, 38.16],
            [1363388400000, 38.15],
            [1363474800000, 38.15],
            [1363561200000, 38.85],
            [1363820400000, 38.53],
            [1363906800000, 38.27],
            [1363993200000, 38.4],
            [1364079600000, 38.22],
            [1364338800000, 38.17],
            [1364425200000, 38.31],
            [1364511600000, 38.72],
            [1364598000000, 38.57],
            [1364684400000, 38.55],
            [1364943600000, 38.27],
            [1365030000000, 38.42],
            [1365116400000, 38.1],
            [1365202800000, 38.32],
            [1365289200000, 38.24],
            [1365548400000, 38.52],
            [1365634800000, 38.23],
            [1365721200000, 38.39],
            [1365807600000, 38.36],
            [1365894000000, 38.22],
            [1366153200000, 38.09],
            [1366239600000, 38.16],
            [1366326000000, 38.15],
            [1366412400000, 38.1],
            [1366498800000, 37.88],
            [1366758000000, 38.0],
            [1366844400000, 38.14],
            [1366930800000, 38.6],
            [1367017200000, 38.64],
            [1367103600000, 38.89],
            [1367362800000, 38.6],
            [1367449200000, 38.51],
            [1367535600000, 38.4],
            [1367622000000, 38.51],
            [1367708400000, 38.27],
          ],
        },
      ],
      chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#ffffff",
            label: {
              show: true,
              text: "Support",
              style: {
                color: "#fff",
                background: "#023e8a",
              },
            },
          },
        ],
        xaxis: [
          {
            x: new Date("14 Nov 2012").getTime(),
            borderColor: "#999",
            yAxisIndex: 0,
            label: {
              show: true,
              text: "Rally",
              style: {
                color: "#fff",
                background: "#023e8a",
              },
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      xaxis: {
        type: "datetime",
        min: new Date("12 Oct 2012").getTime(),
        tickAmount: 6,
        labels: {
          style: {
            colors: "#adb5bd",
          },
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      colors: ["#023e8a"],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    const resetCssClasses = (activeEl: EventTarget | null) => {
      const els = document.querySelectorAll("button");
      els.forEach((el) => {
        el.classList.remove("active");
      });
      if (activeEl) {
        (activeEl as HTMLElement).classList.add("active");
      }
    };

    const zoomX = (startDate: Date, endDate: Date) => {
      chart.zoomX(startDate.getTime(), endDate.getTime());
    };

    const addEventListenerWithNullCheck = (
      id: string,
      callback: (e: Event) => void
    ) => {
      const el = document.querySelector(`#${id}`);
      if (el) {
        el.addEventListener("click", callback);
      }
    };

    addEventListenerWithNullCheck("one_month", (e: Event) => {
      resetCssClasses(e.target);
      zoomX(new Date("28 Jan 2013"), new Date("27 Feb 2013"));
    });

    addEventListenerWithNullCheck("six_months", (e: Event) => {
      resetCssClasses(e.target);
      zoomX(new Date("27 Sep 2012"), new Date("27 Feb 2013"));
    });

    addEventListenerWithNullCheck("one_year", (e: Event) => {
      resetCssClasses(e.target);
      zoomX(new Date("27 Feb 2012"), new Date("27 Feb 2013"));
    });

    addEventListenerWithNullCheck("ytd", (e: Event) => {
      resetCssClasses(e.target);
      zoomX(new Date("01 Jan 2013"), new Date("27 Feb 2013"));
    });

    addEventListenerWithNullCheck("all", (e: Event) => {
      resetCssClasses(e.target);
      zoomX(new Date("23 Jan 2012"), new Date("27 Feb 2013"));
    });

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return <div id="chart-timeline" ref={chartRef}></div>;
};

export default DateTimeXAxis;

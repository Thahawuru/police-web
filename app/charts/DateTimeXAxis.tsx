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
            [1327359600000, 25.95],
            [1327446000000, 26.34],
            [1361919600000, 29.6],
            [1362006000000, 30.34],
            [1362092400000, 30.1],
            [1362351600000, 31.52],
            [1362438000000, 32.84],
            [1362524400000, 33.44],
            [1362783600000, 34.1],
            [1362870000000, 34.0],
            [1362956400000, 34.0],
            [1363042800000, 33.29],
            [1363302000000, 32.16],
            [1363388400000, 32.15],
            [1363474800000, 32.15],
            [1363561200000, 32.85],
            [1363820400000, 32.53],
            [1363906800000, 32.27],
            [1363993200000, 32.4],
            [1364079600000, 32.22],
            [1364338800000, 32.17],
            [1364425200000, 32.31],
            [1364511600000, 32.72],
            [1364598000000, 32.57],
            [1364684400000, 32.55],
            [1364943600000, 32.27],
            [1365030000000, 32.42],
            [1365116400000, 32.1],
            [1365202800000, 32.32],
            [1365289200000, 32.24],
            [1365548400000, 32.52],
            [1365634800000, 32.23],
            [1365721200000, 32.39],
            [1365807600000, 32.36],
            [1365894000000, 32.22],
            [1366153200000, 32.09],
            [1366239600000, 32.16],
            [1366326000000, 32.15],
            [1366412400000, 32.1],
            [1366498800000, 31.88],
            [1366758000000, 32.0],
            [1366844400000, 32.14],
            [1366930800000, 32.6],
            [1367017200000, 32.64],
            [1367103600000, 32.89],
            [1367362800000, 32.6],
            [1367449200000, 32.51],
            [1367535600000, 32.4],
            [1367622000000, 32.51],
            [1367708400000, 32.27],
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
            y: 25,
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

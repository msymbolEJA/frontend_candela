import React from "react";
import { Line } from "react-chartjs-2";
import useFetch from "../../hooks/useFetch";

export default function App({ dates }) {
  const waDaily = useFetch(
    `report/daily/wa/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    {
      results: [],
      count: 0,
    }
  );
  const cawaDaily = useFetch(
    `report/daily/cawa/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    {
      results: [],
      count: 0,
    }
  );
  const wa2Daily = useFetch(
    `report2/daily/wa/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    {
      results: [],
      count: 0,
    },
    "http://216.128.135.6:8080/"
  );
  const neDaily = useFetch(
    `report/daily/ne/?end_date=${dates.end_date}&start_date=${dates.start_date}`,
    {
      results: [],
      count: 0,
    }
  );

  const waData = {
    labels: waDaily?.response?.results?.map((each) => each?.date?.substr(5)),
    datasets: [
      {
        label: "Sum Item",
        data: waDaily?.response?.results?.map((each) => each?.sum_item),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Total Price",
        data: waDaily?.response?.results?.map((each) => each?.sum_total_price),
        fill: false,
        borderColor: "#742774",
        tension: 0.4,
        yAxisID: "total",
      },
    ],
  };
  const cawaData = {
    labels: cawaDaily?.response?.results?.map((each) => each?.date?.substr(5)),
    datasets: [
      {
        label: "Sum Item",
        data: cawaDaily?.response?.results?.map((each) => each?.sum_item),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Total Price",
        data: cawaDaily?.response?.results?.map((each) => each?.sum_total_price),
        fill: false,
        borderColor: "#742774",
        tension: 0.4,
        yAxisID: "total",
      },
    ],
  };
  const wa2Data = {
    labels: wa2Daily?.response?.results?.map((each) => each?.date?.substr(5)),
    datasets: [
      {
        label: "Sum Item",
        data: wa2Daily?.response?.results?.map((each) => each?.sum_item),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Total Price",
        data: wa2Daily?.response?.results?.map((each) => each?.sum_total_price),
        fill: false,
        borderColor: "#742774",
        tension: 0.4,
        yAxisID: "total",
      },
    ],
  };
  const neData = {
    labels: neDaily?.response?.results?.map((each) => each?.date?.substr(5)),
    datasets: [
      {
        label: "Sum Item",
        data: neDaily?.response?.results?.map((each) => each?.sum_item),
        fill: false,
        borderColor: "#059BFF",
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Total Price",
        data: neDaily?.response?.results?.map((each) => each?.sum_total_price),
        fill: true,
        backgroundColor: "#F6E2E5",
        borderColor: "#F3BD6A",
        tension: 0.4,
        yAxisID: "total",
      },
    ],
  };

  return (
    <div style={{ width: "90%" }}>
      <div
        style={{
          border: "3px solid rgba(75,192,192,1)",
          padding: "50px",
          margin: "25px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ marginBottom: 25, textDecoration: "underline" }}>
          Walmart
        </h2>
        <Line
          data={waData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                type: "linear",
                position: "right",
                grid: {
                  drawOnChartArea: false,
                },
              },
              total: {
                beginAtZero: true,
                type: "linear",
                position: "left",
                ticks: {
                  callback: function (value, index, values) {
                    return `$ ${value}`;
                  },
                },
              },
            },
          }}
        />
      </div>
     
      <div
        style={{
          border: "3px solid rgba(75,192,192,1)",
          padding: "50px",
          margin: "25px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ marginBottom: 25, textDecoration: "underline" }}>
          Walmart-Ca
        </h2>
        <Line
          data={cawaData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                type: "linear",
                position: "right",
                grid: {
                  drawOnChartArea: false,
                },
              },
              total: {
                beginAtZero: true,
                type: "linear",
                position: "left",
                ticks: {
                  callback: function (value, index, values) {
                    return `$ ${value}`;
                  },
                },
              },
            },
          }}
        />
      </div>
      <div
        style={{
          border: "3px solid rgba(75,192,192,1)",
          padding: "50px",
          margin: "25px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ marginBottom: 25, textDecoration: "underline" }}>
          Walmart2
        </h2>
        <Line
          data={wa2Data}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                type: "linear",
                position: "right",
                grid: {
                  drawOnChartArea: false,
                },
              },
              total: {
                beginAtZero: true,
                type: "linear",
                position: "left",
                ticks: {
                  callback: function (value, index, values) {
                    return `$ ${value}`;
                  },
                },
              },
            },
          }}
        />
      </div>
      {/* <div
        style={{
          border: "3px solid #F3BD6A",
          padding: "50px",
          margin: "25px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ marginBottom: 25, textDecoration: "underline" }}>
          NewEgg / NewEgg Bussiness
        </h2>
        <Line
          data={neData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                type: "linear",
                position: "right",
                grid: {
                  drawOnChartArea: false,
                },
              },
              total: {
                beginAtZero: true,
                type: "linear",
                position: "left",
                ticks: {
                  callback: function (value, index, values) {
                    return `$ ${value}`;
                  },
                },
              },
            },
          }}
        />
      </div> */}
    </div>
  );
}

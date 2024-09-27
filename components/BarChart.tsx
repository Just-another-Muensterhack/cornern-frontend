// BarChart.tsx
import React from 'react';
import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  registerables
} from 'chart.js';
import {negative, neutral, positive} from "@/twind/config";
import 'chartjs-plugin-annotation';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, ...registerables);

type BarChartProps = {
  data: number[],
  labels: string[]
}

const BarChart = ({data, labels}: BarChartProps) => {
  const average = data.reduce((sum, value) => sum + value, 0) / data.length;

  const getColor = (value: number) => {
    if (value <= 40) {
      return positive;
    }
    if (value <= 70) {
      return neutral;
    }
    return negative;
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        type: "bar" as const,
        data: data,
        backgroundColor: data.map(value => getColor(value)),
        borderRadius: 6,
        borderSkipped: false,
      },
    ]
  }

  return <Bar
    data={chartData}
    options={{
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        y: {
          max: 120,
          beginAtZero: true,
          position: "left",
          ticks: {
            stepSize: 10,
            callback: function (value) {
              if (value === 40 || value === 80 || value === 120) {
                return `${value}dB`;
              }
              return '';
            },
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        y1: {
          max: 120,
          beginAtZero: true,
          position: "right",
          ticks: {
            stepSize: 5,
            callback: function (value) {
              if (value === 40) {
                return `0.7`;
              }
              if (value === 55) {
                return "1.0"
              }
              if (value === 70) {
                return "1.3"
              }
              if (value === 80) {
                return "1.6"
              }
              if (value === 100) {
                return "2.0"
              }
              return '';
            },
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        annotation: {
          annotations: {
            line1: {
              value: average,
              borderColor: '#ffffff',
              borderWidth: 2,
              label: {
                content: 'Average',
                position: 'end',
                color: 'black',
              }
            },
          },
        },
      },
    }}
  />
};

export default BarChart;

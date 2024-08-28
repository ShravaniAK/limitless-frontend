import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { parseISO, format } from 'date-fns';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Register TimeScale for date handling
);

const Graph = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }
  const formattedData = {
    labels: data.map(item => parseISO(item.date)),
    datasets: [
      {
        label: 'Price',
        data: data.map(item => item.price),
        fill: false,
        backgroundColor: '#dbb7ff40',
        borderColor: 'purple',
        borderWidth: 2,
        tension: 0.5,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw} `;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day', 
          tooltipFormat: 'MMM d, yyyy HH:mm',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };

  return (
    <div className='w-full'>
      <Line data={formattedData} options={options} />
    </div>
  );
};

export default Graph;

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Import PointElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const TransactionsChart = ({ transactions }) => {
  // Filter completed transactions
  const completedTransactions = transactions.filter(transaction => transaction.status === 'Completed');

  // Prepare data for the chart
  const data = {
    labels: completedTransactions.map(transaction => transaction.assetId.name),
    datasets: [
      {
        label: 'Completed Transactions',
        data: completedTransactions.map(transaction => transaction.price),
        fill: false,
        backgroundColor: '#dbb7ff40',
        borderColor: 'purple',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Assets',
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
    <div className="h-1/2 w-full">
      <h2 className="text-xl font-bold">Completed Transactions</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TransactionsChart;

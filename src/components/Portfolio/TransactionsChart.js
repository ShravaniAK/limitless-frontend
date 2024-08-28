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
import 'chartjs-adapter-date-fns'; 


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, TimeScale, Title, Tooltip, Legend);

const TransactionsChart = ({ transactions }) => {

  const completedTransactions = transactions.filter(transaction => transaction.status === 'Completed');
  const data = {
    labels: completedTransactions.map(transaction => new Date(transaction.date)),
    datasets: [
      {
        label: 'Transaction Value',
        data: completedTransactions.map(transaction => transaction.quantity * transaction.price),
        fill: false,
        backgroundColor: '#dbb7ff40',
        borderColor: 'purple',
        borderWidth: 2,
        tension: 0.5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time', 
        title: {
          display: true,
          text: 'Date',
        },
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
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

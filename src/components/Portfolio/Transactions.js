import React, { useState } from 'react';

const Transactions = ({ transactions }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredTransactions = transactions.filter(
    (transaction) => selectedStatus === 'All' || transaction.status === selectedStatus
  );

  return (
    <div className="recent-activity h-[48%] overflow-y-scroll">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      <div className="flex space-x-4 items-center mb-4">
        <button
          className={`px-4 py-1 rounded-xl ${selectedStatus === 'All' ? 'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
          onClick={() => setSelectedStatus('All')}
        >
          All
        </button>
        <button
          className={`px-4 py-1 rounded-xl ${selectedStatus === 'Pending' ? 'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
          onClick={() => setSelectedStatus('Pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-1 rounded-xl ${selectedStatus === 'Completed' ? 'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
          onClick={() => setSelectedStatus('Completed')}
        >
          Completed
        </button>
        <button
          className={`px-4 py-1 rounded-xl ${selectedStatus === 'Cancelled' ? 'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
          onClick={() => setSelectedStatus('Cancelled')}
        >
          Cancelled
        </button>
      </div>

      <ul className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => {
            const date = new Date(transaction.date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            return (
              <li key={transaction._id} className="flex justify-between items-center bg-white p-2">
                <div className="flex items-center space-x-4">
                  <span className="activity-icon text-blue-500">
                    <img src={transaction.assetId.logo} alt={transaction.assetId.name} className="w-8 h-8 object-cover rounded-lg" />
                  </span>
                  <span className="activity-name  font-semibold truncate">{transaction.assetId.name}</span>
                </div>
                <div className=" text-gray-600 text-center">{formattedDate}</div>
                <div className=" text-gray-600 text-center font-semibold">{transaction.price}</div>
                <div className=" text-gray-600 text-center font-semibold">{transaction.quantity}</div>
                <div className=" text-gray-600 text-center font-semibold">{transaction.price * transaction.quantity}</div>
                {(() => {
                  switch (transaction.status) {
                    case 'Completed':
                      return <span className="text-green-500 font-semibold">Completed</span>;
                    case 'Pending':
                      return <span className="text-yellow-500 font-semibold">Pending</span>;
                    case 'Cancelled':
                      return <span className="text-red-500 font-semibold">Cancelled</span>;
                    default:
                      return <span className="text-gray-500 font-semibold">Unknown</span>;
                  }
                })()}
              </li>
            );
          })
        ) : (
          <li className="recent-activity h-[48%]">
            <span className="text-gray-600">No transactions found</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Transactions;

import React, { useState } from 'react';

const MyListings = ({ userListings }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredListings = userListings.filter(
    (listing) => selectedStatus === 'All' || listing.status === selectedStatus
  );

  return (
    <div className="recent-activity h-[48%] overflow-scroll">
      <h2 className="text-xl font-bold mb-4">My Listings</h2>

      {/* Status Switcher Buttons */}
      <div className="mb-4 flex space-x-2">
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
          className={`px-4 py-1 rounded-xl ${selectedStatus === 'Processing' ? 'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
          onClick={() => setSelectedStatus('Processing')}
        >
          Processing
        </button>
        <button
          className={`px-4 py-1 rounded-xl ${selectedStatus === 'Completed' ?'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
          onClick={() => setSelectedStatus('Completed')}
        >
          Completed
        </button>
        <button
          className={`px-4 py-1 rounded-xl ${selectedStatus === 'Cancelled' ?'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
          onClick={() => setSelectedStatus('Cancelled')}
        >
          Cancelled
        </button>
      </div>

      {/* Listings */}
      <ul className="space-y-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((transaction) => {
            const date = new Date(transaction.date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            return (
              <li key={transaction._id} className="flex justify-between items-center bg-white p-2">
                <div className="flex items-center space-x-4">
                  <span className="activity-icon text-blue-500">
                    <img src={transaction.assetId.logo} className="w-8 h-8 object-cover rounded-lg" alt={transaction.assetId.name} />
                  </span>
                  <span className="activity-name w-32 font-semibold truncate">{transaction.assetId.name}</span>
                </div>
                <div className="w-40 text-gray-600 text-center">{formattedDate}</div>
                <div className="w-20 text-gray-600 text-center font-semibold">{transaction.price}</div>
              </li>
            );
          })
        ) : (
          <li className="flex justify-center items-center bg-white p-2">
            <span className="text-gray-600">No recent activity</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MyListings;

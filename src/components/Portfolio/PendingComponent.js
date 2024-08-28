// src/components/Portfolio/PendingConfirmations.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPendingConfirmation } from '../../redux/portfolioSlices';
import { fetchUserTransactions } from '../../redux/portfolioSlices';
const apiURL = process.env.REACT_APP_API_URL;

const PendingComponent = () => {
  const dispatch = useDispatch();
  const pendingConfirmation = useSelector((state) => state.portfolioData.pendingConfirmation);

  const handleConfirm = async (transactionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
      await axios.post(
        `${apiURL}/transaction/confirm`,
        { transactionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setPendingConfirmation(pendingConfirmation.filter(transaction => transaction._id !== transactionId)));
      dispatch(fetchUserTransactions());
    } catch (error) {
      console.error('Error confirming transaction:', error);
    }
  };

  const handleCancel = async (transactionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
      await axios.post(
        `${apiURL}/transaction/cancel`,
        { transactionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setPendingConfirmation(pendingConfirmation.filter(transaction => transaction._id !== transactionId)));
    } catch (error) {
      console.error('Error canceling transaction:', error);
    }
  };

  return (
    <div className="h-1/2 pt-8">
      <h2 className="text-xl font-bold mb-4">Pending Confirmations</h2>
      <ul className="space-y-4">
        {pendingConfirmation.length > 0 ? (
          pendingConfirmation.map((transaction) => (
            <li key={transaction._id} className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center space-x-4">
                <img src={transaction.assetId.logo} alt={transaction.assetId.name} className="w-8 h-8 object-cover rounded-lg" />
                <span className="font-semibold">{transaction.assetId.name}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleConfirm(transaction._id)}
                  className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleCancel(transaction._id)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-600">No pending confirmations</li>
        )}
      </ul>
    </div>
  );
};

export default PendingComponent;

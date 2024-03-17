import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "../App.css"


const Portfolio = () => {
  const [assetName, setAssetName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [trans, setTransactions] = useState([]);
  const [userAssets, setUserAssets] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }

        const response = await axios.get(
          'https://limitless-hackathon-backend.onrender.com/transaction/all',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Ensure that the response.data is an array before setting it to transactions state
          setTransactions(response.data.transactions);
          console.log(trans);

      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchUserAssets = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }

        const response = await axios.get(
          'https://limitless-hackathon-backend.onrender.com/asset/userAssets',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserAssets(response.data.user.assets);
      } catch (error) {
        console.error('Error fetching user assets:', error);
      }
    };

    fetchTransactions();
    fetchUserAssets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token'); 
  
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const response = await axios.post(
        'https://limitless-hackathon-backend.onrender.com/order/create',
        {
          assetName,
          ticker,
          description,
          assetClass,
          price,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
      // Reset form fields after successful submission
      setAssetName('');
      setTicker('');
      setDescription('');
      setAssetClass('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      console.error('Error posting listing:', error);
    }
  };
  return (
    <div className="container </div>mx-auto p-4">
      <div >
      <h2 className="text-2xl font-bold mb-4">Post New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="assetName" className="block font-semibold">
            Asset Name
          </label>
          <input
            type="text"
            id="assetName"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="ticker" className="block font-semibold">
            Ticker
          </label>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="assetClass" className="block font-semibold">
            Asset Class
          </label>
          <input
            type="text"
            id="assetClass"
            value={assetClass}
            onChange={(e) => setAssetClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-semibold">
            Price
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block font-semibold">
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Post Listing
        </button>
      </form>
      </div>
      <div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div className="grid grid-cols-1 gap-4">
          {trans.map((transaction) => (
            <div key={transaction._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-gray-600 mb-2"><span className="font-semibold">Asset Name:</span> {transaction.assetId.name}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Ticker:</span> {transaction.assetId.ticker}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Quantity:</span> {transaction.quantity}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Price:</span> {transaction.price}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Status:</span> {transaction.status}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Date:</span> {new Date(transaction.date).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Assets</h2>
      <div className="grid grid-cols-1 gap-4">
        {userAssets.map(asset => (
          <div key={asset._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <p className="text-gray-600 mb-2"><span className="font-semibold">Asset Name:</span> {asset.assetId.name}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Ticker:</span> {asset.assetId.ticker}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Quantity:</span> {asset.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Portfolio;
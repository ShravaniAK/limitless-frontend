import React, { useState } from 'react';
import axios from 'axios';
import "../App.css"

const Portfolio = () => {
  const [assetName, setAssetName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

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
    <div className="container mx-auto p-4">
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
  );
};

export default Portfolio;
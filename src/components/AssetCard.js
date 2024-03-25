import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "../App.css"
import axios from 'axios';
const AssetCard = ({ asset ,id}) => {
  

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    let data = JSON.stringify({
      "orderId": id
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://limitless-hackathon-backend.onrender.com/order/buy',
      headers: { 
        'Authorization':`Bearer ${localStorage.getItem("token")}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">
          {asset.assetId.name} ({asset.assetId.ticker})
        </h3>
      <p className="text-gray-600 mb-2">{asset.assetId.description}</p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Asset Class:</span> {asset.assetClass}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Quantity:</span> {asset.quantity}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Price:</span> {asset.price}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Status:</span> {asset.status}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Date:</span>{' '}
        {new Date(asset.date).toLocaleString()}
      </p>
      <button className='buy-button' onClick={handleSubmit}>Buy Now</button>
    </div>
  );
};

export default AssetCard;
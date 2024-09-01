import React from 'react';
import axios from 'axios';
import "../App.css";

const AssetCard = ({ asset, id }) => {
  
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
      data: data
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
    <div className="asset-card">
      <div className="asset-card-row">
        <div className="asset-symbol">
          <input type="checkbox" />
          <span>{asset.assetId.ticker}</span>
        </div>
        <div className="asset-name">{asset.assetId.name}</div>
        <div className="asset-price">{asset.price}</div>
        <div className="asset-change">+0.11 (6.59%)</div> 
        <div className="asset-high">{/* High value here */}</div>
        <div className="asset-low">{/* Low value here */}</div>
        <div className="asset-volume">{/* Volume value here */}</div>
        <div className="asset-mktcap">{/* Market Cap value here */}</div>
        <div className="asset-updated">{/* Updated time here */}</div>
        <button className="buy-button" onClick={handleSubmit}>Buy Now</button>
      </div>
    </div>
  );
};

export default AssetCard;

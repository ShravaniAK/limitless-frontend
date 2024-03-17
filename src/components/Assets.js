import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://limitless-hackathon-backend.onrender.com/order/findListings?assetclass=Equity');
        setAssets(response.data.orders);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssets = assets.filter(asset => {
    if (!searchTerm) {
      return true;
    }
    return (asset.assetId.name && asset.assetId.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (asset.assetId.ticker && asset.assetId.ticker.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="list">
      <input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredAssets.map(asset => (
        // Use Link component to navigate to asset details page
        <Link to={`/assets/${asset._id}`} key={asset._id} className="card-link">
          <div className="card">
            <img src={asset.logo} alt={asset.assetId.name} />
            <div className="card-content">
              <h2>{asset.assetId.name}</h2>
              <p>{asset.description}</p>
              <p>Ticker: {asset.assetId.ticker}</p>
              <p>Asset Class: {asset.assetClass}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Assets;

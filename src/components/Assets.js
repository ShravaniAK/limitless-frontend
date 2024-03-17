import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://limitless-hackathon-backend.onrender.com/asset');
        setAssets(response.data.assets);
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
    return (asset.name && asset.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (asset.ticker && asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()));
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
        <Link to={`/assets/${asset._id}`} key={asset._id} className="card-link">
          <div className="card">
            <img src={asset.logo} alt={asset.name} />
            <div className="card-content">
              <h2>{asset.name}</h2>
              <p>{asset.description}</p>
              <p>Ticker: {asset.ticker}</p>
              <p>Asset Class: {asset.assetClass}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Assets;
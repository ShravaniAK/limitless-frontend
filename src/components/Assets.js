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
<<<<<<< HEAD
    <div className="container flex flex-col  mx-auto p-4">
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-64 p-2 border border-gray-300 rounded mr-4"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAssets.map(asset => (
          <Link to={`/assets/${asset._id}`} key={asset._id} className="block">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={asset.assetId.logo} alt={asset.assetId.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{asset.assetId.name}</h2>
                <p className="text-gray-600">{asset.description}</p>
                <p>Ticker: {asset.assetId.ticker}</p>
                <p>Asset Class: {asset.assetClass}</p>
              </div>
=======
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
>>>>>>> c2770447c197bb5b3cbd54f779eacdb46b6a8aa9
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Assets;
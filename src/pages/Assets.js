import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from '../Hooks/useDebounce';
import { useSelector } from 'react-redux';
import defaultImage from '../assets/default.jpg';

const Assets = () => {
  const assets = useSelector((state) => state.assets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearchTerm = !debouncedSearchTerm || 
      (asset.name && asset.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
      (asset.ticker && asset.ticker.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || asset.assetClass === selectedCategory;

    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="container flex flex-col mx-auto p-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col items-center mb-4 space-y-2 md:space-y-0 md:flex-row md:space-x-4">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-64 px-4 p-1 border border-secondary rounded-xl"
        />
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <button
            className={`px-4 py-1 rounded-xl ${selectedCategory === 'All' ? 'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
            onClick={() => handleCategoryChange('All')}
          >
            All
          </button>
          <button
            className={`px-4 py-1 rounded-xl ${selectedCategory === 'Equity' ? 'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
            onClick={() => handleCategoryChange('Equity')}
          >
            Equity
          </button>
          <button
            className={`px-4 py-1 rounded-xl ${selectedCategory === 'Commodity' ? 'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
            onClick={() => handleCategoryChange('Commodity')}
          >
            Commodity
          </button>
          <button
            className={`px-4 py-1 rounded-xl ${selectedCategory === 'Currency' ? 'bg-purple-300 text-black' : 'bg-primary text-secondary'}`}
            onClick={() => handleCategoryChange('Currency')}
          >
            Currency
          </button>
        </div>
      </div>

      {/* Asset Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAssets.map(asset => (
            <Link to={`/assets/${asset._id}`} key={asset._id} className="block">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <img 
                  src= {asset.logo || defaultImage}
                  alt={asset.name} 
                  className="w-full h-48 object-cover rounded-t-lg" 
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{asset.name}</h2>
                  <p>{asset.ticker}</p>
                  <p>{asset.assetClass}</p>
                </div>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Assets;

import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css"
const AssetCard = ({ asset }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <Link to={`/assets/${asset._id}`}>
        <h3 className="text-xl font-semibold mb-2">
          {asset.assetId.name} ({asset.assetId.ticker})
        </h3>
      </Link>
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
    </div>
  );
};

export default AssetCard;
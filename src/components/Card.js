import React from 'react';
import '../App.css'
import AssetCard from './AssetCard';

// const AssetCard = ({ asset }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//       <h3 className="text-xl font-semibold mb-2">
//         {asset.assetId.name} ({asset.assetId.ticker})
//       </h3>
//       <img src={asset.assetId.logo} alt="" />
//       <p className="text-gray-600 mb-2">{asset.assetId.description}</p>
//       <p className="text-gray-600 mb-1">
//         <span className="font-semibold">Asset Class:</span> {asset.assetClass}
//       </p>
//       <p className="text-gray-600 mb-1">
//         <span className="font-semibold">Quantity:</span> {asset.quantity}
//       </p>
//       <p className="text-gray-600 mb-1">
//         <span className="font-semibold">Price:</span> {asset.price}
//       </p>
//       <p className="text-gray-600 mb-1">
//         <span className="font-semibold">Status:</span> {asset.status}
//       </p>
//       <p className="text-gray-600">
//         <span className="font-semibold">Date:</span>{' '}
//         {new Date(asset.date).toLocaleString()}
//       </p>
//     </div>
//   );
// };

const Card = ({ assets }) => {
  return (
      <>
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6"> List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <AssetCard key={asset._id} asset={asset} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Card;
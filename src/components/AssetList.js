import React from 'react';
import AssetCard from './AssetCard';

const AssetList = ({ assets }) => {
  return (
    <div>
      {assets.map((asset) => (
        <AssetCard key={asset._id} asset={asset} id={asset._id} />
      ))}
    </div>
  );
};

export default AssetList;
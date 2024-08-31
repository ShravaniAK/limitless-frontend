import React from 'react';
import { useSelector } from 'react-redux';
import AssetList from '../components/AssetList';

const Marketplace = () => {
  const assets = useSelector((state) => state.marketData);
  // fiter assets to only show listings which have status as pending
  const filteredAssets = assets.filter((asset) => asset.status === 'Pending');
  return (
    <div className='main'>
      <AssetList assets={filteredAssets} />
    </div>
  );
};

export default Marketplace;

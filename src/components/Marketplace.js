import React, { useState, useEffect } from 'react';
import Card from './Card';

const Marketplace = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://limitless-hackathon-backend.onrender.com/order/findListings?assetclass=Equity');
        const data = await response.json();
        setAssets(data.orders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Card assets={assets} />
    </div>
  );
};

export default Marketplace;
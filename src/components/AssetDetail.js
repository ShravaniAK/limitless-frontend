import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AssetDetail = () => {
  const { id } = useParams();
  const [assetDetail, setAssetDetail] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://limitless-hackathon-backend.onrender.com/order/findListings');
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchAssetDetail = async () => {
      try {
        const order = orders.find((order) => order._id === id);
        if (order && order.assetId && order.assetId._id) {
          const response = await fetch(`https://limitless-hackathon-backend.onrender.com/asset/${order.assetId._id}`);
          const data = await response.json();
          setAssetDetail(data.asset);
        }
      } catch (error) {
        console.error('Error fetching asset detail:', error);
      }
    };

    fetchAssetDetail();
  }, [id, orders]);

  if (!assetDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{assetDetail.name} ({assetDetail.ticker})</h2>
      <p>{assetDetail.description}</p>
      <p>Asset Class: {assetDetail.assetClass}</p>
      <p>Logo: <img src={assetDetail.logo} alt={assetDetail.name} /></p>
    </div>
  );
};

export default AssetDetail;
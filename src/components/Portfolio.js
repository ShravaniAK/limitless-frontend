import React, { useState,useEffect } from 'react';
import PlaceholderLoading from 'react-placeholder-loading'

import axios from 'axios';
import "../App.css"


const Portfolio = () => {
  const [assetName, setAssetName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [trans, setTransactions] = useState([]);
  const [userAssets, setUserAssets] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }

        const response = await axios.get(
          'https://limitless-hackathon-backend.onrender.com/transaction/all',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Ensure that the response.data is an array before setting it to transactions state
          setTransactions(response.data.transactions);
          console.log(trans);

      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchUserAssets = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }

        const response = await axios.get(
          'https://limitless-hackathon-backend.onrender.com/asset/userAssets',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserAssets(response.data.user.assets);
      } catch (error) {
        console.error('Error fetching user assets:', error);
      }
    };

    fetchTransactions();
    fetchUserAssets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token'); 
  
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
  
      const response = await axios.post(
        'https://limitless-hackathon-backend.onrender.com/order/create',
        {
          assetName,
          ticker,
          description,
          assetClass,
          price,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
      // Reset form fields after successful submission
      setAssetName('');
      setTicker('');
      setDescription('');
      setAssetClass('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      console.error('Error posting listing:', error);
    }
  };

if(trans.length==0){
  return(
  <div className="container mx-auto p-4">
    <div className="post-new-listing mb-8">
      <h2 className="text-2xl font-bold mb-4">Post New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="assetName" className="block font-semibold">Asset Name</label>
          <input
            type="text"
            id="assetName"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="ticker" className="block font-semibold">Ticker</label>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-semibold">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="assetClass" className="block font-semibold">Asset Class</label>
          <input
            type="text"
            id="assetClass"
            value={assetClass}
            onChange={(e) => setAssetClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-semibold">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block font-semibold">Quantity</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Post Listing
        </button>
      </form>
    </div>

    
    <div className="recent-activity mb-8 ">
        <h2 className="text-1xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
              <li className="flex justify-between items-center bg-white p-2">
              <div className="flex items-center space-x-4">
                <span className="activity-icon text-blue-500">
           <PlaceholderLoading shape="rect" width={20} height={20} />

                  </span>
                <span className="activity-name w-32 font-semibold truncate"><PlaceholderLoading shape="rect" width={60} height={20} /></span>
              </div>
              <div className="w-40 text-gray-600 text-center"><PlaceholderLoading shape="rect" width={30} height={20} /></div>
           <PlaceholderLoading shape="rect" width={40} height={20} />
            </li>
        </ul>
        <ul className="space-y-4">
              <li className="flex justify-between items-center bg-white p-2">
              <div className="flex items-center space-x-4">
                <span className="activity-icon text-blue-500">
           <PlaceholderLoading shape="rect" width={20} height={20} />

                  </span>
                <span className="activity-name w-32 font-semibold truncate"><PlaceholderLoading shape="rect" width={60} height={20} /></span>
              </div>
              <div className="w-40 text-gray-600 text-center"><PlaceholderLoading shape="rect" width={30} height={20} /></div>
           <PlaceholderLoading shape="rect" width={40} height={20} />
            </li>
        </ul>
        <ul className="space-y-4">
              <li className="flex justify-between items-center bg-white p-2">
              <div className="flex items-center space-x-4">
                <span className="activity-icon text-blue-500">
           <PlaceholderLoading shape="rect" width={20} height={20} />

                  </span>
                <span className="activity-name w-32 font-semibold truncate"><PlaceholderLoading shape="rect" width={60} height={20} /></span>
              </div>
              <div className="w-40 text-gray-600 text-center"><PlaceholderLoading shape="rect" width={30} height={20} /></div>
           <PlaceholderLoading shape="rect" width={40} height={20} />
            </li>
        </ul>
        
      </div>
    </div>)
}
else{



  return (
    <div className="container mx-auto p-4">
    <div className="post-new-listing mb-8">
      <h2 className="text-2xl font-bold mb-4">Post New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="assetName" className="block font-semibold">Asset Name</label>
          <input
            type="text"
            id="assetName"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="ticker" className="block font-semibold">Ticker</label>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-semibold">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="assetClass" className="block font-semibold">Asset Class</label>
          <input
            type="text"
            id="assetClass"
            value={assetClass}
            onChange={(e) => setAssetClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-semibold">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block font-semibold">Quantity</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Post Listing
        </button>
      </form>
    </div>

    
    <div className="recent-activity mb-8 ">
        <h2 className="text-1xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          {
          trans.map((transaction) => {
            const date = new Date(transaction.date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            return (
              <li key={transaction._id} className="flex justify-between items-center bg-white p-2">
              <div className="flex items-center space-x-4">
                <span className="activity-icon text-blue-500">
                  <img src={`https://source.unsplash.com/random/200x200?sig=${transaction._id}`} className="w-8 h-8 object-cover rounded-lg" />
                </span>
                <span className="activity-name w-32 font-semibold truncate">{transaction.assetId.name}</span>
              </div>
              <div className="w-40 text-gray-600 text-center">{formattedDate}</div>
              <div className="w-20 text-gray-600 text-center font-semibold">{transaction.price}</div>
            </li>
          )})}
        </ul>
      </div>
    </div>
  );
};}

export default Portfolio;
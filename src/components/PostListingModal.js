// src/components/PostListingModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app root element to manage accessibility

const PostListingModal = ({ isOpen, onClose, onSubmit }) => {
  const [assetName, setAssetName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ assetName, ticker, description, assetClass, price, quantity });
    setAssetName('');
    setTicker('');
    setDescription('');
    setAssetClass('');
    setPrice('');
    setQuantity('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Post New Listing Modal"
      className="modal"
      overlayClassName="overlay"
    >
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
        <div className='flex items-center justify-between'>
        <button type="submit" className="bg-primary text-black py-2 px-4 rounded hover:text-secondary">
          Post Listing
        </button>
        <button onClick={onClose} className="text-red-500 hover:text-red-700">Close</button>
        </div>
      </form>
     
    </Modal>
  );
};

export default PostListingModal;

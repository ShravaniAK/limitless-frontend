// src/components/Portfolio.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PostListingModal from '../components/PostListingModal';
import transactionIcon from '../icons/transaction.svg';
import Transactions from '../components/Portfolio/Transactions';
import MyListings from '../components/Portfolio/MyListings';
import TransactionsChart from '../components/Portfolio/TransactionsChart';
import PendingConfirmations from '../components/Portfolio/PendingComponent';
const apiURL = process.env.REACT_APP_API_URL;

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    assetName: '',
    ticker: '',
    description: '',
    assetClass: '',
    price: '',
    quantity: '',
  });

  const transactions = useSelector((state) => state.portfolioData.transactions);
  const userListings = useSelector((state) => state.portfolioData.listings);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
      const response = await axios.post(
        `${apiURL}/order/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error('Error posting listing:', error);
    }
  };

  return (
    <div className="px-12 flex flex-col h-[calc(100vh-120px)]">

      <PostListingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formState={formState}
        setFormState={setFormState}
      />
      <div className='w-100 flex h-full justify-between'>
      <div className='flex flex-col w-[48%] justify-between'>
      <Transactions transactions={transactions} />
      <MyListings userListings={userListings} />
      
      </div>
      <div className='flex flex-col w-[50%] '>
      <div className='flex items-center justify-end'>
        <button onClick={openModal} className="bg-primary text-black py-1 px-4 rounded-xl hover:text-secondary mb-4 ">
          Add New Listing
        </button>
      </div>
      <TransactionsChart transactions={transactions} />
      <PendingConfirmations />      
      </div>
      </div>
    </div>
  );
};

export default Portfolio;

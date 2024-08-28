import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    assets: [],
    transactions: [],
    listings: [],
    pendingConfirmation: [],
  },
  reducers: {
    setUserAssets: (state, action) => {
      state.assets = action.payload;
    },
    setUserTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setUserListings: (state, action) => {
      state.listings = action.payload
    },
    setPendingConfirmation: (state, action) => {
      state.pendingConfirmation = action.payload
    },
  },
});

export const { setUserAssets, setUserTransactions, setUserListings,setPendingConfirmation } = portfolioSlice.actions;

export const fetchUserAssets = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const response = await axios.get('http://localhost:5000/asset/userAssets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setUserAssets(response.data.userAssets));
  } catch (error) {
    console.error('Error fetching user assets:', error);
  }
};

export const fetchUserTransactions = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const response = await axios.get(
      'http://localhost:5000/transaction/all',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setUserTransactions(response.data.transactions));
  } catch (error) {
    console.error('Error fetching user transactions:', error);
  }
}

export const fetchUserListings = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const response = await axios.get(
      'http://localhost:5000/order/history',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setUserListings(response.data.orders));
  } catch (error) {
    console.error('Error fetching user listings:', error);
  }
}

export const fetchPendingConfirmation = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const response = await axios.get(
      'http://localhost:5000/transaction/seller',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setPendingConfirmation(response.data.filteredTransactions));
  } catch (error) {
    console.error('Error fetching user listings:', error);
  }
}


export default portfolioSlice.reducer;

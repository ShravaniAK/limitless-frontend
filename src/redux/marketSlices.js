import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;


const marketDataSlice = createSlice({
  name: 'marketData',
  initialState: [],
  reducers: {
    setMarketData: (state, action) => action.payload,
  },
});

export const { setMarketData } = marketDataSlice.actions;

export const fetchMarketData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiURL}/order/findListings`);
    dispatch(setMarketData(response.data.orders));
  } catch (error) {
    console.error('Error fetching market data:', error);
  }
};

export default marketDataSlice.reducer;

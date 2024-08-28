import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const assetsSlice = createSlice({
  name: 'assets',
  initialState: [],
  reducers: {
    setAssets: (state, action) => action.payload,
  },
});

export const { setAssets } = assetsSlice.actions;

export const fetchAssets = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/asset');
    dispatch(setAssets(response.data.assets));
  } catch (error) {
    console.error('Error fetching assets:', error);
  }
};

export default assetsSlice.reducer;

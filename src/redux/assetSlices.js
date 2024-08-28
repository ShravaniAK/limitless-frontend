import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

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
    console.log(apiURL);
    const response = await axios.get(`${apiURL}/asset`);
    dispatch(setAssets(response.data.assets));
  } catch (error) {
    console.error('Error fetching assets:', error);
  }
};

export default assetsSlice.reducer;

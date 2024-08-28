import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from './assetSlices';
import marketDataReducer from './marketSlices';
import portfolioDataReducer from './portfolioSlices';

const store = configureStore({
  reducer: {
    assets: assetsReducer,
    marketData: marketDataReducer,
    portfolioData: portfolioDataReducer,
  },
});

export default store;

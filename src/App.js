import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Portfolio from './pages/Portfolio';
import Marketplace from './pages/Marketplace';
import Assets from './pages/Assets';
import AssetDetail from './components/AssetDetail';
import { fetchAssets } from './redux/assetSlices';
import { fetchMarketData } from './redux/marketSlices';
import { fetchUserAssets } from './redux/portfolioSlices';
import { fetchUserTransactions } from './redux/portfolioSlices';
import { fetchUserListings } from './redux/portfolioSlices';
import { fetchPendingConfirmation } from './redux/portfolioSlices';

function App() {
  const user = localStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAssets());
    dispatch(fetchMarketData());
    dispatch(fetchUserAssets());
    dispatch(fetchUserTransactions());
    dispatch(fetchUserListings());
    dispatch(fetchPendingConfirmation());
  }, [dispatch]);

  return (
    <div>
      {user && <Navbar />}
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<><Navbar /><Home /></>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/marketplace" element={<Marketplace  />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/:id" element={<AssetDetail />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <ToastContainer
        limit={1}
        pauseOnHover
        closeButton
      />
    </div>
  );
}

export default App;

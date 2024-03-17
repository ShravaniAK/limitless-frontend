import { Route, Routes, Navigate } from "react-router-dom";
import About from "./components/About";
import Assets from "./components/Assets";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Marketplace from "./components/Marketplace";
import Portfolio from "./components/Portfolio";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar";
import AssetDetail from "./components/AssetDetail";


function App() {
	const user = localStorage.getItem("token");

	return (
		<div>
		{user && <Navbar />}
		<Routes>
		  <Route path="/" element={<Home />} />
		  {!user && <Route path="/signup" element={<Signup />} />}
		  {!user && <Route path="/login" element={<Login />} />}
		  {user && <Route path="/portfolio" element={<Portfolio />} />}
		  {user && <Route path="/marketplace" element={<Marketplace />} />}
		  {user && <Route path="/assets" element={<Assets />} />}
		  {user && <Route path="/assets/:id" element={<AssetDetail />} />}
		  {user && (
			<>
			  <Route path="/login" element={<Navigate to="/" replace />} />
			  <Route path="/signup" element={<Navigate to="/" replace />} />
			</>
		  )}
		  {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
		</Routes>
	  </div>
	);
}

export default App;
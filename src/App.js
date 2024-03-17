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
		{user &&	<Navbar />}
		<Routes>
      {user && <Route path="/" exact element={<Home />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/portfolio" exact element={<Portfolio />} />
			<Route path="/marketplace" exact element={<Marketplace />} />
			<Route path="/assets" exact element={<Assets />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/assets/:id" element={<AssetDetail />} />
		</Routes>
		</div>
	);
}

export default App;
import { useRef, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../main.css";
import { Link, useNavigate } from "react-router-dom";
import Portfolio from "./Portfolio";

function Navbar() {
    const navRef = useRef();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const storedUserEmail = localStorage.getItem("userEmail");
        if (storedUserEmail) {
            setUserEmail(storedUserEmail);
        }
    }, []);

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    return (
        <header>
            <h3>LOGO</h3>
            <nav ref={navRef}>
                <Link to="/Portfolio">Portfolio</Link>
                <Link to="/marketplace">Marketplace</Link>
                <Link to="/Assets">Assets</Link>
                <Link to="/Aboutus">About US</Link>
                <span>{userEmail}</span>
				<button  onClick={handleLogout}>
					Logout
				</button>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
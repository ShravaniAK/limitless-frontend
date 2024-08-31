import { useRef, useEffect, useState } from 'react'
import '../main.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import MenuIcon from '../icons/menuIcon.svg'
import HomeIcon from '../icons/homeIcon.svg'
import MarketIcon from '../icons/marketIcon.svg'
import AssetIcon from '../icons/assetIcon.svg'



function Navbar () {
  const navRef = useRef()
  const location = useLocation()

  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [profile, setProfile] = useState('')
  const [showDropdown, setShowDropdown] = useState(false);


  const getuserdeatils = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://limitless-hackathon-backend.onrender.com/user/getuserdeatils',
      headers: {
        Authorization:
          `bearer ${localStorage.getItem("token")}`
      }
    }
    axios
      .request(config)
      .then(response => {
        setUserName(response.data.user.name)
        setProfile(response.data.user.accountBalance)
      })
      .catch(error => {
      })
  }
  useEffect(() => {
    getuserdeatils()
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserEmail) {
        setUserEmail(storedUserEmail);
    }
}, []);
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <h3>OTC Nexus</h3>
      <nav ref={navRef}>
        <Link to='/' className={location.pathname === '/' ? 'active' : ''}>
        {location.pathname === '/' ? <img src={HomeIcon} alt="home" />: null} 
          Home
        </Link>
        <Link
          to='/marketplace'
          className={location.pathname === '/marketplace' ? 'active' : ''}
        >
          {location.pathname === '/marketplace' ? <img src={MarketIcon} alt="market" />: null} 
          Market Place
        </Link>
        <Link
          to='/assets'
          className={location.pathname === '/assets' ? 'active' : ''}
        >
          {location.pathname === '/assets' ? <img src={AssetIcon} alt="assets" />: null} 
          Assets
        </Link>
        <Link
          to='/portfolio'
          className={location.pathname === '/portfolio' ? 'active' : ''}
        >
        {location.pathname === '/portfolio' ? <img src={MenuIcon} alt="menu" />: null} 
          Portfolio
        </Link>

      </nav>

      <div className='flex justify-center items-center space-x-4'>
        <div>
          <img
            src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            width='20'
            height='20'
            alt='profile'
            className='w-8 h-8 rounded-full'  
          />
        </div>
        <div >
          <p>{userName}</p>
          <p>{profile}</p>
        </div>
        <div className="relative" onClick={toggleDropdown}>
        <img src="https://icons.veryicon.com/png/o/miscellaneous/decon/dropdown-1.png" alt="" className='w-8 h-8 rounded-full'  
        />

          {/* Dropdown menu */}
          
        </div>
        {showDropdown && (
            <div className='absolute top-16 bg-white border border-1 shadow-sm rounded-sm z-4  px-4 py-2'>
              <button onClick={handleLogout} className='text-red-600 border border-red-600 border-1 px-4 py-1 rounded-lg'>Logout</button>
            </div>
          )}
      </div>
    </header>
  )
}

export default Navbar

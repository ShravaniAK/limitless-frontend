import { useRef, useEffect, useState } from 'react'
import '../main.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import MenuIcon from '../icons/menuIcon.svg'
import HomeIcon from '../icons/homeIcon.svg'
import MarketIcon from '../icons/marketIcon.svg'
import AssetIcon from '../icons/assetIcon.svg'
import { Dropdown } from 'flowbite';
import LoadingSVG from '../assets/logo'

function Navbar () {
  const navRef = useRef()
  const location = useLocation()

  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [profile, setProfile] = useState('')



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
    localStorage.removeItem('userEmail')
    window.location.reload()
  }
  

  return (
    <header>
       < LoadingSVG />
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
        {/* <div>
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
        <div className="relative" >
        <img src="https://icons.veryicon.com/png/o/miscellaneous/decon/dropdown-1.png" alt="" className='w-8 h-8 rounded-full'  
        />          
        </div>
         */}
         
        {
          !userEmail && 
          <button type="button" onClick={() => window.location.href = '/login'}  class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">Sign in</button>
        }
        

        
<button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" class="flex text-sm bg-purple-800 rounded-full md:me-0 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-200" type="button">
<span class="sr-only">Open user menu</span>
{
userEmail &&
<img class="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user photo"/>
}

</button> 

<div id="dropdownAvatar" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>{userName}</div>
      <div class="font-medium truncate">{userEmail}</div>
    </div>
    
    <div class="py-2">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogout}>Sign out</a>
    </div>
</div>

       
      </div>
    </header>
  )
}

export default Navbar

import { useRef, useEffect, useState } from 'react'
import '../main.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
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
          Home
        </Link>
        <Link
          to='/marketplace'
          className={location.pathname === '/marketplace' ? 'active' : ''}
        >
          Market Place
        </Link>
        <Link
          to='/assets'
          className={location.pathname === '/assets' ? 'active' : ''}
        >
          Assets
        </Link>
        <Link
          to='/portfolio'
          className={location.pathname === '/portfolio' ? 'active' : ''}
        >
          Portfolio
        </Link>

      </nav>

      <div className='profilesection'>
        <div>
          <img
            className='icon'
            src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
          />
        </div>
        <div>
          <p>{userName}</p>
          <p>{profile}</p>
        </div>
        <div className="bottom-arrow" onClick={toggleDropdown}>
        <img src="https://icons.veryicon.com/png/o/miscellaneous/decon/dropdown-1.png" alt="" />

          {/* Dropdown menu */}
          {showDropdown && (
            <div className='dropdown'>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar

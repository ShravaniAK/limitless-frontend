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
  return (
    <header>
      <h3>LOGO</h3>
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
          to='/Assets'
          className={location.pathname === '/Assets' ? 'active' : ''}
        >
          Assets
        </Link>
        <Link
          to='/Portfolio'
          className={location.pathname === '/Portfolio' ? 'active' : ''}
        >
          Portfolio
        </Link>

        {/* <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button> */}
      </nav>
      {/* <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button> */}
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
        {/* <button  onClick={handleLogout}>
					Logout
				</button> */}
      </div>
    </header>
  )
}

export default Navbar

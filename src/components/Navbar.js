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
          
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_205)">
<path d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" fill="#DBB7FF"/>
<path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" fill="#DBB7FF"/>
<path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" fill="#DBB7FF"/>
<path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" fill="#DBB7FF"/>
</g>
<defs>
<clipPath id="clip0_3_205">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

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

import React from 'react';
import './home.css'
import Navbar from './Navbar';
import banner3 from '../assets/banner3.jpeg'
import img from '../assets/img.png'

const Home = () => {
  return (
    <div className='home'>
    <img src={banner3} alt="" />
    <div className="container">
      <div className="left">
       
        <img src={img} alt="" />
      </div>
      <div className="right">
      <h2>Why to use ?</h2>
        <p>Smaller investors and those with less capital are unable to access and benefit from these potentially lucrative but illiquid asset classes. The core problem is that current OTC trading platforms cater exclusively to wealthy,accredited, institutional investors and have high minimums that smaller investors cannot meet. This creates a gap in the market and limits investment opportunities for lower net worth individuals. We aim to build an OTC trading platform that opens up illiquid alternative assets to less capitalized investors. By allowing OTC trading with lower minimums, we hope to democratize alternative investing and give more investors exposure to assets like private equity and venture capital. The platform will provide an opportunity for lower ticket clients to participate in an market that has been previously closed off to them.</p> 
      </div>
    </div>
    </div>
  )
}

export default Home
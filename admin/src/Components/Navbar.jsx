import React from 'react'
import avatar from '../assets/Avatar.png'
import '../CSS/navbar.css'
const Navbar = () => {
  return (
    <div className="navbar">
       <h1>Auction</h1>
      <img className="avatarimage" src={avatar} alt=""/>
    </div>
  )
}

export default Navbar

import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/startpage.css'
const StartPage = () => {
  return (
    <div className="startpage">
      <Link to="/selectroom"><button className="startpagebutton">Start Page</button></Link>
    </div>
  )
}

export default StartPage

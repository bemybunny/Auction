import React from 'react'
import {Link} from 'react-router-dom';
import '../CSS/home.css'

const Home = () => {
  return (
    <div className="home">
        <div className="homecol">
            <div className="homebox">
                <Link to='/addproduct' style={{textDecoration:'none',color:'black'}}>
                  <span>
                    AddProduct
                  </span>
                </Link>
            </div>
            <div className="homebox">
                <Link to='/Listproduct' style={{textDecoration:'none',color:'black'}}>
                  <span>
                    ListProduct
                  </span></Link>
            </div>
        </div>
    </div>
  )
}

export default Home

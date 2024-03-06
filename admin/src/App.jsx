import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AddProduct from './Components/AddProduct'
import Home from './Components/Home'
import ListProduct from './Components/ListProduct'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/listproduct' element={<ListProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

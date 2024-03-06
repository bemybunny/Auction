import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import StartPage from './Pages/StartPage'
import SelectRoom from './Pages/SelectRoom'
import Room from './Component/Room'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/selectroom" element={<SelectRoom/>}/>
          <Route path="/join/:inputRoomId" element={<Room/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

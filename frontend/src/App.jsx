import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import StartPage from './Pages/StartPage'
import SelectRoom from './Pages/SelectRoom'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/selectroom" element={<SelectRoom/>}/>
          {/* <Route path="/join/:roomId" element={<JoinRoom/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import { Login } from './page/Login'
import {Mainpage} from './page/Mainpage'
import SpecificThread from './page/SpecificThread'
import SpecificUser from './page/SpecificUser'
import { Register } from './page/Register'
import { Threads } from './page/Threads'
import { useState } from 'react';



function App() {
  const [loggedInUser, setLoggedInUser] = useState({"username": "", "roles": "", "email": ""});
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Login />}/>         
          <Route path="/home" element={<Mainpage />}/>
          <Route path="/thread/:id" element={<SpecificThread />} />
          <Route path="/users/:id" element={<SpecificUser/>}/>
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/threads" element={<Threads />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

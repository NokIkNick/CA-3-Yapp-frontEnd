import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import { Login } from './page/Login'
import { Register } from './page/Register'
import { Home } from './page/Home'
import { useState } from 'react';


function App() {
  const [loggedInUser, setLoggedInUser] = useState({"username": "", "roles": "", "email": ""});

  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home loggedInUser={loggedInUser}/>} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

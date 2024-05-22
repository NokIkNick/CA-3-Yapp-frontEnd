import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import { Login } from './page/Login'
import { Register } from './page/Register'
import { Home } from './page/Home'


function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

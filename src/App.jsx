import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import { Login } from './page/Login'
import { Register } from './page/Register'
import { Home } from './page/Home'
import { Threads } from './page/Threads'


function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/threads" element={<Threads />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import { Login } from './page/Login'
import { Register } from './page/Register'

function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

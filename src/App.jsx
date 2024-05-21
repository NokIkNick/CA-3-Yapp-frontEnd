import './App.css'
import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import { Login } from './page/Login'

function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

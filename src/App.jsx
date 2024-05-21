import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import { Login } from './page/Login'
import {Mainpage} from './page/Mainpage'

function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Login />}/>         
          <Route path="/main" element={<Mainpage />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

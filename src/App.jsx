import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import { Login } from './page/Login'
import {Mainpage} from './page/Mainpage'
import SpecificThread from './page/SpecificThread'

function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Login />}/>         
          <Route path="/main" element={<Mainpage />}/>
          <Route path="/thread/:id" element={<SpecificThread />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

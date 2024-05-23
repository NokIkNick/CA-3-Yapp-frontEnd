import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import { Login } from './page/Login'
import {Mainpage} from './page/Mainpage'
import SpecificThread from './page/SpecificThread'
import SpecificUser from './page/SpecificUser'

function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Login />}/>         
          <Route path="/main" element={<Mainpage />}/>
          <Route path="/thread/:id" element={<SpecificThread />} />
          <Route path="/users/:id" element={<SpecificUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

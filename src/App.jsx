import { BrowserRouter,  Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './page/Login'
import {Mainpage} from './page/Mainpage'
import SpecificThread from './page/SpecificThread'
import SpecificUser from './page/SpecificUser'
import { Register } from './page/Register'
import { Threads } from './page/Threads'
import { useState } from 'react';
import {CreateThread} from './page/CreateThread';
import { AppLayout } from './layout/AppLayout'
import { AccountPage } from './page/accountPage'


function App() {
  const [loggedInUser, setLoggedInUser] = useState({"username": "", "roles": "", "email": ""});
  const [search, setSearch] = useState("");
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>

          <Route element={
            <AppLayout setSearch={setSearch} />
          }>
          
          {/*All routes under here, have the AppLayout rendered ontop of it.*/}
            <Route path="/home" element={<Mainpage search={search}/>}/>
            <Route path="/thread/:id" element={<SpecificThread />} />
            <Route path="/users/:id" element={<AccountPage loggedInUser={loggedInUser}/>} />
            <Route path="/threads" element={<Threads />} />
            <Route path="/createThread" element={<CreateThread loggedInUser={loggedInUser}/>}/>
            <Route path ="/accountPage" element={<AccountPage loggedInUser={loggedInUser}/>} />
          </Route>

          {/*These routes are exempt from the AppLayout component */}
          <Route index element={<Navigate to="/login"/>}/>   
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>}/>
          <Route path="/register" element={<Register setLoggedInUser={setLoggedInUser} />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

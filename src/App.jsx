import { BrowserRouter,  Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './page/Login'
import {Mainpage} from './page/Mainpage'
import SpecificThread from './page/SpecificThread'
import { Register } from './page/Register'
import { useEffect, useState } from 'react';
import {CreateThread} from './page/CreateThread';
import { AppLayout } from './layout/AppLayout'
import { AccountPage } from './page/accountPage'
import PageNotFound from "./page/PageNotFound.jsx";
import { TokenValidator } from './page/TokenValidator'


function App() {
  const [loggedInUser, setLoggedInUser] = useState({"username": "", "roles": "", "email": ""});
  const [search, setSearch] = useState("");
  const [tokenIsValid, setTokenIsValid] = useState(null);
  
  
  useEffect(() => {
    validateToken();
},[]);


  const validateToken = () => {
    let token = localStorage.getItem("token");
    if(token === null || token === undefined || token === ""){
      setTokenIsValid(false);
      console.log("No token found")
      return;
    }

    let tokenData = JSON.parse(atob(token.split('.')[1]));
    if(tokenData.exp < Date.now() / 1000){
      alert("Token has expired, please log in again");
      setTokenIsValid(false);
      localStorage.removeItem("token");
      return;
    }
    setTokenIsValid(true);
    setLoggedInUser({"username": tokenData.username, "roles": tokenData.roles, "email": tokenData.email});
    console.log("Token is valid");
  }


  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="*" element={<TokenValidator tokenIsValid={tokenIsValid}>
              <Routes>
              <Route element={
                <AppLayout setSearch={setSearch} />
              }>
            
              {/*All routes under here, have the AppLayout rendered ontop of it.*/}
                <Route path="/home" element={<Mainpage search={search}/>}/>
                <Route path="/thread/:id" element={<SpecificThread />} />
                <Route path="/users/:id" element={<AccountPage loggedInUser={loggedInUser}/>} />
                <Route path="/createThread" element={<CreateThread loggedInUser={loggedInUser}/>}/>
                <Route path ="/accountPage" element={<AccountPage loggedInUser={loggedInUser}/>} />
              </Route>
              </Routes>
            </TokenValidator>}>
          </Route>


          {/*These routes are exempt from the AppLayout component */}
          <Route index element={<Navigate to="/login"/>}/>   
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>}/>
          <Route path="/register" element={<Register setLoggedInUser={setLoggedInUser} />}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

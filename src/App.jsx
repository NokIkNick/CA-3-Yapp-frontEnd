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
import {SpecificUser} from './page/SpecificUser';
import { JsxExample } from './examExamples/JsxExample.jsx'
import { Flexbox } from './examExamples/Flexbox.jsx'
import { Grid } from './examExamples/Grid.jsx'
import { Asyncexample } from './examExamples/Asyncexample.jsx'
import { StorageExample } from './examExamples/StorageExample.jsx'


function App() {
  const [loggedInUser, setLoggedInUser] = useState({"username": "", "roles": "", "email": ""});
  const [search, setSearch] = useState("");
  const [tokenIsValid, setTokenIsValid] = useState(false);
  
  
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
    setLoggedInUser({username: tokenData.username, roles: tokenData.roles, email: tokenData.email});
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
                <AppLayout  search={search} setSearch={setSearch}/>
              }>
            
              {/*All routes under here, have the AppLayout rendered ontop of it.*/}
                <Route path="/home" element={<Mainpage search={search}/>}/>
                <Route path="/thread/:id" element={<SpecificThread loggedInUser={loggedInUser} />} />
                <Route path="/user/:id" element={<SpecificUser />}/>
                <Route path="/createThread" element={<CreateThread loggedInUser={loggedInUser}/>}/>
                <Route path ="/accountPage" element={<AccountPage loggedInUser={loggedInUser}/>} />
              </Route>
              </Routes>
            </TokenValidator>}>
          </Route>


          {/*These routes are exempt from the AppLayout component */}
          <Route index element={<Navigate to="/login"/>}/>   
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} setTokenIsValid={setTokenIsValid}/>}/>
          <Route path="/register" element={<Register setLoggedInUser={setLoggedInUser} setTokenIsValid={setTokenIsValid}/>}/>
          <Route path="/JSX" element={<JsxExample/>}></Route>
          <Route path="/flexbox" element={<Flexbox/>}></Route>
          <Route path="/grid" element={<Grid/>}></Route>
          <Route path="/async" element={<Asyncexample/>}></Route>
          <Route path="/storage" element={<StorageExample/>}></Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

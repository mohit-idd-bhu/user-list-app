import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import ProtectedRoute from './components/Utils/ProtectedRoute';
import Signup from './components/Signup/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const token=localStorage.getItem('isTokenAvailable');
    if(token){
      setIsLoggedIn(true);
    }
  },[]);

  const loginHandler=(response) => {
    if(response.message){
      setIsLoggedIn(true);
      localStorage.setItem('isTokenAvailable',true);
      return true;
    }
    alert('Invalid UserName or Password');
  };

  const logoutHandler = () => {
    localStorage.removeItem('isTokenAvailable');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div>
        <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
        <Routes>
          {!isLoggedIn&&
          <Route path='/' 
            element={<Login onLogin={loginHandler}/>} 
          />}
          <Route path='/'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home></Home>
              </ProtectedRoute>
          }/>
          <Route path='/signup' 
            element={<Signup></Signup>
          }/>
          <Route path='*'>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

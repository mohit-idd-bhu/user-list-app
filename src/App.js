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
  },[])

  const loginHandler = (email, password) => {
    if(email==='foo'&&password==='bar'){
      setIsLoggedIn(true);
      return;
    }
    alert('Invalid UserName or Password');
  };

  const logoutHandler = () => {
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
          <Route path='/home'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home></Home>
              </ProtectedRoute>
          }/>
          <Route path='/signup' 
            element={<Signup></Signup>
          }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

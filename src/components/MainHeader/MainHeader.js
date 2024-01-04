import React, { useState } from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import Button from '../UI/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';


const MainHeader = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [path,setPath] = useState('/');

  const clickHandler=()=>{
    const path=location.pathname;
    if(path==='/'){
      setPath('/signup')
      navigate('/signup');
    }
    else{
      setPath('/');
      navigate('/');
    }
  }
  return (
    <header className={classes['main-header']}>
      <h1>Login Page</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
      {!props.isAuthenticated&&<Button onClick={clickHandler}>
        {path==='/'?`Sign Up`:`Login`}
      </Button>}
    </header>
  );
};

export default MainHeader;

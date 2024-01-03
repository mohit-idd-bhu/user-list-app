import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';


const MainHeader = (props) => {
  const navigate = useNavigate();
  const clickHandler=()=>{
    navigate('/signup');
  }
  return (
    <header className={classes['main-header']}>
      <h1>Login Page</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
      {!props.isAuthenticated&&<Button onClick={clickHandler}>Sign Up</Button>}
    </header>
  );
};

export default MainHeader;

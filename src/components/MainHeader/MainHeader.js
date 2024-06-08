import React, { useState } from 'react';
import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import Button from '../UI/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';


const MainHeader = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [path,setPath] = useState(location.pathname);

  const clickHandler=()=>{
    if(path==='/'){
      navigate('/signup');
    }
    else{
      navigate('/');
    }
    setPath(location.pathname);
  }
  return (
    <header className={classes['main-header']}>
      <h1>{props.isAuthenticated?"Dashboard":"Login Page"}</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
      {!props.isAuthenticated&&<Button onClick={clickHandler}>
        {path==='/'?`Sign Up`:`Login`}
      </Button>}
    </header>
  );
};

export default MainHeader;

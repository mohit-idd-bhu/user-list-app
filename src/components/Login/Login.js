import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate=useNavigate();
  const [enteredUserName, setenteredUserName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(()=>{
    setFormIsValid(
      enteredPassword.trim().length > 0 && enteredUserName.trim().length > 0
    )
  },[enteredUserName,enteredPassword ]);

  useEffect(()=>{
    setEnteredPassword('');
    setenteredUserName('');
  },[]);

  const emailChangeHandler = (event) => {
    setenteredUserName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await (await fetch(`https://user-list-app.onrender.com/login?user=${enteredUserName}&password=${enteredPassword}`)).json();
    if(props.onLogin(response)===true){
      navigate('/');
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            value={enteredUserName}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={classes.control}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

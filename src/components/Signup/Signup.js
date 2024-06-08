import React, { useState } from "react";
import Card from "../UI/Card/Card";
import classes from './Signup.module.css';
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Signup(props) {
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [formIsValid,setFormIsValid] = useState(false);

    useEffect(()=>{
        setFormIsValid(
          password.trim().length > 0 && username.trim().length > 0
        )
      },[username,password ]);

    const usernameHandler = (e)=>{
        setUsername(e.target.value);
    }
    const passwordHandler = (e)=>{
        setPassword(e.target.value);
    }

    const pushData = async ()=>{
        const response = await(await fetch('http://localhost:5000/adduser',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'name':username,
                'password':password
                })
        })).json();
        return response;
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        const response = await pushData();
        setUsername('');
        setPassword('');
        if(response.error){
            alert(response.error);
            return;
        }
        else{
            alert(response.message);
        }
        navigate('/');
    }

    return ( 
        <Card className={classes.signup}>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="username">User Name</label>
                    <input
                        type="text"
                        id="username"
                        onChange={usernameHandler}
                        value={username}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={passwordHandler}
                        value={password}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Sign Up
                    </Button>
                </div>
            </form>
        </Card>
     );
}

export default Signup;
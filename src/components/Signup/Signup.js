import React, { useState } from "react";
import Card from "../UI/Card/Card";
import classes from './Signup.module.css';
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";

function Signup(props) {
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const usernameHandler = (e)=>{
        setUsername(e.target.value);
    }
    const passwordHandler = (e)=>{
        setPassword(e.target.value);
    }

    const pushData = async ()=>{
        const response = await(await fetch('http://localhost:5000/adduser',{
            method:'POST',
            body:{
                'name':username,
                'password':password
            }
        })).json();
        return response
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        console.log(username,password);
        const response = await pushData();
        if(response.message){
            alert("User Added");
        }
        setUsername('');
        setPassword('');
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
                    <Button type="submit" className={classes.btn}>
                        Sign Up
                    </Button>
                </div>
            </form>
        </Card>
     );
}

export default Signup;
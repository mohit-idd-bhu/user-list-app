import React from "react";
import Card from "../UI/Card/Card";
import classes from './Signup.module.css';
import Button from "../UI/Button/Button";

function Signup(props) {
    return ( 
        <Card className={classes.signup}>
            <form>
                <div className={classes.control}>
                    <label htmlFor="username">User Name</label>
                    <input
                        type="text"
                        id="username"
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
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
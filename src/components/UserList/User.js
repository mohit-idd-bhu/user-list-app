import React from 'react';
import Card from '../UI/Card/Card';

function User(props) {
    return ( 
        <Card>
            <img src={props.picture} alt={props.name}></img>
            <h5>{props.name}</h5>
            <h5>{props.email}</h5>
            <h5>{props.phone}</h5>
        </Card>
     );
}

export default User;
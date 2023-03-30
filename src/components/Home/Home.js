import React from 'react';

import Card from '../UI/Card/Card';
import UserList from '../UserList/UserList';
import classes from './Home.module.css';

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>User List</h1>
      <UserList/>
    </Card>
  );
};

export default Home;

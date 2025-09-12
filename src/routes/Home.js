import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Home = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const linkToRedirect = isLoggedIn ? '/system/user-redux' : '/home';

  const history = useHistory()
  return <Redirect to={linkToRedirect} />;
};

export default Home;

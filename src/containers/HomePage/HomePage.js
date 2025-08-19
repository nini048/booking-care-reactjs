import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomeHeader from './HomeHeader';
const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

  return (
    <div>
      <HomeHeader />
    </div>
  );
};

export default HomePage;

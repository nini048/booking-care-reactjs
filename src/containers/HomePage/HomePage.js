import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty'
const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

  return (
    <div>
      <HomeHeader />
      <Specialty/>
      <div style ={{heigth:'300px'}}></div>
    </div>
  );
};

export default HomePage;

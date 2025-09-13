import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty'
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '20px'
  };
  return (
    <div>
      <HomeHeader
        isShowBanner={true}
      />
      <div id="specialty">
        <Specialty settings={settings} />
      </div>
      <div id="medical-facility">
        <MedicalFacility settings={settings} />
      </div>

      <div id="doctor">
        <OutstandingDoctor settings={settings} />
      </div>

      <div id="handbook">
        <HandBook settings={settings} />
      </div>

      <div id="about">
        <About />
      </div>
      <HomeFooter />
      <div style={{ heigth: '300px' }}></div>
    </div>
  );
};

export default HomePage;

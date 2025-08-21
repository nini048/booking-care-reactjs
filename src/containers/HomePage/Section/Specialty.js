import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Specialty.scss'
const Specialty = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,   // viết đúng: slidesToShow (không phải sLidesToShow)
    slidesToScroll: 1,
  };

  return (
    <div className = 'section-specialty'>
      <div className = 'specialty-content'>
      <Slider {...settings}>
        <div className = 'img-customize'><h3>Slide 1</h3></div>
        <div className = 'img-customize'><h3>Slide 2</h3></div>
        <div className = 'img-customize'><h3>Slide 3</h3></div>

        <div className = 'img-customize'><h3>Slide 4</h3></div>
        <div className = 'img-customize'><h3>Slide 5</h3></div>
        <div className = 'img-customize'><h3>Slide 6</h3></div>
      </Slider>
      </div>
    </div>
  );
}

export default Specialty;

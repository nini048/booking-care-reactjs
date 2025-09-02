import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Specialty.scss'
import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'
const Specialty = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div className='section-specialty'>
      <div className='specialty-container'>
        <div className='specialty-header'>
          <span className='title-section'>Chuyên khoa phổ biến</span>
          <button className=' btn-section btn btn-light'>Xem thêm</button>
        </div>
        <div className='specialty-body'>
          <Slider {...settings}>
            {/* <div className='specialty-body'> */}
            {/*   <img src={specialtyImg} /> */}
            {/*   <div>Cơ xương khớp 1</div> */}
            {/* </div> */}
            <div className='img-customize'>
              <img src={specialtyImg} />
              <div>Cơ xương khớp 2</div>

            </div>
            <div className='img-customize'>
              <img src={specialtyImg} />
              <div>Cơ xương khớp 3</div>

            </div>
            <div className='img-customize'>
              <img src={specialtyImg} />
              <div>Cơ xương khớp 4</div>

            </div>
            <div className='img-customize'>
              <img src={specialtyImg} />
              <div>Cơ xương khớp 5</div>

            </div>
            <div className='img-customize'>
              <img src={specialtyImg} />
              <div>Cơ xương khớp 6</div>

            </div>

          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Specialty;

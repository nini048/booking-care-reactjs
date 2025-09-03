
import React from 'react';
import handbookImg from '../../../assets/handbook/handbook.jpg'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from "react-slick";

const HandBook = (props) => {
  let { settings } = props

  return (
    <div className=' section-share section-handbook'>
      <div className='section-container'>
        <div className='section-header'>
          <span className='title-section'>Cẩm nang</span>
          <button className=' btn-section btn btn-light'>Tìm kiếm</button>
        </div>
        <div className='section-body'>
          <Slider {...settings}>
            {/* <div className='specialty-body'> */}
            {/*   <img src={specialtyImg} /> */}
            {/*   <div>Cơ xương khớp 1</div> */}
            {/* </div> */}
            <div className='img-customize'>
              <img src={handbookImg} />
              <div>Bệnh viện đa khoa An Việt 2</div>

            </div>
            <div className='img-customize'>
              <img src={handbookImg} />
              <div>Bệnh viện đa khoa An Việt 3</div>

            </div>
            <div className='img-customize'>
              <img src={handbookImg} />
              <div>Bệnh viện đa khoa An Việt 4</div>

            </div>
            <div className='img-customize'>
              <img src={handbookImg} />
              <div>Bệnh viện đa khoa An Việt 5</div>

            </div>
            <div className='img-customize'>
              <img src={handbookImg} />
              <div>Bệnh viện đa khoa An Việt 6</div>

            </div>

          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HandBook;

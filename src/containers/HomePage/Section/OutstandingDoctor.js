
import React from 'react';
import outstandingDoctorImg from '../../../assets/outstandingDoctor/orm-doctor.JPG'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from "react-slick";

const OutstandingDoctor = (props) => {
  let { settings } = props

  return (
    <div className=' section-share section-outstanding-doctor'>
      <div className='section-container'>
        <div className='section-header'>
          <span className='title-section'>Bác sĩ nồi bật</span>
          <button className=' btn-section btn btn-light'>Tìm kiếm</button>
        </div>
        <div className='section-body'>
          <Slider {...settings}>
            {/* <div className='specialty-body'> */}
            {/*   <img src={specialtyImg} /> */}
            {/*   <div>Cơ xương khớp 1</div> */}
            {/* </div> */}
            <div className=' doctor-avatar'>

              <img src={outstandingDoctorImg} />
              <div className='description-doctor text-center'>
                <div className='name'>Dr.Orm Kornaphat 1</div>
                <div className='position'>Cơ xương khớp</div>
              </div>
            </div>
            <div className=' doctor-avatar'>

              <img src={outstandingDoctorImg} />

              <div className='description-doctor text-center'>
                <div className='name'>Dr.Orm Kornaphat 2</div>
                <div className='position'>Cơ xương khớp</div>
              </div>
            </div>
            <div className=' doctor-avatar'>
              <img src={outstandingDoctorImg} />
              <div className='description-doctor text-center'>
                <div className='name'>Dr.Orm Kornaphat 3</div>
                <div className='position'>Cơ xương khớp</div>
              </div>

            </div>
            <div className=' doctor-avatar'>

              <img src={outstandingDoctorImg} />

              <div className='description-doctor text-center'>
                <div className='name'>Dr.Orm Kornaphat 4</div>
                <div className='position'>Cơ xương khớp</div>
              </div>
            </div>
            <div className=' doctor-avatar'>

              <img src={outstandingDoctorImg} />

              <div className='description-doctor text-center'>
                <div className='name'>Dr.Orm Kornaphat 5</div>
                <div className='position'>Cơ xương khớp</div>
              </div>
            </div>

          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OutstandingDoctor;

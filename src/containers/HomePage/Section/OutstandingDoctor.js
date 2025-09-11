
import React, { useEffect, useState } from 'react';
import outstandingDoctorImg from '../../../assets/outstandingDoctor/orm-doctor.JPG'
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { fetchTopDoctor } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';

const OutstandingDoctor = (props) => {
  let { settings } = props
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const topDoctors = useSelector(state => state.admin.topDoctors)
  const language = useSelector(state => state.app.language)

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTopDoc = async () => {
      let res = await dispatch(fetchTopDoctor(10))
      console.log(res)
    }
    fetchTopDoc()
  }, [dispatch])
  console.log('topDoctors: ', topDoctors)
  const topDoctorsTriple = topDoctors ? [...topDoctors, ...topDoctors, ...topDoctors, ...topDoctors] : [];

  return (
    <div className=' section-share section-outstanding-doctor'>
      <div className='section-container'>
        <div className='section-header'>
          <span className='title-section'>
            <FormattedMessage id="section.outstanding-doctor" />

          </span>
          <button className=' btn-section btn btn-light'>
            <FormattedMessage id='common.search' />
          </button>
        </div>
        <div className='section-body'>
          <Slider {...settings}>
            {topDoctorsTriple && topDoctorsTriple.length > 0
              && topDoctorsTriple.map((doc, index) => {
                const avatarUrl = doc.image
                  ? `http://localhost:8080/uploads/${doc.image}`
                  : outstandingDoctorImg;
                return (

                  <div key={index} className=' doctor-avatar'>
                    <img src={avatarUrl} />
                    <div className='description-doctor text-center'>
                      <div className='name'>{language === 'vi' ? doc.positionData?.valueVi : doc.positionData?.valueEn} {doc.firstName} {doc.lastName}</div>
                      <div className='position'>{language === 'vi' ? doc.positionData?.valueVi : doc.positionData?.valueEn}</div>
                    </div>
                  </div>
                )
              })}

          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OutstandingDoctor;

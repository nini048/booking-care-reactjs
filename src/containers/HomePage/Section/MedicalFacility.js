import React, { useEffect, useRef, useState } from "react";

import medicalFacilityImg from '../../../assets/medicalFacility/benh-vien-an-viet.JPG'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { fetchAllClinic } from "../../../store/actions";
const MedicalFacility = (props) => {
  let { settings } = props

  const clinics = useSelector(state => state.admin.clinics)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchClinic = async () => {
      let res = await dispatch(fetchAllClinic())
    }
    fetchClinic()
  }, [dispatch])
  console.log('c', clinics)
  return (
    <div className=' section-share section-medical-facility'>
      <div className='section-container'>
        <div className='section-header'>
          <span className='title-section'>
            <FormattedMessage id='section.medical-facility' />
          </span>
          <button className=' btn-section btn btn-light'>
            <FormattedMessage id='common.search' />
          </button>
        </div>
        <div className='section-body'>
          <Slider {...settings}>
            {clinics && clinics.length > 0
              && clinics.map((clinic, index) => {
                const avatarUrl = clinic.image
                  ? `http://localhost:8080/uploads/${clinic.image}`
                  : medicalFacilityImg
                return (

                  <div key={index}
                    className=' img-customize'
                  >
                    <img src={avatarUrl} />
                    <div>{clinic.name}</div>
                  </div>
                )
              })}

          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MedicalFacility;

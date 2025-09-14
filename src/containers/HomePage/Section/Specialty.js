import React, { useEffect } from "react";
import Slider from "react-slick";
import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpecialty } from "../../../store/actions";

const Specialty = (props) => {
  let { settings } = props
  const specialties = useSelector(state => state.admin.specialties)
  const dispatch = useDispatch()
  const language = useSelector(state => state.app.language)
  useEffect(() => {
    const fetchSecialty = async () => {
      let res = await dispatch(fetchAllSpecialty())
      console.log('res', res)
    }
    fetchSecialty()
  }, [dispatch])
  console.log('specialty', specialties)
  return (
    <div className=' section-share section-specialty'>
      <div className='section-container'>
        <div className='section-header'>
          <span className='title-section'>
            <FormattedMessage id='section.specialty' />
          </span>
          <button className=' btn-section btn btn-light'>
            <FormattedMessage id='common.view-more' />
          </button>
        </div>
        <div className='section-body'>
          <Slider {...settings}>
            {specialties && specialties.length > 0
              && specialties.map((spec, index) => {
                const avatarUrl = spec.image
                  ? `http://localhost:8080/uploads/${spec.image}`
                  : specialtyImg;
                return (

                  <div key={index}
                    className=' img-customize'
                  >
                    <img src={avatarUrl} />
                    <div>{spec.name}</div>
                  </div>
                )
              })}

          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Specialty;

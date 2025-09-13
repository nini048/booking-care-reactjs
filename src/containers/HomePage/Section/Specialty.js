import React from "react";
import Slider from "react-slick";
import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'
import { FormattedMessage } from 'react-intl';

const Specialty = (props) => {
  let { settings } = props
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

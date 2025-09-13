import medicalFacilityImg from '../../../assets/medicalFacility/benh-vien-an-viet.JPG'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

const MedicalFacility = (props) => {
  let { settings } = props

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
            {/* <div className='specialty-body'> */}
            {/*   <img src={specialtyImg} /> */}
            {/*   <div>Cơ xương khớp 1</div> */}
            {/* </div> */}
            <div className='img-customize'>
              <img src={medicalFacilityImg} />
              <div>Bệnh viện đa khoa An Việt 2</div>

            </div>
            <div className='img-customize'>
              <img src={medicalFacilityImg} />
              <div>Bệnh viện đa khoa An Việt 3</div>

            </div>
            <div className='img-customize'>
              <img src={medicalFacilityImg} />
              <div>Bệnh viện đa khoa An Việt 4</div>

            </div>
            <div className='img-customize'>
              <img src={medicalFacilityImg} />
              <div>Bệnh viện đa khoa An Việt 5</div>

            </div>
            <div className='img-customize'>
              <img src={medicalFacilityImg} />
              <div>Bệnh viện đa khoa An Việt 6</div>

            </div>

          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MedicalFacility;

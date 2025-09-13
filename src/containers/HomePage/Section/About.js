

import React from 'react';
import handbookImg from '../../../assets/handbook/handbook.jpg'
import { FormattedMessage } from 'react-intl';

const About = (props) => {

  return (
    <div className=' section-share section-about'>
      <div className='section-container'>
        <div className='section-header'>
          <span className='title-section'>
            <FormattedMessage id='section.about' />
          </span>
        </div>
        <div className='section-about-content'>
          <div className='content-left'>
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/CgCVZdcKcqY?list=RDCgCVZdcKcqY"
              title="BLACKPINK - ‘뛰어(JUMP)’ M/V"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className='content-right'>
            <p style={{ whiteSpace: "pre-line" }}>
              <FormattedMessage id="about.description" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

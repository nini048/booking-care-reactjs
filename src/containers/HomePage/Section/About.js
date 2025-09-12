

import React from 'react';
import handbookImg from '../../../assets/handbook/handbook.jpg'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const About = (props) => {

  return (
    <div className=' section-share section-about'>
      <div className='section-container'>
        <div className='section-header'>
          <span className='title-section'>Thông tin thêm</span>
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
            <p>
              Đây là hệ thống chăm sóc sức khỏe trực tuyến, cung cấp thông tin
              hữu ích về y tế và hỗ trợ người dùng trong việc tiếp cận dịch vụ y tế
              nhanh chóng và tiện lợi.
            </p>
            <p>
              Người dùng có thể dễ dàng tra cứu thông tin về bác sĩ, chuyên khoa,
              cũng như đặt lịch khám trực tuyến chỉ với vài thao tác đơn giản.
            </p>
            <p>
              Với mục tiêu nâng cao chất lượng dịch vụ y tế, nền tảng không chỉ
              giúp tiết kiệm thời gian mà còn mang đến trải nghiệm thân thiện và hiện đại.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

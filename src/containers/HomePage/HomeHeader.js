
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomeHeader.scss'
import { FaFileMedicalAlt } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
const HomeHeader = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

  return (
    <div>
      <div className='home-header-container'>
        <div className='home-header-content'>
          <div className='left-content'>
            <IoMdMenu size={32} color='grey' cursor='pointer' />
            <div className='header-logo'>

            </div>
          </div>
          <div className='center-content'>
            <div className="child-content">
              <div className='subs-title'><b>Chuyên khoa</b></div>
              <div>Tìm bác sĩ theo chuyên khoa</div>
            </div>

            <div className="child-content">
              <div className='subs-title'><b>Cơ sở y tế</b></div>
              <div>Chọn bệnh viện, phòng khám</div>
            </div>

            <div className="child-content">
              <div className='subs-title'><b>Bác sĩ</b></div>
              <div>Chọn bác sĩ giỏi</div>
            </div>

            <div className="child-content">
              <div className='subs-title'><b>Gói khám</b></div>
              <div>Khám sức khỏe tổng quát</div>
            </div>

          </div>

          <div className='right-content'>
            <div className='support'>
              <FaRegQuestionCircle size={20} color='grey' cursor='pointer' />
              Hỗ trợ
            </div>
            <div className='flag'>VI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;

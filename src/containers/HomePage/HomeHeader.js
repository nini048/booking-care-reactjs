
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomeHeader.scss'
import { FaFileMedicalAlt } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegHospital, FaMicroscope, FaBrain, FaTooth, FaHospital, FaMobile } from "react-icons/fa";

const HomeHeader = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

  return (
    <React.Fragment>
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
      <div className='home-header-banner'>
        <div className='title1'>NỀN TẢNG Y TẾ</div>
        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
        <div className='search'>
          <FaSearch />
          <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
        </div>
        <div className='options'>
          <div className='option-child'>
            <div className='icon-child'>
              <FaRegHospital size={30} />
            </div>
            <div className='text-child'>Khám chuyên khoa</div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaMobile size={30} />
            </div>
            <div className='text-child'>Khám từ xa</div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaHospital size={30} />
            </div>
            <div className='text-child'>Khám tổng quát</div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaMicroscope size={30} />
            </div>
            <div className='text-child'>Xét nghiệm y học</div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaBrain size={30} />
            </div>
            <div className='text-child'>Sức khoẻ tinh thần</div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaTooth size={30} />
            </div>
            <div className='text-child'>Khám nha khoa</div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default HomeHeader;

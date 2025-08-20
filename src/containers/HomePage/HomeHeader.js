
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomeHeader.scss'
import { FaFileMedicalAlt } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegHospital, FaMicroscope, FaBrain, FaTooth, FaHospital, FaMobile } from "react-icons/fa";
import logo from '../../assets/images/logo.png'
import { FormattedMessage, useIntl } from 'react-intl';


const HomeHeader = (props) => {
  const intl = useIntl();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(useSelector((state) => state.user))
  const language = useSelector((state) => state.user.language)
  const linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

  return (
    <React.Fragment>
      <div className='home-header-container'>
        <div className='home-header-content'>
          <div className='left-content'>
            <IoMdMenu size={24} cursor='pointer' />
            <img src={logo} />
            <div className='header-logo'>

            </div>
          </div>
          <div className='center-content'>
            <div className="child-content">
              <div className='subs-title'>
                <b><FormattedMessage id='home-header.specialty' /></b>
              </div>
              <div><FormattedMessage id="home-header.search-doctor" /></div>

            </div>

            <div className="child-content">
              <div className='subs-title'><b>
                <FormattedMessage id='home-header.health-facility' />
              </b></div>
              <div>
                <FormattedMessage id='home-header.select-hospital' />
              </div>
            </div>

            <div className="child-content">
              <div className='subs-title'><b>
                <FormattedMessage id='home-header.doctor' />

              </b></div>
              <div>
                <FormattedMessage id='home-header.select-doctor' />

              </div>
            </div>

            <div className="child-content">
              <div className='subs-title'><b>
                <FormattedMessage id='home-header.fee' />
              </b></div>
              <div>
                <FormattedMessage id='home-header.general-health-check' />
              </div>
            </div>

          </div>

          <div className='right-content'>
            <div className='support'>
              <FaRegQuestionCircle size={18} cursor='pointer' />
              <FormattedMessage id='home-header.support' />
            </div>
            <div className='language-vi active'>VI</div>
            <div className='language-en'>EN</div>
          </div>
        </div>
      </div>
      <div className='home-header-banner'>
        <div className='title1'>
          <FormattedMessage id='banner.title1' />
        </div>
        <div className='title2'>
          <FormattedMessage id='banner.title2' />
        </div>
        <div className='search'>
          <FaSearch />
          <input type='text'
            placeholder={intl.formatMessage({ id: 'search.placeholder' })} />
        </div>
        <div className='options'>
          <div className='option-child'>
            <div className='icon-child'>
              <FaRegHospital size={30} />
            </div>
            <div className='text-child'>
              <FormattedMessage id='option.specialist' />
            </div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaMobile size={30} />
            </div>
            <div className='text-child'>
              <FormattedMessage id='option.remote' />
            </div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaHospital size={30} />
            </div>
            <div className='text-child'>
              <FormattedMessage id='option.general' />

            </div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaMicroscope size={30} />
            </div>
            <div className='text-child'>
              <FormattedMessage id='option.lab' />
            </div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaBrain size={30} />
            </div>
            <div className='text-child'>
              <FormattedMessage id='option.mental' />
            </div>
          </div>
          <div className='option-child'>
            <div className='icon-child'>
              <FaTooth size={30} />
            </div>
            <div className='text-child'>
              <FormattedMessage id='option.dental' />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default HomeHeader;

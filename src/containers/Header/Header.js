import { connect, useDispatch, useSelector } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant.js'
import { FormattedMessage, useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import _ from 'lodash';
const Header = (props) => {

  const { processLogout } = props;
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language)
  const userInfo = useSelector((state) => state.user.userInfo)
  const [menu, setMenu] = useState([])
  const handleChangeLanguages = (language) => {
    dispatch({
      type: 'CHANGE_LANGUAGE',
      language
    })

  }
  useEffect(() => {
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId
      if (role === USER_ROLE.ADMIN) {
        setMenu(adminMenu)
      }
      else if (role === USER_ROLE.DOCTOR) {
        setMenu(doctorMenu)
      }
    }
  }, [])

  return (
    <div className="header-container">
      {/* thanh navigator */}
      <div className="header-tabs-container">
        <Navigator menus={menu} />
      </div>

      <div className='header-right'>

        <div className='languages'>
          <span className='welcome me-3'>
            <FormattedMessage id='home-header.welcome' />
            , {userInfo && userInfo.firstName ? userInfo.firstName : ''}!
          </span>
          <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
            onClick={() => { handleChangeLanguages(LANGUAGES.VI) }}
          >VI</span>
          <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-vi'}
            onClick={() => { handleChangeLanguages(LANGUAGES.EN) }}
          >EN</span>
          <div className="btn btn-logout"
            onClick={() => { dispatch(actions.processLogout()) }}
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>

        </div>
      </div>
      {/* nút logout */}
    </div>
  );

}


export default Header;

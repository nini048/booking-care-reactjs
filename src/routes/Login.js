import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../utils";

import userIcon from '../../src/assets/images/user.svg';
import passIcon from '../../src/assets/images/pass.svg';
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../services/adminService';

const Login = () => {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.app.language);

  const btnLogin = useRef(null);

  const initialState = {
    username: '',
    password: '',
    loginError: ''
  };

  const [form, setForm] = useState(initialState);
  const { username, password, loginError } = form;

  const refresh = () => setForm(initialState);

  const onUsernameChange = (e) => {
    setForm(prev => ({ ...prev, username: e.target.value }));
  };

  const onPasswordChange = (e) => {
    setForm(prev => ({ ...prev, password: e.target.value }));
  };

  const redirectToSystemPage = () => {
    const redirectPath = '/system/user-manage';
    dispatch(push(redirectPath));
  };

  const processLogin = async () => {
    const loginBody = {
      username: 'admin',
      password: '123456'
    };

    let adminInfo = {
      "tlid": "0",
      "tlfullname": "Administrator",
      "custype": "A",
      "accessToken": "eyJhbGciOiJIU"
    };

    dispatch(actions.adminLoginSuccess(adminInfo));
    refresh();
    redirectToSystemPage();

    try {
      await adminService.login(loginBody);
    } catch (e) {
      console.log('error login : ', e);
      dispatch(actions.adminLoginFail());
    }
  };

  const handlerKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === KeyCodeUtils.ENTER) {
      event.preventDefault();
      if (!btnLogin.current || btnLogin.current.disabled) return;
      btnLogin.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handlerKeyDown);
    return () => {
      document.removeEventListener('keydown', handlerKeyDown);
    };
  }, []);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="form_login">
          <h2 className="title">
            <FormattedMessage id="login.login" />
          </h2>

          <div className="form-group icon-true">
            <img className="icon" src={userIcon} alt="this" />
            <input
              placeholder={LanguageUtils.getMessageByKey("login.username", lang)}
              id="username"
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={onUsernameChange}
            />
          </div>

          <div id="phone-input-container" className="form-group icon-true">
            <img className="icon" src={passIcon} alt="this" />
            <input
              placeholder={LanguageUtils.getMessageByKey("login.password", lang)}
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={onPasswordChange}
            />
          </div>

          {loginError !== '' && (
            <div className='login-error'>
              <span className='login-error-message'>{loginError}</span>
            </div>
          )}

          <div className="form-group login">
            <input
              ref={btnLogin}
              id="btnLogin"
              type="submit"
              className="btn"
              value={LanguageUtils.getMessageByKey("login.login", lang)}
              onClick={processLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

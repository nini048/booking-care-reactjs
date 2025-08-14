import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='login-background'>
        <div className='login-container'>
          <div className='login-content row'>
            <div className="col-10 text-center">
              Login
            </div>
            <div className="col-12 form-group">
              <label >Username </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 form-group">
              <label >Password </label>
              <input type="password" className="form-control" />
            </div>

            <div className="col-12 d-flex justify-content-center mt-2">
              <button className="btn-login btn btn-outline-secondary">Login</button>
            </div>
            <div className="col-12">
              <span className='forgot-password'>Forgot your password?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login">Or Login with</span>
            </div>
            <div className="col-12 social-login d-flex justify-content-center">
              <FaGoogle />
              <FaFacebookF />
            </div>

          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

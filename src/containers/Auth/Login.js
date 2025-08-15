import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import * as actions from "../../store/actions";
import "./Login.scss";
import { IoEye } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { postLogin } from '../../services/userService'

const Login = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const handleLogin = async () => {
    try {


      let res = await postLogin(email, password)
      if (res && res.errorCode !== 0) {
        setErrorMessage(res.message)
      }
      if (res && res.errorCode === 0) {
        dispatch(actions.userLoginSuccess(res.user))
        // userLoginSuccess(res.user)
        console.log(res.message)
      }
    }
    catch (e) {
      if (e.response && e.response.data) {
        setErrorMessage(e.response.data.message);
      }
    }


  };

  const handleNavigate = (path) => {
    dispatch(push(path));
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 text-center">Login</div>

          <div className="col-12 form-group">
            <label>Email</label>
            <input type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="col-12 form-group">
              <label>Password</label>
              <div className='form-control input-password'>

                <input type={!showPassword ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ?
                  <FaEye onClick={() => setShowPassword(!showPassword)} /> :
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                }
              </div>
            </div>

            <div className='col-12'>{errorMessage}</div>
            <div className="col-12 d-flex justify-content-center mt-2">
              <button
                className="btn-login btn btn-outline-secondary"
                onClick={(e) => { handleLogin() }}
              >
                Login
              </button>
            </div>

            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
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
    </div>
  );
};


// const mapDispatchToProps = (dispatch) => {
//   return {
//     navigate: (path) => dispatch(push(path)),
//     adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
//     adminLoginFail: () => dispatch(actions.adminLoginFail()),
//     userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
//   };
// };
export default Login;

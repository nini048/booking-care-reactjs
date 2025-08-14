import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import * as actions from "../../store/actions";
import "./Login.scss";
import { IoEye } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormattedMessage } from "react-intl";

const Login = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const handleLogin = () => {
    alert(`user: ${username} pass: ${password}`)

  };

  const handleNavigate = (path) => {
    dispatch(push(path));
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-10 text-center">Login</div>

          <div className="col-12 form-group">
            <label>Username</label>
            <input type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

export default Login;

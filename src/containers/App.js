import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login.js";
import Header from "./Header/Header";
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import HomePage from "./HomePage/HomePage";
import CustomScrollbars from '../components/CustomScrollbars.js'
const App = ({ persistor, onBeforeLift }) => {
  const [bootstrapped, setBootstrapped] = useState(false);

  // lấy dữ liệu từ Redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // thay thế componentDidMount
  useEffect(() => {
    const handlePersistorState = async () => {
      const { bootstrapped } = persistor.getState();
      if (bootstrapped) {
        if (onBeforeLift) {
          try {
            await Promise.resolve(onBeforeLift());
            setBootstrapped(true);
          } catch (e) {
            setBootstrapped(true);
          }
        } else {
          setBootstrapped(true);
        }
      }
    };

    handlePersistorState();
  }, [persistor, onBeforeLift]);

  return (
    <Fragment>
      <Router history={history}>
        <div className="main-container">
          <ConfirmModal />
          {isLoggedIn && <Header />}

          <div className="content-container">
            <CustomScrollbars style = {{height: '100vh', width: '100%'}}>
            <Switch>
              <Route path={path.HOME} exact component={Home} />
              <Route
                path={path.LOGIN}
                component={userIsNotAuthenticated(Login)}
              />
              <Route
                path={path.SYSTEM}
                component={userIsAuthenticated(System)}
              />
              <Route path={path.HOMEPAGE} component={HomePage} />
            </Switch>

            </CustomScrollbars>
          </div>

          <ToastContainer
            className="toast-container"
            toastClassName="toast-item"
            bodyClassName="toast-item-body"
            autoClose={false}
            hideProgressBar={true}
            pauseOnHover={false}
            pauseOnFocusLoss={true}
            closeOnClick={false}
            draggable={false}
            closeButton={<CustomToastCloseButton />}
          />
        </div>
      </Router>
    </Fragment>
  );
};

export default App;

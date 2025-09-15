import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import ConfirmBooking from '../routes/ConfirmBooking'
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./ScrollToTop";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login.js";
import Header from "./Header/Header";
import System from "../routes/System";


import ConfirmModal from "../components/ConfirmModal";
import HomePage from "./HomePage/HomePage";
import CustomScrollbars from '../components/CustomScrollbars.js'
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import Doctor from "../routes/Doctor";
import DetailClinic from "./Patient/Clinic/DetailClinic";
const App = ({ persistor, onBeforeLift }) => {
  const [bootstrapped, setBootstrapped] = useState(false);

  // lấy dữ liệu từ Redux store

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
        <ScrollToTop />
        <div className="main-container">
          <ConfirmModal />

          <div className="content-container">
            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
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
                <Route
                  path='/doctor'
                  component={userIsAuthenticated(Doctor)}
                />
                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                <Route path="/confirm-booking" component={ConfirmBooking} />
              </Switch>

            </CustomScrollbars>
          </div>

          <ToastContainer
            position="bottom-right"
            newestOnTop={true}
            autoClose={3000} // tự tắt 3s
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable={false}
          />
        </div>
      </Router>
    </Fragment>
  );
};

export default App;

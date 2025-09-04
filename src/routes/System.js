import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/UserRedux';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import Header from '../containers/Header/Header';

import { useSelector } from "react-redux";
const System = (props) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const { systemMenuPath } = props;
  return (
    <>
      {isLoggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/system/user-manage" component={UserManage} />
            <Route path="/system/user-redux" component={UserRedux} />
            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default System;

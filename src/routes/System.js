import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';

import { useSelector } from "react-redux";
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
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
            <Route path="/system/manage-doctor" component={ManageDoctor} />
            <Route path="/system/manage-specialty" component={ManageSpecialty} />
            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default System;

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
const UserRedux = (props) => {

  return (
    <div className="user-redux-container" >
      <div className='title'>User redux</div>
      <div className='user-redux-body'>
        <div>Add new user</div>
      </div>
    </div>
  )
}



export default UserRedux;

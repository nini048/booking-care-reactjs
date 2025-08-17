
import React, { Component, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
const ModalUser = (props) => {
  const { show, setShow, toggle } = props
  return (
    <Modal
      className='modal-user-container'
      isOpen={show}
      toggle={toggle}
      size='md'
      centered
    >
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
      <ModalBody>
        <div className='modal-user-body'>
          <div className='input-container'>
            <label>Email</label>
            <input type='email' />
          </div>
          <div className='input-container'>
            <label>Password</label>
            <input type='password' />
          </div>
          <div className='input-container'>
            <label>Firstname</label>
            <input type='text' />
          </div>
          <div className='input-container'>
            <label>Lastname</label>
            <input type='text' />
          </div>
          <div className='input-container max-width-input'>
            <label>Address</label>
            <input type='text' />
          </div>



        </div>

      </ModalBody>
      <ModalFooter>
        <Button className='px-3' color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button className='px-3' color="primary" onClick={toggle}>
          Save
        </Button>

      </ModalFooter>
    </Modal>
  );

}
export default ModalUser

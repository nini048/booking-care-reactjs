
import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { postNewuser } from '../../services/userService';
import { emitter } from '../../utils/emitter';
const ModalUser = (props) => {
  const { show, toggle } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [address, setAddress] = useState('')
  const handleAddNewUser = async () => {
    try {

      console.log("email:", email);
      console.log("password:", password);
      console.log("firstname:", firstname);
      console.log("lastname:", lastname);
      console.log("address:", address);
      let res = await postNewuser({ email, password, firstname, lastname, address })
      console.log('>>>res: ', res)

      if (res && res.errorCode === 0) {
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
        setAddress('')
        emitter.emit("EVENT_RELOAD_USERS");
        toggle()
      }
      else if (res) {
        alert(res.message)
      }
    }
    catch (e) {
      console.log('>>>error: ', e)
    }
  }

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
            <input type='email'
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>
          <div className='input-container'>
            <label>Password</label>
            <input type='password'
              onChange={(e) => { setPassword(e.target.value) }}

            />
          </div>
          <div className='input-container'>
            <label>Firstname</label>
            <input type='text'
              onChange={(e) => { setFirstname(e.target.value) }}
            />
          </div>
          <div className='input-container'>
            <label>Lastname</label>
            <input type='text'
              onChange={(e) => { setLastname(e.target.value) }}
            />
          </div>
          <div className='input-container max-width-input'>
            <label>Address</label>
            <input type='text'
              onChange={(e) => { setAddress(e.target.value) }}
            />
          </div>
        </div>

      </ModalBody>
      <ModalFooter>
        <Button className='px-3' color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button className='px-3'
          color="primary"
          onClick={() => { handleAddNewUser() }}>
          Save
        </Button>

      </ModalFooter>
    </Modal>
  );

}
export default ModalUser

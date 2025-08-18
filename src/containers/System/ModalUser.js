
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
  const [phonenumber, setPhonenumber] = useState('')
  const [role, setRole] = useState(1)
  const [gender, setGender] = useState('')
  const handleAddNewUser = async () => {
    try {

      let res = await postNewuser({
        email,
        password,
        firstname,
        lastname,
        address,
        phonenumber,
        role,
        gender
      })
      console.log('>>>res: ', res)

      if (res && res.errorCode === 0) {
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
        setAddress('')
        setPhonenumber('')
        setGender('MALE')
        setRole(1)
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
      <ModalHeader toggle={toggle}>Add user</ModalHeader>
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
          <div className='input-container'>
            <label>Address</label>
            <input type='text'
              onChange={(e) => { setAddress(e.target.value) }}
            />
          </div>
          <div className='input-container'>
            <label>Phonenumber</label>
            <input type='text'
              onChange={(e) => { setPhonenumber(e.target.value) }}
            />
          </div>
          <div className='input-container'>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="0">FEMALE</option>
              <option value="1">MALE</option>
            </select>
          </div>
          <div className='input-container'>
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="1">ADMIN</option>
              <option value="2">DOCTOR</option>
              <option value="3">PATIENT</option>
            </select>
          </div>

        </div>

      </ModalBody>
      <ModalFooter>
        <Button className='px-2' color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button className='px-2'
          color="primary"
          onClick={() => { handleAddNewUser() }}>
          Save
        </Button>

      </ModalFooter>
    </Modal>
  );

}
export default ModalUser

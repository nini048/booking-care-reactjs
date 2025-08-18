
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
import { postNewuser, putEditUser } from '../../services/userService';
import { emitter } from '../../utils/emitter';
const ModalEditUser = ({ show, toggle, user }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState("3");
  const [gender, setGender] = useState("1");

  useEffect(() => {
    if (user) {
      setFirstname(user.firstName || "");
      setLastname(user.lastName || "");
      setAddress(user.address || "");
      setPhonenumber(user.phoneNumber || "");
      setRole(String(user.roleId || "3"));
      setGender(String(user.gender || "1"));
    }
  }, [user]);

  const handleEditUser = async () => {
    try {
      let res = await putEditUser(user.id, {
        firstname,
        lastname,
        address,
        phonenumber,
        role,     // backend nhận "role", không phải roleId
        gender
      });
      console.log('>>>res: ', res)
      if (res && res.errorCode === 0) {
        emitter.emit("EVENT_RELOAD_USERS");
        toggle();
      } else if (res) {
        alert(res.message);
      }
    } catch (e) {
      console.log(">>>error: ", e);
    }
  };

  return (
    <Modal className="modal-user-container" isOpen={show} toggle={toggle} size="md" centered>
      <ModalHeader toggle={toggle}>Edit user</ModalHeader>
      <ModalBody>
        <div className="modal-user-body">
          <div className="input-container">
            <label>Firstname</label>
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Lastname</label>
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Phonenumber</label>
            <input type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="0">FEMALE</option>
              <option value="1">MALE</option>
            </select>
          </div>
          <div className="input-container">
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
        <Button className="px-2" color="secondary" onClick={toggle}>Cancel</Button>
        <Button className="px-2" color="primary" onClick={handleEditUser}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalEditUser

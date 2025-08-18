

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
import { deleteUser } from '../../services/userService';
import { emitter } from '../../utils/emitter';
const ModalDeleteUser = (props) => {
  const { show, toggle, user, setUser } = props
  const handleConfirmDeleteUser = async () => {
    toggle()
    let res = await deleteUser(user.id)
    if (res && res.errorCode === 0) {
      emitter.emit("EVENT_RELOAD_USERS");
      setUser({})
      toggle()
    }

    else if (res) {
      alert(res.message)
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
        <div className='modal-delete-user-body'>
          Are you sure delete user: {user.email}
        </div>

      </ModalBody>
      <ModalFooter>
        <Button className='px-3' color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button className='px-3'
          color="primary"
          onClick={() => { handleConfirmDeleteUser() }}>
          Confirm
        </Button>

      </ModalFooter>
    </Modal>
  );

}
export default ModalDeleteUser

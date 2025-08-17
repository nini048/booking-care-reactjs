import { async } from 'q';
import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser'
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./UserManage.scss"

const UserManage = (props) => {

  const [users, setUsers] = useState([])
  const [showModalCreateUser, setShowModalCreateUser] = useState(false)

  const toggleModalCreateUser = () => {
    setShowModalCreateUser(!showModalCreateUser)
  }
  useEffect(() => {

    const fetchUsers = async () => {
      try {

        let res = await getAllUsers('ALL')
        if (res && res.errorCode === 0) {
          setUsers(res.users)
        }
        else if (res) {
          console.log('>>>res error: ', res)
        }
      }
      catch (e) {
        console.log('>>>error:', e)

      }
    }
    fetchUsers()
  }, [])
  const handleAddNewUser = () => {
    setShowModalCreateUser(!showModalCreateUser)
  }
  return (
    <div className="manage-users">
      <div className="title text-center"> Manage Users

      </div>
      <div className="users-table">

        <div className='w-75 mx-auto mt-5'>
          <div className='mx-1'>
            <button className='btn-add-user btn btn-outline-primary px-2 d-flex justify-content-start'
              onClick={() => { handleAddNewUser() }}
            >
              Add new user
            </button>
          </div>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody >
              {users && users.map(user => (
                <tr key={user.id}>
                  <th scope="row">
                    {user.id}
                  </th>
                  <td>
                    {user.email}
                  </td>
                  <td>
                    {user.firstName}
                  </td>
                  <td>
                    {user.lastName}
                  </td>
                  <td>
                    {user.address}
                  </td>
                  <td>
                    <div className='action-buttons'>
                      <button className="btn-edit btn btn-outline-secondary btn-sm">
                        <FiEdit3 />
                      </button>
                      <button className="btn-delete btn btn-outline-warning btn-sm">
                        <RiDeleteBin6Line />
                      </button>

                    </div>

                  </td>
                </tr>
              ))}


            </tbody>
          </table>
        </div>

      </div>

      <ModalUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}

        toggle={toggleModalCreateUser}
      />
    </div>
  );
}
export default UserManage;

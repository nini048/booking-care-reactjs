import { async } from 'q';
import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
const UserManage = (props) => {

  const [users, setUsers] = useState([])
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
  return (
    <div className="manage-users">
      <div className="title text-center"> Manage Users
      </div>
      <div className="users-table">
        <table className="table table-hover table-striped w-75 mx-auto mt-5">
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
                  <a href="" role='button' className="btn btn-outline-secondary">Edit</a>
                  <a href="" className="btn btn-outline-danger" role='button'>Delete</a>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
      </div>


    </div>
  );
}
export default UserManage;

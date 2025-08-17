import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser';
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./UserManage.scss";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [isCreateUser, setIsCreateUser] = useState(false);

  const toggleModalCreateUser = () => {
    setShowModalCreateUser(!showModalCreateUser);
  };

  const fetchUsers = async () => {
    try {
      let res = await getAllUsers('ALL');
      if (res && res.errorCode === 0) {
        setUsers(res.users);
        setIsCreateUser(false);
      } else if (res) {
        console.log('>>>res error: ', res);
      }
    } catch (e) {
      console.log('>>>error:', e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [isCreateUser]);

  return (
    <div className="manage-users">
      <div className="title text-center">Manage Users</div>

      <div className="users-table">
        <div className='w-75 mx-auto mt-5'>
          <div className='mx-1 mb-3'>
            <button
              className='btn-add-user btn btn-outline-primary px-2 d-flex justify-content-start'
              onClick={toggleModalCreateUser}
            >
              Add new user
            </button>
          </div>

          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map(user => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>
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
        isCreateUser={isCreateUser}
        setIsCreateUser={setIsCreateUser}
        toggle={toggleModalCreateUser}
      />
    </div>
  );
};

export default UserManage;

import React, { useEffect, useState } from 'react';
import { getAllUsers, dele } from '../../services/userService';
import ModalUser from './ModalUser';
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./UserManage.scss";
import ModalDeleteUser from './ModalDeleteUser';
import { emitter } from '../../utils/emitter';

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [user, setUser] = useState({})
  const toggleModalCreateUser = () => {
    setShowModalCreateUser(!showModalCreateUser);
  };
  const toggleModalDeleteUser = () => {

    setShowModalDeleteUser(!showModalDeleteUser);
  }
  const toggleModalEditUser = () => {
    setShowModalEditUser(!showModalEditUser)

  }
  const handleDeleteUser = (userData) => {
    toggleModalDeleteUser();
    setUser(userData)
  };
  const fetchUsers = async () => {
    try {
      let res = await getAllUsers('ALL');
      if (res && res.errorCode === 0) {
        setUsers(res.users);
      } else if (res) {
        console.log('>>>res error: ', res);
      }
    } catch (e) {
      console.log('>>>error:', e);
    }
  };

  useEffect(() => {
    fetchUsers(); // lần đầu
    emitter.on("EVENT_RELOAD_USERS", fetchUsers);

    return () => {
      emitter.off("EVENT_RELOAD_USERS", fetchUsers); // cleanup khi unmount
    };
  }, []);


  return (
    <div className="manage-users">
      <div className="title text-center">Manage Users</div>

      <div className="users-table">
        <div className='w-75 mx-auto mt-5'>
          <div className='mx-1 mb-3'>
            <button
              className='btn-add-user btn btn-outline-primary px-2 d-flex justify-content-start'
              onClick={
                toggleModalCreateUser}
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
                      <button
                        className="btn-edit btn btn-outline-secondary btn-sm"
                        onClick={() => { toggleModalEditUser() }}
                      >
                        <FiEdit3 />
                      </button>
                      <button
                        className="btn-delete btn btn-outline-warning btn-sm"
                        onClick={() => { handleDeleteUser(user) }}
                      >
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
        toggle={toggleModalCreateUser}
        user={user}
      />
      <ModalDeleteUser
        show={showModalDeleteUser}
        toggle={toggleModalDeleteUser}
        user={user}
        setUser={setUser}

      />
    </div>
  );
};

export default UserManage;

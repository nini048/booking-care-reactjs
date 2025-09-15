import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, fetchAllCodeStart, fetchAllUsersStart, fetchUserByIdStart, updateUserStart } from "../../../store/actions";
import './TableManageUser.scss'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { translateMessage } from "../../../utils/translateMessage";

import EditModalUser from "./EditModalUser";
const MySwal = withReactContent(Swal);
const TableManageUser = (props) => {
  const { users } = props
  const dispatch = useDispatch()

  const intl = useIntl();
  const language = useSelector((state) => state.app.language);
  const genders = useSelector((state) => state.admin.genders);
  const roles = useSelector((state) => state.admin.roles);
  const positions = useSelector((state) => state.admin.positions);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleView = async (user) => {
    try {

      if (!user) {
        Swal.fire({
          icon: "error",
          title: intl.formatMessage({ id: "message.error" }),
          text: intl.formatMessage({ id: "manage-user.user-not-found" }),
          confirmButtonText: intl.formatMessage({ id: "message.ok" }),
        });
        return;
      }


      const genderObj = genders.find(g => g.key === user.gender);
      const roleObj = roles.find(r => r.key === user.roleId);
      const positionObj = positions.find(p => p.key === user.positionId);

      const genderText = genderObj ? (language === "vi" ? genderObj.valueVi : genderObj.valueEn) : user.gender;
      const roleText = roleObj ? (language === "vi" ? roleObj.valueVi : roleObj.valueEn) : user.roleId;
      const positionText = positionObj ? (language === "vi" ? positionObj.valueVi : positionObj.valueEn) : user.positionId;
      const avatarUrl = user.image
        ? `http://localhost:8080/uploads/${user.image}`
        : "https://via.placeholder.com/100";
      MySwal.fire({
        title: `<div style="text-align:center; font-weight:bold;">${intl.formatMessage({ id: "manage-user.view" })}</div>`,
        html: `
    <div style="display:flex; gap:20px; align-items:flex-start; font-size:14px; line-height:1.6;">
      <!-- Avatar bên trái -->
      <div style="flex:0 0 130px; text-align:center;">
        <img 
          src="${avatarUrl}" 
          alt="Avatar" 
          style="
            width:130px; 
            height:130px; 
            object-fit:cover; 
            border-radius:50%; 
            border:2px solid #ddd;
          " 
        />
      </div>

      <!-- Thông tin bên phải -->
      <div style="
        display:grid; 
        grid-template-columns:1fr 1fr; 
        gap:12px 30px; 
        flex:1;
      ">
        <div><b>${intl.formatMessage({ id: "manage-user.email" })}:</b> ${user.email}</div>
        <div><b>${intl.formatMessage({ id: "manage-user.last-name" })}:</b> ${user.lastName}</div>

        <div><b>${intl.formatMessage({ id: "manage-user.first-name" })}:</b> ${user.firstName}</div>
        <div><b>${intl.formatMessage({ id: "manage-user.address" })}:</b> ${user.address}</div>

        <div><b>${intl.formatMessage({ id: "manage-user.phone-number" })}:</b> ${user.phoneNumber}</div>
        <div><b>${intl.formatMessage({ id: "manage-user.gender" })}:</b> ${genderText}</div>

        <div><b>${intl.formatMessage({ id: "manage-user.position" })}:</b> ${positionText}</div>
        <div><b>${intl.formatMessage({ id: "manage-user.role" })}:</b> ${roleText}</div>
      </div>
    </div>
  `,
        width: 650,
        padding: '1.8rem',
        showConfirmButton: true,
        confirmButtonText: intl.formatMessage({ id: "message.ok" }),
        background: '#ffffff',
        backdrop: `rgba(0,0,0,0.25)`,
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: intl.formatMessage({ id: "message.error" }),
        text: error.message || "Fetch user error",
        confirmButtonText: intl.formatMessage({ id: "message.ok" }),
      });
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const handleUpdateUser = async (values, userId) => {
    const res = await dispatch(updateUserStart(userId, values));
    if (res && res.errorCode === 0) {
      Swal.fire("Thành công!", "Cập nhật user thành công", "success");
      dispatch(fetchAllUsersStart());
      setShowEditModal(false);
    } else {
      Swal.fire("Lỗi!", res.message || "Cập nhật thất bại", "error");
    }
  };
  const handleDelete = (userId) => {
    Swal.fire({
      title: intl.formatMessage({ id: "alert.delete.title" }),
      text: intl.formatMessage({ id: "alert.delete.text" }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: intl.formatMessage({ id: "alert.delete.confirm" }),
      cancelButtonText: intl.formatMessage({ id: "alert.delete.cancel" })
    }).then(async (result) => {
      if (result.isConfirmed) {
        // gọi API delete
        const res = await dispatch(deleteUserStart(userId));

        if (res && res.errorCode === 0) {
          Swal.fire({
            title: intl.formatMessage({ id: "message.success" }),
            text: translateMessage(res.message, language),
            icon: "success",
            confirmButtonText: intl.formatMessage({ id: "message.ok" })
          });
        } else {
          Swal.fire({
            title: intl.formatMessage({ id: "message.error" }),
            text: translateMessage(res.message, language),
            icon: "error",
            confirmButtonText: intl.formatMessage({ id: "message.ok" })
          });
        }
      }
    });
  };
  return (
    <>
      <div className="table-manage-user mt-5">
        <h5 className="title-table mb-3">Danh sách người dùng</h5>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>
                <FormattedMessage id="manage-user.email" />
              </th>
              <th>
                <FormattedMessage id="manage-user.last-name" />
              </th>
              <th>
                <FormattedMessage id="manage-user.first-name" />
              </th>
              <th>
                <FormattedMessage id="manage-user.address" />
              </th>
              <th>
                <FormattedMessage id="manage-user.actions" />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, i) => (
                <tr key={i}>
                  <td>{u.email}</td>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.address}</td>
                  <td className='actions'>
                    <button
                      className="btn-view btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleView(u)}
                    >
                      <FormattedMessage id="manage-user.view" />
                    </button>
                    <button
                      className="btn-edit btn btn-sm btn-outline-success me-2"
                      onClick={() => handleEdit(u)}
                    >
                      <FormattedMessage id="manage-user.edit" />
                    </button>
                    <button
                      className="btn-delete btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(u.id)}
                    >
                      <FormattedMessage id="manage-user.delete" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Chưa có người dùng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showEditModal && selectedUser && (
        <EditModalUser
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          user={selectedUser}
          roles={roles}
          positions={positions}
          onSubmit={handleUpdateUser}
        />
      )}

    </>

  );
};

export default TableManageUser;

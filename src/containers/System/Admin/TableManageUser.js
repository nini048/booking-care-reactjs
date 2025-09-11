import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, fetchAllCodeStart, fetchAllUsersStart, fetchUserByIdStart, updateUserStart } from "../../../store/actions";
import './TableManageUser.scss'
import EditUserModal from "./EditUserModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { translateMessage } from "../../../utils/translateMessage";

const MySwal = withReactContent(Swal);
const TableManageUser = (props) => {
  const { users } = props
  const dispatch = useDispatch()

  const intl = useIntl();
  const language = useSelector((state) => state.app.language);
  const genders = useSelector((state) => state.admin.genders);
  const roles = useSelector((state) => state.admin.roles);
  const positions = useSelector((state) => state.admin.positions);

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


      // map id/key sang text hiển thị
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

  const handleEdit = async (user) => {
    const { value: formValues } = await MySwal.fire({
      title: 'Chỉnh sửa người dùng',
      html: `
      <div style="display:flex; gap:20px; align-items:flex-start;">
        <!-- Avatar bên trái -->
        <div style="flex:0 0 120px; text-align:center;">
          <img src="${user.image ? `http://localhost:8080/uploads/${user.image}` : 'https://via.placeholder.com/100'}" 
               style="width:100px;height:100px;border-radius:50%;border:2px solid #ddd;object-fit:cover"/>
        </div>

        <!-- Form bên phải -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 20px; flex:1;">
          <div>
            <label>Họ</label>
            <input id="swal-firstName" class="swal2-input" placeholder="Họ" value="${user.firstName}">
          </div>
          <div>
            <label>Tên</label>
            <input id="swal-lastName" class="swal2-input" placeholder="Tên" value="${user.lastName}">
          </div>
          <div>
            <label>Địa chỉ</label>
            <input id="swal-address" class="swal2-input" placeholder="Địa chỉ" value="${user.address}">
          </div>
          <div>
            <label>SĐT</label>
            <input id="swal-phoneNumber" class="swal2-input" placeholder="SĐT" value="${user.phoneNumber}">
          </div>
          <div>
            <label>Giới tính</label>
            <select id="swal-gender" class="swal2-input">
              <option value="M" ${user.gender === 'M' ? 'selected' : ''}>Nam</option>
              <option value="F" ${user.gender === 'F' ? 'selected' : ''}>Nữ</option>
            </select>
          </div>
          <div>
            <label>Role</label>
            <select id="swal-role" class="swal2-input">
              ${roles.map(r => `<option value="${r.key}" ${user.roleId === r.key ? 'selected' : ''}>${language === 'vi' ? r.valueVi : r.valueEn}</option>`).join('')}
            </select>
          </div>
          <div>
            <label>Chức vụ</label>
            <select id="swal-position" class="swal2-input">
              ${positions.map(p => `<option value="${p.key}" ${user.positionId === p.key ? 'selected' : ''}>${language === 'vi' ? p.valueVi : p.valueEn}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      focusConfirm: false,
      preConfirm: () => {
        return {
          firstName: document.getElementById('swal-firstName').value,
          lastName: document.getElementById('swal-lastName').value,
          address: document.getElementById('swal-address').value,
          phoneNumber: document.getElementById('swal-phoneNumber').value,
          gender: document.getElementById('swal-gender').value,
          role: document.getElementById('swal-role').value,
          position: document.getElementById('swal-position').value,
        }
      }
    });

    if (formValues) {
      const formData = new FormData();
      Object.keys(formValues).forEach(key => formData.append(key, formValues[key]));
      const fileInput = document.getElementById('swal-avatar'); // thêm input type="file"
      if (fileInput && fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }
      const res = await dispatch(updateUserStart(user.id, formData));
      console.log('userid edit', user.id)
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      console.log('res', res)
      if (res && res.errorCode === 0) {
        Swal.fire('Thành công!', 'Cập nhật user thành công', 'success');
        dispatch(fetchAllUsersStart());
      } else {
        Swal.fire('Lỗi!', res.message || 'Cập nhật thất bại', 'error');
      }
    }
  }

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
  );
};

export default TableManageUser;

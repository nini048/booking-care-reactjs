import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCodeStart, fetchAllUsersStart } from "../../../store/actions";

const TableManageUser = () => {
  const users = useSelector((state) => state.admin.users || []);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = () => {
      dispatch(fetchAllUsersStart())
    }
    fetchUsers()

  }, [dispatch])
  console.log('users: ', users)
  return (
    <div className="table-manage-user mt-5">
      <h5 className="mb-3">Danh sách người dùng</h5>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Email</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Ảnh</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u, i) => (
              <tr key={i}>
                <td>{u.email}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.address}</td>
                <td>{u.roleId}</td>
                <td>
                  {u.image ? (
                    <img
                      src={u.image}
                      alt="avatar"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                    />
                  ) : (
                    "N/A"
                  )}
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

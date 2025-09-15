
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./EditModalUser.scss";

const EditModalUser = ({ show, onClose, user, onSubmit, roles, positions }) => {
  console.log('user edit', user)
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Vui lòng nhập họ"),
    lastName: Yup.string().required("Vui lòng nhập tên"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
      .required("Vui lòng nhập số điện thoại"),
  });

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa người dùng</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          address: user.address || "",
          phoneNumber: user.phoneNumber || "",
          gender: user.gender || "M",
          roleId: user.roleId || "",
          positionId: user.positionId || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values, user.id);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Modal.Body>
              <div className="form-group">
                <label>Họ</label>
                <Field name="firstName" className="form-control" />
                <ErrorMessage name="firstName" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Tên</label>
                <Field name="lastName" className="form-control" />
                <ErrorMessage name="lastName" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <Field name="address" className="form-control" />
                <ErrorMessage name="address" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <Field name="phoneNumber" className="form-control" />
                <ErrorMessage name="phoneNumber" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Giới tính</label>
                <Field as="select" name="gender" className="form-control">
                  <option value="M">Nam</option>
                  <option value="F">Nữ</option>
                </Field>
              </div>

              <div className="form-group">
                <label>Vai trò</label>
                <Field as="select" name="roleId" className="form-control">
                  {roles.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.valueVi}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="form-group">
                <label>Chức vụ</label>
                <Field as="select" name="positionId" className="form-control">
                  {positions.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.valueVi}
                    </option>
                  ))}
                </Field>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Đóng
              </Button>
              <Button variant="primary" type="submit">
                Lưu thay đổi
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditModalUser;

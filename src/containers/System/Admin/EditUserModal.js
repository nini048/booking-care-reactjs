import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditUserModal = ({ show, onClose, userData, onSubmit }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userData?.image) {
      setPreview(`http://localhost:8080/uploads/${userData.image}`);
    } else {
      setPreview(null);
    }
  }, [userData]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Họ bắt buộc"),
    lastName: Yup.string().required("Tên bắt buộc"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại bắt buộc"),
    address: Yup.string().required("Địa chỉ bắt buộc"),
  });

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa người dùng</Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={{
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          address: userData?.address || "",
          phoneNumber: userData?.phoneNumber || "",
          gender: userData?.gender || "",
          roleId: userData?.role || "",
          positionId: userData?.position || "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="p-3">
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Họ</label>
                <Field name="firstName" className="form-control" />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>
              <div className="col-md-6">
                <label>Tên</label>
                <Field name="lastName" className="form-control" />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Địa chỉ</label>
                <Field name="address" className="form-control" />
                <ErrorMessage name="address" component="div" className="text-danger" />
              </div>
              <div className="col-md-6">
                <label>Số điện thoại</label>
                <Field name="phoneNumber" className="form-control" />
                <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label>Giới tính</label>
                <Field as="select" name="gender" className="form-select">
                  <option value="">Chọn giới tính</option>
                  <option value="M">Nam</option>
                  <option value="F">Nữ</option>
                </Field>
              </div>
              <div className="col-md-4">
                <label>Role</label>
                <Field as="select" name="roleId" className="form-select">
                  <option value="">Chọn role</option>
                  <option value="R1">Admin</option>
                  <option value="R2">User</option>
                </Field>
              </div>
              <div className="col-md-4">
                <label>Chức vụ</label>
                <Field as="select" name="positionId" className="form-select">
                  <option value="">Chọn chức vụ</option>
                  <option value="P1">Manager</option>
                  <option value="P2">Staff</option>
                </Field>
              </div>
            </div>

            <div className="text-center mb-3">
              <img
                src={preview || "https://via.placeholder.com/100"}
                alt="Avatar Preview"
                className="rounded-circle mb-2"
                style={{ width: "100px", height: "100px", objectFit: "cover", border: "1px solid #ccc" }}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="form-control mt-2"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("image", file);
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />
            </div>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={onClose}>Hủy</Button>
              <Button type="submit" variant="primary">Lưu</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditUserModal;

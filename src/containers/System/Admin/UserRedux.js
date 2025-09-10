import React, { useEffect, useRef, useState } from "react";
import "./UserRedux.scss";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import { ThreeDots } from "react-loader-spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const UserRedux = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const genders = useSelector((state) => state.admin.genders);
  const roles = useSelector((state) => state.admin.roles);
  const positions = useSelector((state) => state.admin.positions);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    dispatch(actions.fetchAllCodeStart("GENDER"));
    dispatch(actions.fetchAllCodeStart("POSITION"));
    dispatch(actions.fetchAllCodeStart("ROLE"));
  }, [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Email không hợp lệ").required("Email bắt buộc"),
    password: Yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Mật khẩu bắt buộc"),
    firstName: Yup.string().required("Họ bắt buộc"),
    lastName: Yup.string().required("Tên bắt buộc"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại bắt buộc"),
    address: Yup.string().required("Địa chỉ bắt buộc"),
    gender: Yup.string().required("Giới tính bắt buộc"),
    role: Yup.string().required("Role bắt buộc"),
    position: Yup.string().required("Chức vụ bắt buộc"),
    image: Yup.mixed().required("Avatar bắt buộc"),
  });

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    gender: genders?.[0]?.key || "",   // lấy option đầu tiên
    role: roles?.[0]?.key || "",
    position: positions?.[0]?.key || "",
    image: null,
  };

  const fileInputRef = useRef(null);
  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    let res = await dispatch(actions.createNewUser(formData));

    console.log("res: ", res);

    if (res && res.errorCode === 0) {
      resetForm();
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  return (
    <div className="user-redux-container container">
      <div className="title my-4 text-center fw-bold fs-4">
        <FormattedMessage id="manage-user.add" />
      </div>

      {isLoading ? (
        <div className="loading-wrapper text-center my-5">
          <ThreeDots height="60" width="60" radius="9" color="#0d6efd" visible={true} />
        </div>
      ) : (
        <Formik
          enableReinitialize
          initialValues={
            initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="row g-4">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Nhập email"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Nhập mật khẩu"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">
                      <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <Field type="text" name="firstName" className="form-control" placeholder="Họ" />
                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <Field type="text" name="lastName" className="form-control" placeholder="Tên" />
                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">
                      <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <Field type="text" name="phoneNumber" className="form-control" placeholder="Số điện thoại" />
                    <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <Field type="text" name="address" className="form-control" placeholder="Địa chỉ" />
                    <ErrorMessage name="address" component="div" className="text-danger" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <label className="form-label">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <Field as="select" name="gender" className="form-select">
                      {genders.map((g, i) => (
                        <option key={i} value={g.key}>
                          {language === LANGUAGES.VI ? g.valueVi : g.valueEn}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-danger" />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <Field as="select" name="role" className="form-select">
                      {roles.map((r, i) => (
                        <option key={i} value={r.key}>
                          {language === LANGUAGES.VI ? r.valueVi : r.valueEn}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="role" component="div" className="text-danger" />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <Field as="select" name="position" className="form-select">
                      {positions.map((p, i) => (
                        <option key={i} value={p.key}>
                          {language === LANGUAGES.VI ? p.valueVi : p.valueEn}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="position" component="div" className="text-danger" />
                  </div>
                </div>
              </div>

              <div className="right-content col-lg-4">
                <label className="form-label">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    setFieldValue("image", file);
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />

                <div className="avatar-preview mt-3 text-center">
                  <img
                    src={preview} // ảnh mặc định nếu chưa chọn
                    alt="Avatar Preview"
                    className="img-fluid rounded"
                  />
                </div>

                <ErrorMessage name="image" component="div" className="text-danger" />

                <button type="submit" className="btn btn-secondary btn-submit mt-3">
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UserRedux;

import React, { useEffect, useRef, useState } from "react";
import "./UserRedux.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import { ThreeDots } from "react-loader-spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TableManageUser from "./TableManageUser";
import Swal from "sweetalert2";
import { translateMessage } from "../../../utils/translateMessage";
import Markdown from "./Markdown";


const UserRedux = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const genders = useSelector((state) => state.admin.genders);
  const roles = useSelector((state) => state.admin.roles);
  const positions = useSelector((state) => state.admin.positions);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const [preview, setPreview] = useState(null);
  const users = useSelector((state) => state.admin.users || []);
  const intl = useIntl();


  useEffect(() => {
    dispatch(actions.fetchAllCodeStart("GENDER"));
    dispatch(actions.fetchAllCodeStart("POSITION"));
    dispatch(actions.fetchAllCodeStart("ROLE"));
    dispatch(actions.fetchAllUsersStart())
  }, [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(translateMessage("Invalid email / Email không hợp lệ", language))
      .required(translateMessage("Email is required / Email bắt buộc", language)),
    password: Yup.string()
      .min(6, translateMessage("Password must be at least 6 characters / Mật khẩu ít nhất 6 ký tự", language))
      .required(translateMessage("Password is required / Mật khẩu bắt buộc", language)),
    firstName: Yup.string()
      .required(translateMessage("First name is required / Họ bắt buộc", language)),
    lastName: Yup.string()
      .required(translateMessage("Last name is required / Tên bắt buộc", language)),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10,15}$/, translateMessage("Invalid phone number / Số điện thoại không hợp lệ", language))
      .required(translateMessage("Phone number is required / Số điện thoại bắt buộc", language)),
    address: Yup.string()
      .required(translateMessage("Address is required / Địa chỉ bắt buộc", language)),
    gender: Yup.string()
      .required(translateMessage("Gender is required / Giới tính bắt buộc", language)),
    role: Yup.string()
      .required(translateMessage("Role is required / Role bắt buộc", language)),
    position: Yup.string()
      .required(translateMessage("Position is required / Chức vụ bắt buộc", language)),
    image: Yup.mixed()
      .required(translateMessage("Avatar is required / Avatar bắt buộc", language)),
  });

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    gender: genders?.[0]?.keyMap || "",
    role: roles?.[0]?.keyMap || "",
    position: positions?.[0]?.keyMap || "",
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
      Swal.fire({
        title: translateMessage("Success! / Thành công!", language),
        text: translateMessage(res.message, language),
        icon: "success",
        confirmButtonText: "OK"
      });
      resetForm();
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
    else {
      Swal.fire({
        title: translateMessage("Error! / Thất bại!", language),
        text: translateMessage(res.message, language),
        icon: "error",

        confirmButtonText: "OK"
      });

    }
  };

  console.log('users: ', users)
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
        <>
          {genders && genders.length > 0 && roles && roles.length > 0 && positions && positions.length > 0
            && (

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
                            placeholder={intl.formatMessage({ id: "manage-user.email-placeholder" })}
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
                            placeholder={intl.formatMessage({ id: "manage-user.password-placeholder" })}
                          />
                          <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">
                            <FormattedMessage id="manage-user.first-name" />
                          </label>
                          <Field type="text"
                            name="firstName"
                            className="form-control"
                            placeholder={intl.formatMessage({ id: "manage-user.first-name-placeholder" })}
                          />
                          <ErrorMessage name="firstName" component="div" className="text-danger" />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            <FormattedMessage id="manage-user.last-name" />
                          </label>
                          <Field type="text"
                            name="lastName"
                            className="form-control"
                            placeholder={intl.formatMessage({ id: "manage-user.last-name-placeholder" })}
                          />
                          <ErrorMessage name="lastName" component="div" className="text-danger" />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">
                            <FormattedMessage id="manage-user.phone-number" />
                          </label>
                          <Field type="text"
                            name="phoneNumber"
                            className="form-control"
                            placeholder={intl.formatMessage({ id: "manage-user.phone-number-placeholder" })}
                          />
                          <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            <FormattedMessage id="manage-user.address" />
                          </label>
                          <Field type="text"
                            name="address"
                            className="form-control"
                            placeholder={intl.formatMessage({ id: "manage-user.address-placeholder" })}
                          />
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
                              <option key={i} value={g.keyMap}>
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
                              <option key={i} value={r.keyMap}>
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
                              <option key={i} value={p.keyMap}>
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


          <TableManageUser
            users={users}
          />
        </>

      )}

    </div>
  );
};

export default UserRedux;

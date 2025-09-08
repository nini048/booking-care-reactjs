import React, { useEffect, useState } from "react";
import "./UserRedux.scss";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import { ThreeDots } from "react-loader-spinner";

const UserRedux = () => {
  const language = useSelector((state) => state.app.language);
  const genders = useSelector((state) => state.admin.genders);
  const roles = useSelector((state) => state.admin.roles);
  const positions = useSelector((state) => state.admin.positions);
  const isLoading = useSelector((state) => state.admin.isLoading);

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchAllCodeStart("GENDER"));
    dispatch(actions.fetchAllCodeStart("POSITION"));
    dispatch(actions.fetchAllCodeStart("ROLE"));
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="user-redux-container container">
      <div className="title my-4 text-center fw-bold fs-4">
        <FormattedMessage id="manage-user.add" />
      </div>

      {isLoading && (
        <div className="loading-wrapper text-center my-5">
          <ThreeDots
            height="60"
            width="60"
            radius="9"
            color="#0d6efd"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      )}

      {!isLoading && (
        <form className="row g-4">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  <FormattedMessage id="manage-user.email" />
                </label>
                <FormattedMessage id="manage-user.email-placeholder">
                  {(msg) => (
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder={msg}
                    />
                  )}
                </FormattedMessage>
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  <FormattedMessage id="manage-user.password" />
                </label>
                <FormattedMessage id="manage-user.password-placeholder">
                  {(msg) => (
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder={msg}
                    />
                  )}
                </FormattedMessage>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <FormattedMessage id="manage-user.first-name-placeholder">
                  {(msg) => (
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder={msg}
                    />
                  )}
                </FormattedMessage>
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <FormattedMessage id="manage-user.last-name-placeholder">
                  {(msg) => (
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder={msg}
                    />
                  )}
                </FormattedMessage>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <FormattedMessage id="manage-user.phone-number-placeholder">
                  {(msg) => (
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      placeholder={msg}
                    />
                  )}
                </FormattedMessage>
              </div>
              <div className="col-md-6">
                <label htmlFor="address" className="form-label">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <FormattedMessage id="manage-user.address-placeholder">
                  {(msg) => (
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder={msg}
                    />
                  )}
                </FormattedMessage>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label htmlFor="gender" className="form-label">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select id="gender" className="form-select">
                  {genders &&
                    genders.map((gender, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI
                          ? gender.valueVi
                          : gender.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="role" className="form-label">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select id="role" className="form-select">
                  {roles &&
                    roles.map((role, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI
                          ? role.valueVi
                          : role.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="position" className="form-label">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select id="position" className="form-select">
                  {positions &&
                    positions.map((position, index) => (
                      <option key={index}>
                        {language === LANGUAGES.VI
                          ? position.valueVi
                          : position.valueEn}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="right-content col-lg-4">
            <label htmlFor="image" className="form-label">
              <FormattedMessage id="manage-user.image" />
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
            />

            <div className="avatar-preview mt-3 text-center">
              {preview ? (
                <img src={preview} alt="Avatar Preview" className="img-fluid rounded" />
              ) : (
                <div className="placeholder">No preview image</div>
              )}
            </div>
            <button type="button" className="btn btn-secondary btn-submit">
              <FormattedMessage id='manage-user.save' />
            </button>

          </div>
        </form>
      )}
    </div>
  );
};

export default UserRedux;

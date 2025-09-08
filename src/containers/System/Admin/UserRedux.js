import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from '../../../store/actions'
const UserRedux = () => {
  const language = useSelector((state) => state.app.language)
  const genders = useSelector((state) => state.admin.genders)
  const roles = useSelector((state) => state.admin.roles)
  const positions = useSelector((state) => state.admin.positions)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.fetchAllCodeStart('GENDER'))
    dispatch(actions.fetchAllCodeStart('POSITION'))
    dispatch(actions.fetchAllCodeStart('ROLE'))
  }, [])

  console.log('genders: ', genders)
  return (
    <div className="user-redux-container">
      <div className="user-redux-body">
        <div className="container">
          <div className="title my-3">
            <FormattedMessage id='manage-user.add' />
          </div>
          <form>
            {/* Hàng 1 */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  <FormattedMessage id='manage-user.email' />

                </label>
                <FormattedMessage id="manage-user.email-placeholder">
                  {(msg) => (
                    <input type="email" className="form-control" id="email" placeholder={msg} />
                  )}
                </FormattedMessage>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">
                  <FormattedMessage id='manage-user.password' />
                </label>
                <FormattedMessage id="manage-user.password-placeholder">
                  {(msg) => (
                    <input type="password" className="form-control" id="password" placeholder={msg} />
                  )}
                </FormattedMessage>

              </div>
            </div>

            {/* Hàng 2 */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  <FormattedMessage id='manage-user.first-name' />
                </label>
                <FormattedMessage id="manage-user.first-name-placeholder">
                  {(msg) => (
                    <input type="text" className="form-control" id="firstName" placeholder={msg} />
                  )}
                </FormattedMessage>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  <FormattedMessage id='manage-user.last-name' />
                </label>
                <FormattedMessage id="manage-user.last-name-placeholder">
                  {(msg) => (
                    <input type="text" className="form-control" id="lastName" placeholder={msg} />
                  )}
                </FormattedMessage>

              </div>
            </div>

            {/* Hàng 3 */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  <FormattedMessage id='manage-user.phone-number' />
                </label>
                <FormattedMessage id="manage-user.phone-number-placeholder">
                  {(msg) => (
                    <input type="text" className="form-control" id="phoneNumber" placeholder={msg} />
                  )}
                </FormattedMessage>

              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">
                  <FormattedMessage id='manage-user.address' />
                </label>
                <FormattedMessage id="manage-user.address-placeholder">
                  {(msg) => (
                    <input type="text" className="form-control" id="address" placeholder={msg} />
                  )}
                </FormattedMessage>

              </div>
            </div>

            {/* Hàng 4 */}
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="gender" className="form-label">
                  <FormattedMessage id='manage-user.gender' />
                </label>
                <select id="gender" className="form-select">
                  {genders && genders.length > 0 &&
                    genders.map((gender, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
                        </option>

                      )
                    })
                  }
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="role" className="form-label">
                  <FormattedMessage id='manage-user.role' />
                </label>
                <select id="role" className="form-select">
                  {roles && roles.length > 0 &&
                    roles.map((role, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI ? role.valueVi : role.valueEn}
                        </option>

                      )
                    })
                  }

                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="position" className="form-label">
                  <FormattedMessage id='manage-user.position' />
                </label>
                <select id="position" className="form-select">
                  {positions && positions.length > 0 &&
                    positions.map((position, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI ? position.valueVi : position.valueEn}
                        </option>

                      )
                    })
                  }

                </select>
              </div>
              {/* <div className="col-md-3 mb-3"> */}
              {/*   <label htmlFor="roleId" className="form-label">RoleID</label> */}
              {/*   <select id="roleId" className="form-select"> */}
              {/*     <option defaultValue>Choose...</option> */}
              {/*     <option>Admin</option> */}
              {/*     <option>User</option> */}
              {/*   </select> */}
              {/* </div> */}
              <div className="col-md-3 mb-3">
                <label htmlFor="image" className="form-label">
                  <FormattedMessage id='manage-user.image' />
                </label>
                <input type="file" className="form-control" id="image" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              <FormattedMessage id='manage-user.save' />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRedux;

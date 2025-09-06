import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
const UserRedux = () => {
  const [genders, setGenders] = useState([])
  const language = useSelector((state) => state.app.language)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getAllCodeService('GENDER')
        if (res && res.errorCode === 0) {
          setGenders(res.data)

        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  console.log('>>res gender: ', genders)
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
                <input type="email" className="form-control" id="email" placeholder="Enter email" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">
                  <FormattedMessage id='manage-user.password' />
                </label>
                <input type="password" className="form-control" id="password" placeholder="Enter password" />
              </div>
            </div>

            {/* Hàng 2 */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  <FormattedMessage id='manage-user.first-name' />
                </label>
                <input type="text" className="form-control" id="firstName" placeholder="First name" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  <FormattedMessage id='manage-user.last-name' />
                </label>
                <input type="text" className="form-control" id="lastName" placeholder="Last name" />
              </div>
            </div>

            {/* Hàng 3 */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  <FormattedMessage id='manage-user.phone-number' />
                </label>
                <input type="text" className="form-control" id="phone" placeholder="Enter phone number" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">
                  <FormattedMessage id='manage-user.address' />
                </label>
                <input type="text" className="form-control" id="address" placeholder="Enter address" />
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
                <label htmlFor="position" className="form-label">
                  <FormattedMessage id='manage-user.role' />
                </label>
                <select id="position" className="form-select">
                  <option defaultValue>Choose...</option>
                  <option>Staff</option>
                  <option>Manager</option>
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


import actionTypes from './actionTypes';

import { createNewUserService, getAllCodeService } from '../../services/userService';
export const fetchAllCodeStart = (inputType) => {

  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALLCODE_START })
      let res = await getAllCodeService(inputType)
      if (res && res.errorCode === 0) {
        dispatch(fetchAllCodeSuccess(inputType, res.data));
      } else {
        dispatch(fetchAllCodeFailed(inputType));
      }
    } catch (e) {
      dispatch(fetchAllCodeFailed(inputType));
    }
  }
};
export const fetchAllCodeSuccess = (codeType, data) => ({
  type: actionTypes.FETCH_ALLCODE_SUCCESS,
  codeType,
  data
})
export const fetchAllCodeFailed = (codeType) => ({
  type: actionTypes.FETCH_ALLCODE_FAILED,
  codeType
})
export const createNewUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CREATE_USER_START });

      let res = await createNewUserService(data);
      console.log("res:", res);

      if (res && res.errorCode === 0) {
        dispatch(createNewUserSuccess(res));
      } else {
        dispatch(createNewUserFailed(res));
      }
    } catch (e) {
      dispatch(createNewUserFailed(e));
    }
  };
};

export const createNewUserSuccess = (res) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data: res,
});

export const createNewUserFailed = (error) => ({
  type: actionTypes.CREATE_USER_FAILED,
  data: error,
});

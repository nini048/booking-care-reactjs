
import actionTypes from './actionTypes';

import { getAllCodeService } from '../../services/userService';
export const fetchAllCodeStart = (inputType) => {
  return async (dispatch, getState) => {
    try {
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

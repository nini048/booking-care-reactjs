
import actionTypes from './actionTypes';

import {
  createNewUserService, deleteUser,
  getAllCodeService, getAllUsers, putEditUser,
  getTopDoctorHomeService,
  getAllDoctors,
  postInfoDoctor,
  getDetailInfoDoctor
} from '../../services/userService';
import { dispatch } from '../../redux';
export const fetchAllCodeStart = (inputType) => {

  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALLCODE_START })
      let res = await getAllCodeService(inputType)
      // let res1 = await getTopDoctorHomeService(2)
      // console.log('>>check res1: ', res1)
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
      dispatch({
        type: actionTypes.CREATE_USER_START
      });

      let res = await createNewUserService(data);

      if (res && res.errorCode === 0) {
        dispatch(createNewUserSuccess(res));
        dispatch(fetchAllUsersStart());
        return res
      } else {
        dispatch(createNewUserFailed(res));
        return res

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
export const fetchAllUsersStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_USERS_START });
      let res = await getAllUsers('ALL');
      if (res && res.errorCode === 0) {
        dispatch({ type: actionTypes.FETCH_ALL_USERS_SUCCESS, users: res.users });

      } else {
        dispatch({ type: actionTypes.FETCH_ALL_USERS_FAILED });
      }
      return res;
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_USERS_FAILED });
      return { errorCode: 1, message: 'Fetch users error' };
    }
  }
}
export const fetchUserByIdStart = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_USER_BY_ID_START });
      let res = await getAllUsers(userId);
      if (res && res.errorCode === 0) {
        dispatch({ type: actionTypes.FETCH_USER_BY_ID_SUCCESS, user: res.users });

      } else {
        dispatch({ type: actionTypes.FETCH_ALL_USERS_FAILED });
      }
      return res;
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_USERS_FAILED });
      return { errorCode: 1, message: 'Fetch users error' };
    }
  }
}

export const deleteUserStart = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.DELETE_USER_START });
      let res = await deleteUser(userId)
      if (res && res.errorCode === 0) {
        dispatch(deleteUserSuccess(userId));
        dispatch(fetchAllUsersStart());


      } else {
        dispatch(deleteUserFailed());
      }
      return res;
    } catch (e) {
      dispatch({ type: actionTypes.DELETE_USER_FAILED });
      return { errorCode: 1, message: 'Delete user error' };
    }
  }
}
export const deleteUserSuccess = (userId) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  userId,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED
});

export const updateUserStart = (userId, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_USER_START
      });

      let res = await putEditUser(userId, data);

      if (res && res.errorCode === 0) {
        dispatch(updateUserSuccess(res));
        dispatch(fetchAllUsersStart());
        return res
      } else {
        dispatch(updateUserFailed(res));
        return res

      }
    } catch (e) {
      dispatch(updateUserFailed());
    }
  };
};

export const updateUserSuccess = (res) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  data: res,
});

export const updateUserFailed = (error) => ({
  type: actionTypes.UPDATE_USER_FAILED,
  data: error,
});

export const fetchTopDoctor = (limit) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_START });
      let res = await getTopDoctorHomeService(limit);
      if (res && res.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          data: res
        });

      } else {
        dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
      }
      return res;
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
      return { errorCode: 1, message: 'Fetch users error' };
    }
  }
}

export const fetchAllDoctors = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_START });
      let res = await getAllDoctors();
      if (res && res.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          data: res
        });

      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      }
      return res;
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
      return { errorCode: 1, message: 'Fetch users error' };
    }
  }
}
export const postInfoDetailDoctor = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.POST_INFO_DOCTOR_START

      })
      let res = await postInfoDoctor(data)
      if (res && res.errorCode === 0) {
        dispatch({
          type: actionTypes.POST_INFO_DOCTOR_SUCCESS,
        })
        // dispatch(fetchInfoDetailDoctor(data.id))
      }
      else {
        dispatch({ type: actionTypes.POST_INFO_DOCTOR_FAILED })
      }
      return res
    }

    catch (e) {

      dispatch({ type: actionTypes.POST_INFO_DOCTOR_FAILED });
      return {
        errorCode: 1,
        message: 'Post info doctor failed'
      };
    }
  }
}
export const fetchInfoDetailDoctor = (id) => {
  return async (dispatch) => {
    try {

      dispatch({
        type: actionTypes.FETCH_INFO_DOCTOR_START
      })
      let res = await getDetailInfoDoctor(id)
      if (res && res.errorCode === 0) {

        dispatch({
          type: actionTypes.FETCH_INFO_DOCTOR_SUCCESS,
          data: res
        })
      }
      else {
        dispatch({
          type: actionTypes.FETCH_INFO_DOCTOR_FAILED
        })
      }
      return res

    }
    catch (e) {

      dispatch({ type: actionTypes.FETCH_INFO_DOCTOR_FAILED });
      return {
        errorCode: 1,
        message: 'Fetch info doctor failed'
      };
    }
  }
}

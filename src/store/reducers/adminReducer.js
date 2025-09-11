
import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: []
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALLCODE_START:

      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FETCH_ALLCODE_SUCCESS:
      if (action.codeType === 'GENDER') {
        return {
          ...state,
          genders: action.data,
          isLoading: false
        }

      }
      if (action.codeType === 'ROLE') {
        return {
          ...state,
          roles: action.data,
          isLoading: false
        }

      }
      if (action.codeType === 'POSITION') {
        return {
          ...state,
          positions: action.data,
          isLoading: false
        }

      }


      return state
    case actionTypes.FETCH_ALLCODE_FAILED:

      if (action.codeType === 'GENDER') {
        return {
          ...state, genders: [], isLoading: false
        };
      }
      if (action.codeType === 'ROLE') {
        return {
          ...state, roles: [], isLoading: false
        };
      }
      if (action.codeType === 'POSITION') {
        return {
          ...state, positions: [], isLoading: false
        };
      }
      return state;
    case actionTypes.FETCH_ALL_USERS_START:
      return {
        ...state,

      }
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.users].reverse(),
        // isLoading: false
      }
    case actionTypes.FETCH_ALL_USERS_FAILED:
      return {
        ...state, users: [],


      }
    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [action.data.users, ...state.users]
      }
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.userId),
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
      }
    case actionTypes.FETCH_TOP_DOCTOR_START:
      return {
        ...state,

      }
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      return {
        ...state,
        topDoctors: action.data?.data || []
        // isLoading: false
      }
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      return {
        ...state, topDoctors: [],


      }

    default:
      return state;
  }
}

export default adminReducer;

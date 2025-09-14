
import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  genders: [],
  roles: [],
  positions: [],
  prices: [],
  payments: [],
  provinces: [],
  times: [],
  users: [],
  topDoctors: [],
  doctors: [],
  infoDoctor: {},
  scheduleDoctor: [],
  specialties: []
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

      if (action.codeType === 'TIME') {
        return {
          ...state,
          times: action.data,
          isLoading: false
        }

      }
      if (action.codeType === 'PRICE') {
        return {
          ...state,
          prices: action.data,
          isLoading: false
        }

      }
      if (action.codeType === 'PAYMENT') {
        return {
          ...state,
          payments: action.data,
          isLoading: false
        }

      }
      if (action.codeType === 'PROVINCE') {
        return {
          ...state,
          provinces: action.data,
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
      if (action.codeType === 'PRICE') {
        return {
          ...state, prices: [], isLoading: false
        };
      }
      if (action.codeType === 'PAYMENT') {
        return {
          ...state, payments: [], isLoading: false
        };
      }
      if (action.codeType === 'PROVINCE') {
        return {
          ...state, provinces: [], isLoading: false
        };
      }



      if (action.codeType === 'TIME') {
        return {
          ...state, times: [], isLoading: false
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
    case actionTypes.FECTCH_ALL_SPECIALTY_START:
      return {
        ...state,

      }
    case actionTypes.FECTCH_ALL_SPECIALTY_SUCCESS:
      return {
        ...state,
        specialties: action.data.data
        // isLoading: false
      }
    case actionTypes.FECTCH_ALL_SPECIALTY_FAILED:
      return {
        ...state,
        specialties: [],


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
    case actionTypes.FETCH_ALL_DOCTORS_START:
      return {
        ...state,

      }
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: action.data?.data || []
        // isLoading: false
      }
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      return {
        ...state, doctors: [],


      }
    case actionTypes.FETCH_INFO_DOCTOR_START:
      return {
        ...state,

      }
    case actionTypes.FETCH_INFO_DOCTOR_SUCCESS:
      return {
        ...state,
        infoDoctor: action.data?.data || []
        // isLoading: false
      }
    case actionTypes.FETCH_INFO_DOCTOR_FAILED:
      return {
        ...state, infoDoctor: {},


      }
    case actionTypes.FETCH_SCHEDULE_DOCTOR_START:
      return {
        ...state
      }

    case actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS:
      return {
        ...state,
        scheduleDoctor: action.data
        // isLoading: false
      }
    case actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED:
      return {
        ...state,
        scheduleDoctor: []


      }
    default:
      return state;
  }
}

export default adminReducer;

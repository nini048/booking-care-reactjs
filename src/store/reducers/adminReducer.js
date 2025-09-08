
import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  genders: [],
  roles: [],
  positions: []
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

      if (action.codeType === 'gender') {
        return {
          ...state, genders: [], isLoading: false
        };
      }
      if (action.codeType === 'role') {
        return {
          ...state, roles: [], isLoading: false
        };
      }
      if (action.codeType === 'position') {
        return {
          ...state, positions: [], isLoading: false
        };
      }
      return state;
    default:
      return state;
  }
}

export default adminReducer;

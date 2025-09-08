
import actionTypes from '../actions/actionTypes';

const initialState = {
  genders: [],
  roles: [],
  positions: []
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALLCODE_START:
      return {
        ...state,
      }
    case actionTypes.FETCH_ALLCODE_SUCCESS:
      if (action.codeType === 'GENDER') {
        return {
          ...state,
          genders: action.data,
        }

      }
      if (action.codeType === 'ROLE') {
        return {
          ...state,
          roles: action.data,
        }

      }
      if (action.codeType === 'POSITION') {
        return {
          ...state,
          positions: action.data,
        }

      }


      return state
    case actionTypes.FETCH_ALLCODE_FAILED:

      if (action.codeType === 'gender') {
        return { ...state, genders: [] };
      }
      if (action.codeType === 'role') {
        return { ...state, roles: [] };
      }
      if (action.codeType === 'position') {
        return { ...state, positions: [] };
      }
      return state;
    default:
      return state;
  }
}

export default adminReducer;

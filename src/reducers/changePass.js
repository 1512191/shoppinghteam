import * as types from '../actions/constant';

let status = null;

export default (state = status, action) => {
  switch (action.type) {

    case types.LOADING:
      {
        return {
          ...state,
          loading: true
        }
      }
    case types.CHANGE_PASS_SUCCESS: {
      return {
        status: 204,
        loading: false,
      }
    }
    case types.CHANGE_PASS_FAIL: {

      return {
        status: 404,
        loading: false,
      }
    }
    case types.CLEAR_ALL: {
      return {
        status: null,
        loading: false
      }
    }

    default:
       return {
        status: null,
        loading: false
      }
  }
}
import * as types from '../actions/constant';

let display = false;

export default (state = display, action) => {
  switch (action.type) {

    case types.DISPLAY_MODAL:
      return !state;
    case types.CLEAR_MODAL:
      return false;

    default:
      return state
  }
}

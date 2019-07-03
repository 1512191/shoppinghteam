import * as types from '../actions/constant';

let display = false;

export default (state = display, action) => {
  switch (action.type) {
        
  case types.TOOLTIP:
    return true;
    case types.CLOSE_TOOLTIP:
        return false;
  default:
    return state
  }
}

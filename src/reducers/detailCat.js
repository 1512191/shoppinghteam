import * as types from '../actions/constant';

let data ={};

export default (state = data, action) => {
  switch (action.type) {
        
  case types.DETAIL_CATEGORY:
 
    return action.data;
    case types.CLEAR:
 
    return {};
  default:
    return state
  }
}

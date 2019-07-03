import * as types from '../actions/constant';

let data =[];

export default (state = data, action) => {
  switch (action.type) {
        
  case types.GET_CATEGORY:
 
    return action.category;

  default:
    return state
  }
}

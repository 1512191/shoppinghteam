import * as types from '../actions/constant';

let deliveryMethods=[];

export default (state = deliveryMethods, action) => {
  switch (action.type) {
        
  case types.GET_METHOD_DELIVERY:{
      return action.deliveryMethods;
  }
  default:
    return [...state]
  }
}

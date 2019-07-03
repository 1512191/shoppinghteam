import * as types from '../actions/constant';

let initialState ={
  status:null,
  loading:false,
  data:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.LOADING_POST:{
    return{
      ...state,
      loading:true
    }
  }
  case types.CHECK_OUT:
   
    
    return {
      status:action.status,
      loading:false,
      data:action.data
    };

  default:
    return state
  }
}

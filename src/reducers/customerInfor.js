import * as types from '../actions/constant';
let data ={
    infor:{},
    loading:false
}

export default (state =data, action) => {
    switch (action.type) {
        case types.LOADING:{
            return{
                ...state,
                loading:true,
            }
        }
        case types.INFOR_CUSTOMER: {
           
            return {
                infor:action.data,
                loading:false
            }
        }
        case types.CLEAR:{
            return{
                infor:{},
                loading:false
            }
        }
            

        default:
            return state;
    }
}

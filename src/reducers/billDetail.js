import * as types from '../actions/constant';
let product ={
    bill:{},
    loading:false
}

export default (state = product, action) => {
    switch (action.type) {
        case types.LOADING:{
            return{
                ...state,
                loading:true,
            }
        }
        case types.GET_BILL_DETAIL: {
           
            return {
                bill:action.bill,
                loading:false
            }
        }
        case types.CLEAR:{
            return{
                bill:{},
                loading:false
            }
        }
            

        default:
            return state;
    }
}

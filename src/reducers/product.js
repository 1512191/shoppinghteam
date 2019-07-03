import * as types from '../actions/constant';
let product ={
    product:{},
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
        case types.GET_DETAIL: {
           
            return {
                product:action.product,
                loading:false
            }
        }
        case types.CLEAR:{
            return{
                product:{},
                loading:false
            }
        }
            

        default:
            return state;
    }
}

import * as types from '../actions/constant';
let bills ={
    bill:[],
    loading:false,
    page:1,
    perPage:10,
    totalPage:1
}

export default (state = bills, action) => {
    switch (action.type) {
        case types.LOADING:{
            return{
                ...state,
                loading:true,
            }
        }
        case types.GET_BILL: {
           //console.log(action.bills)
            return {
                bill:action.bills,
                page:action.page,
                perPage:action.perPage,
                totalPage:action.totalPage,
                loading:false
            }
                // Object.assign({}, state, {
                //     bill:action.bills,
                //     loading:false
                //  })
                
            
        }
        case types.CLEAR:{
            return  {
                bill:[],
                loading:false
             }
        }
        case types.LOADING_FAIL:{
            return  {
                bill:[],
                loading:false
             }
        }   

        default:
            return state;
    }
}

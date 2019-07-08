import * as types from '../actions/constant';

let initialState = {
    status: null,
    loading: false,
    Customer: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING_UPDATE: {
            return {
                ...state,
                loading: true
            }
        }
        case types.DATA_UPDATE:{
            let inforUser = JSON.parse(localStorage.getItem('user'));
            inforUser.Customer=JSON.stringify(action.data);
            localStorage.setItem('user', JSON.stringify(inforUser));
            return {
                status: 200,
                loading: false,
                Customer: action.data
            };
        }


           
        case types.UPDATE_FAIL:
            return {
                status: 400,
                loading: false,
                Customer: {}
            }
            case types.CLEAR_STATUS:{
                return{
                    status: null,
                    loading: false,
                    Customer: {}
                }
            }
        default:
            return state
    }
}

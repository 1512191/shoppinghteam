import * as types from '../actions/constant';

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
//let login = localStorage.getItem('login')?JSON.parse(localStorage.getItem('login')):false;
export default (state = user, action) => {
    switch (action.type) {
        case types.LOADING: {
            return {
                ...state,
                loading: true,
                //login:false
            }
        }
        case types.LOGIN_SUCCESS:
            {
                //console.log(action.user)
                if (user.length > 0) {
                    //console.log(user)
                    return {
                        user: action.user,
                        status: 200,
                        loading: false,
                        //login:true
                    }
                }else{
                    localStorage.setItem('user', JSON.stringify(action.user));
                    //localStorage.setItem('login', JSON.stringify('true'))
                    return {
                        user: action.user,
                        status: 200,
                        loading: false,
                        //login:true
                    }
                }
               
            }
        case types.LOGIN_FAIL: {
            return {
                user: {},
                status: 404,
                loading: false,
                //login:false
            }
        }
        case types.LOG_OUT: {
            if (localStorage.getItem('user')) {
                localStorage.removeItem('user');
                // if(localStorage.getItem('cart')){
                //     localStorage.removeItem('cart')
                // }
                //localStorage.removeItem('login');
            }
            return {
                user: {},
                loading: false,
                //login:false
            }
        }
        case types.CLEAR_ALL: {
            return {
                status: null,
                loading: false
            }
        }

        default:
            return {
                ...state,
                loading:false,
                //login:false
            }
    }
}
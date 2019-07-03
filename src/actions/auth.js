import * as constant from './constant';
import *as service from '../services/api';
export const login = (phone, pass) => {
    let inforLogin = {
        Phone: phone,
        Password: pass
    }
    return async (dispath) => {

        await dispath(loadingLogin());

        await service.login(phone, pass)
            .then(res => {
                if (res.status === 200) {
                    dispath(infoLogin(res.data));


                } else {
                    dispath(loginFail());
                }
            }).catch(err => {
                dispath(loginFail());
                console.log(err)
            })
    }

}
export const infoLogin = (user) => {
    return {
        type: constant.LOGIN_SUCCESS,
        user: user
    }

}
export const loginFail = () => {
    return {
        type: constant.LOGIN_FAIL
    }
}
export const logOut = () => {
    return {
        type: constant.LOG_OUT
    }
}
export const loadingLogin = () => {
    return {
        type: constant.LOADING
    }
}
export const clearAll = () => {
    return {
        type: constant.CLEAR_ALL
    }
}

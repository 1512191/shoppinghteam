import * as constant from './constant';
import *as service from '../services/api';
export const register = (customer) => {
    return (dispath) => {
        dispath(loadingRegister());
        service.getPhone(customer.Phone).then(res => {
            if (res.data === true) {
                dispath(registered());
            } else {
                service.register(customer).then(res => {
                    if (res.status === 201) {

                        dispath(registerSuccess());


                    } else {
                        dispath(registerFail());
                    }
                }).catch(err => {
                    dispath(registerFail());
                    console.log(err)
                })
            }
        }).catch(err => {
            dispath(registerFail());
            console.log(err)
        })


    }

}
export const loadingRegister = () => {
    return {
        type: constant.LOADING
    }
}
export const registerSuccess = () => {
    return {
        type: constant.REGISTER_SUCCESS
    }
}

export const registerFail = () => {
    return {
        type: constant.REGISTER_FAIL
    }
}
export const registered = () => {
    return {
        type: constant.REGISTERED
    }
}
export const clearAll = () => {
    return {
        type: constant.CLEAR_ALL
    }
}

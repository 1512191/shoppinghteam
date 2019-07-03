import * as constant from './constant';
import *as service from '../services/api';
export const changePass = (account, token) => {
    return (dispath) => {
        dispath(loadingChangePass());

        service.changePassword(account, token).then(res => {
            dispath(changeSuccess())
        }).catch(err => {
            dispath(changeFail());
            console.log(err)
        })


    }

}
export const loadingChangePass = () => {
    return {
        type: constant.LOADING
    }
}
export const changeSuccess = () => {
    return {
        type: constant.CHANGE_PASS_SUCCESS
    }
}

export const changeFail = () => {
    return {
        type: constant.CHANGE_PASS_FAIL
    }
}

export const clearAll = () => {
    return {
        type: constant.CLEAR_ALL
    }
}

import * as constant from './constant';
import *as service from '../services/api';
export const countCart = (item, quantity) => {
    return {
        type: constant.COUNT_PRODUCT,
        item: item,
        quantity: quantity
    }
}
export const deleteCart = (item) => {
    return {
        type: constant.DELETE_CART,
        item: item
    }
}
export const postInfor = (status, data) => {
    return {
        type: constant.CHECK_OUT,
        status: status,
        data: data
    }
}
export const postRequest = (data, token) => {

    return async (dispath) => {

        await dispath(loadingCheckout())
        await service.postCheckout(data, token).then(res => {
            if (res.status === 201) {

                localStorage.removeItem('cart');
                dispath(postInfor(res.status, res.data));

            } else {
                dispath(postInfor(500));
            }

        }).catch(err => {
            console.log(err);
            dispath(postInfor(500))
        })
    }
}
export const loadingCheckout = () => {
    return {
        type: constant.LOADING_POST
    }
}
export const clearAll = () => {
    return {
        type: constant.CLEAR_ALL
    }
}
export const loadingFail = () => {
    return {
        type: constant.LOADING_FAIL
    }
}
export const removeCart = () => {
    return {
        type: constant.CLEAR_ALL_CART
    }
}
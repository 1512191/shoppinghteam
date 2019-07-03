import * as constant from './constant';
import *as service from '../services/api';
export const getBillDetail = (id, token) => {
    return async (dispath) => {
        await dispath(loadingBill());
        await service.getBillDetail(id, token)
            .then(res => {

                if (res.status === 200) {
                    dispath(billData(res.data));


                } else {
                    dispath(loadingFail())
                }
            }).catch(err => {
                dispath(loadingFail())
                console.log(err)
            })
    }

}
export const billData = (bill) => {
    return {
        type: constant.GET_BILL_DETAIL,
        bill: bill
    }

}
export const loadingBill = () => {
    return {
        type: constant.LOADING
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

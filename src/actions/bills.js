import * as constant from './constant';
import *as service from '../services/api';
export const getBills = (idCustomer, token, page = 1, perPage = 10) => {
    return async (dispath) => {

        await dispath(loadingBill());

        await service.getBills(idCustomer, token, page, perPage)
            .then(res => {

                if (res.status === 200) {

                    dispath(billData(res.data.Bills, res.data.Page, res.data.PerPage, res.data.TotalPage));


                } else {
                    dispath(loadingFail())
                }
            }).catch(err => {
                dispath(loadingFail())
                console.log(err)
            })
    }

}
export const billData = (bill, page, perPage, totalPage) => {
    return {
        type: constant.GET_BILL,
        bills: bill,
        page: page,
        perPage: perPage,
        totalPage: totalPage
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

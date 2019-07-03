import * as constant from './constant';
import *as service from '../services/api';
export const getAddress = () => {
    return (dispath) => {
        service.getAddress().then(res => {

            if (res && res.data) {

                dispath(actionAddress(res.data[0].Districts))
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
export const actionClear = () => {
    return {
        type: constant.CLEAR
    }
}
export const actionAddress = (districts) => {
    return {
        type: constant.GET_ADDRESS,
        districts: districts,
        selectedDistrict: districts[0],
        selectedTown: districts[0].Towns[0]
    }
}
export const loadingProduct = () => {
    return {
        type: constant.LOADING
    }
}
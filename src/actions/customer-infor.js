import * as constant from './constant';
import *as service from '../services/api';
export const getCustomer =  (token) => {
    return  async (dispath) => {
        // await dispath(loading())
        await service.getCustomer(token).then(res => {

            if (res && res.data) {

                dispath(inforCustomer(res.data))
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
export const actionClearAll=()=>{
    return {
        type: constant.CLEAR_STATUS
    }
}
export const inforCustomer = (data) => {
    return {
        type: constant.INFOR_CUSTOMER,
        data:data
    }
}
export const loading = () => {
    return {
        type: constant.LOADING_UPDATE
    }
}
export const updateInfor = (token, infor)=>{
    return async (dispath)=>{
        await dispath(loading())
        await service.editInfor(token, infor).then(res => {

            if (res && res.data) {
//console.log(res.data)
                dispath(dataOfUpdate(res.data))
            }
        }).catch(err => {
            dispath(updateFail())
        })
    }
}
export const dataOfUpdate=(data)=>{
    return {
        type:constant.DATA_UPDATE,
        data:data
    }
}
export const updateFail=()=>{
    return{
        type:constant.UPDATE_FAIL
    }
   
}
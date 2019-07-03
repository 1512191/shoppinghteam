import * as constant from './constant';
import *as service from '../services/api';

export const getMethodDelivery = ()=>{
    return (dispatch)=>{
        service.getMethodDelivery().then(res=>{
            if(res && res.data){
                dispatch(MethodDeliveryData(res.data));
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}
export const MethodDeliveryData=(methods)=>{
    return{
        type:constant.GET_METHOD_DELIVERY,
        deliveryMethods:methods
    }
}
export const actionClear = () => {
    return {
        type: constant.CLEAR
    }
}

export const loadingProduct = () => {
    return {
        type: constant.LOADING
    }
}
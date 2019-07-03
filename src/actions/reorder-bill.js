import * as constant from './constant';
import *as service from '../services/api';
export  const  reorderBill=(billID, token)=>{
    return async (dispath) => {
       await dispath(loadingBill());
      
       await service.reorderBill(billID, token)
        .then(res=> {
          
            if(res.status === 200){
            
                dispath(statusReorder(res.data));
                

            }else{
                 dispath(loadingFail())
            }
        }).catch(err=>{
           dispath(loadingFail())
            console.log(err)})
    }
   
}
export const statusReorder=(status)=>{
    return{
        type:constant.REORDER_BILL,
       status:status
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
export const loadingFail=()=>{
    return{
        type:constant.LOADING_FAIL
    }
}

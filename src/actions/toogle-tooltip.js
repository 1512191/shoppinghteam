import * as constant from './constant';
export const toggleTooltip=()=>{
    
    return {type:constant.TOOLTIP};
}
export const closeTooltip=()=>{
    return {
        type:constant.CLOSE_TOOLTIP
    }
}
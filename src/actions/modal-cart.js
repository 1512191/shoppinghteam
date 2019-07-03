import * as constant from './constant';
export const toggleModal = () => {

    return { type: constant.DISPLAY_MODAL };
}
export const clearModal = () => {
    return { type: constant.CLEAR_MODAL }
}
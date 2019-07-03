import *as types from './constant';
import *as service from '../services/api';
export const getProductRequest = (page=1, perPage=10)=>{
    return (dispath)=>{
        dispath(loadingProduct());
        service.getProducts(page, perPage).then(res=>{
            let scroll = false;

            dispath(getProductData(res.data.Products, scroll, page,res.data.TotalPage))
        },err=>{
            console.log(err)
        })
    }
}
export const getProductData = (data, scroll, page, totalPage)=>{
    return {
        type:types.GET_PRODUCT,
        data:data,
        scroll:scroll,
        page:page,
        totalPage:totalPage
    }
}

export const getMoreProduct = (page) => {
    return (dispatch) => {
        dispatch(loadingProduct());
        service.getProducts(page, 10).then(res=>{
            let scroll = false;
            dispatch(getProductData(res.data.Products, scroll, page,res.data.TotalPage))
        }, err=>{
            console.log(err)
        })
    }
}
export const getDetailRequest = (id)=>{
    return (dispath)=>{
        dispath(loadingProduct());
        service.getDetail(id).then(res=>{
            dispath(getDetailData(res.data));
        }, err=>{
            console.log(err)
        })
    }
}
export const getDetailData = (product)=>{
    return{
        type: types.GET_DETAIL,
        product:product
    }
}


export const actionPage = (page) => {
    return {
        type: types.GET_PAGE,
        page: page + 1
    }
}

export const actionScroll = () => {
    return {
        type: types.SCROLL
    }
}
export const actionClear = () => {
    return {
        type: types.CLEAR
    }
}
export const loadingProduct = () => {
    return {
        type: types.LOADING
    }
}

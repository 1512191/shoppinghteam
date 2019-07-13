import * as constant from './constant';
import *as service from '../services/api';
export const getCategoryRequest = (page=1, perPage=10)=>{
    return (dispath)=>{service.getCategory(page, perPage).then(res=>{
        if(res.status == 200 && res.data){
            
            dispath(getCategoryData(res.data));
        }
    }).catch(err =>console.log(err))
}
}
export const getCategoryData=(category)=>{
    return{
        type:constant.GET_CATEGORY,
        category:category
    }
}
export const getProductRequestByCategory=(id, page=1, perPage=10)=>{
    return (dispath)=>{
        dispath(loadingProduct());
        service.getCategoryByID(id,page, perPage).then(res=>{
       
        if(res.status == 200 && res.data){
            let scroll = false;
            dispath(getProductsByCategory(res.data.Products, scroll, page, res.data.TotalPage));
        }
    }).catch(err =>console.log(err))
}
}

export const getProductsByCategory = (data, scroll, page, totalPage)=>{
    return {
        type:constant.GET_PRODUCT,
        data:data,
        scroll:scroll,
        page:page,
        totalPage:totalPage
    }
}

export const getMoreProduct = (id,page) => {
    return (dispatch) => {
        dispatch(loadingProduct());
        service.getCategoryByID(id,page, 10).then(res=>{
            let scroll = false;
            dispatch(getProductsByCategory(res.data.Products, scroll, page,res.data.TotalPage))
        }, err=>{
            console.log(err)
        })
    }
}



export const actionPage = (page) => {
    return {
        type: constant.GET_PAGE,
        page: page + 1
    }
}

export const actionScroll = () => {
    return {
        type: constant.SCROLL
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
export const getDetailCat=(id)=>{
    return (dispath)=>{
       
        service.getDetailCat(id).then(res=>{
       
        if(res.status == 200 && res.data){
            dispath(getDetailCatData(res.data));
        }
    }).catch(err =>console.log(err))
}
}
export const getDetailCatData=(data)=>{
    return {
        type: constant.DETAIL_CATEGORY,
        data:data
    }
}
export const clearDetail= () => {
    return {
        type: constant.CLEAR
    }
}
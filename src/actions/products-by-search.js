import * as constant from './constant';
import *as service from '../services/api';
export const getProductsNameRequest = (name, page = 1, perPage = 10) => {
    return (dispath) => {
        dispath(loadingProduct());
        service.getProductName(name, page, perPage).then(res => {

            if (res.status == 200 && res.data) {
                console.log(res.data)
                let scroll = false;
                dispath(getProductNameData(res.data.Products, scroll, page, res.data.TotalPage));
            }
        }).catch(err => console.log(err))
    }
}


export const getProductNameData = (data, scroll, page, totalPage) => {
    return {
        type: constant.GET_PRODUCT,
        data: data,
        scroll: scroll,
        page: page,
        totalPage: totalPage
    }
}

export const getMoreProduct = (name, page) => {
    return (dispatch) => {
        dispatch(loadingProduct());
        service.getProductName(name, page, 10).then(res => {
            let scroll = false;
            dispatch(getProductNameData(res.data.Products, scroll, page, res.data.TotalPage))
        }, err => {
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
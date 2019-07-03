import * as types from '../actions/constant';

let initialState = {
    data:[],
    scroll:false,
    page:1,
    totalPage:1,
    loading:false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:{
        return{
            ...state,
            loading:true,
        }
    }
  case types.GET_PRODUCT:
    return {
      ...state,
        data:state.data.concat(action.data),
        scroll:action.scroll,
        page:action.page,
        totalPage:action.totalPage,
        loading:false,
    }
    case types.GET_PAGE:
    return {
        ...state,
        page: action.page,
        scroll: true,
    }
case types.CLEAR:
    return {
        data: [],
        page: 1,
        totalPage: 1,
        scroll: false,
        loading:false,
    };
case types.SCROLL:
    return Object.assign({}, state, {
        scroll: false
    })
  default:
    return state
  }
}

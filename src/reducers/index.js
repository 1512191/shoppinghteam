import { combineReducers } from 'redux';
import modalReducer from './modal';
import productsReducer from './products';
import cartReducer from './cart';
import productReducer from './product';
import checkoutReducer from './checkout';
import categoryReducer from './category';
import categoryFilterReducer from './categoryFilter';
import authReducer from './auth';
import registerReducer from './register';
import methodReducer from './methodDelivery';
import addressReducer from './address';
import billReducer from './bill';
import productFilterByNameReducer from './productFilterByName';
import tootipReducer from './toogleTooltip';
import changePassReducer from './changePass';
import billDetailReducer from './billDetail';
import customerReducer from './customerInfor';
import updateReducer from './updateInfor';
import detailCatReducer from './detailCat';

const appReducer = combineReducers({
    modalReducer: modalReducer,
    productsReducer: productsReducer,
    cartReducer: cartReducer,
    productReducer: productReducer,
    checkoutReducer: checkoutReducer,
    categoryReducer: categoryReducer,
    categoryFilter: categoryFilterReducer,
    authReducer: authReducer,
    registerReducer: registerReducer,
    methodReducer: methodReducer,
    addressReducer: addressReducer,
    billReducer: billReducer,
    productByNameReducer: productFilterByNameReducer,
    tooltipReducer: tootipReducer,
    changePassReducer: changePassReducer,
    billDetailReducer: billDetailReducer,
    customerReducer: customerReducer,
    updateReducer:updateReducer,
    detailCatReducer:detailCatReducer



})
export default appReducer;
import * as types from '../actions/constant';
import util from '../Util'
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

export default (state = cart, action) => {
    switch (action.type) {

        case types.COUNT_PRODUCT: {

            let {item, quantity} = action;
           
            let product = {
                ID: item.ID,
                Name: item.Name,
                Price: item.Price,
                Image:item.Image
            }


            let i = util.findIndex(state, product);
            if (i != -1) {


                state[i].Quantity += quantity;


            } else {

                let item1 = {
                    product: product,
                    Quantity: 1
                }
                state.push(item1)
               
            }

            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        }
        case types.DELETE_CART:{
            let {item}=action;
            let product = {
                ID: item.product.ID,
                Name: item.product.Name,
                Price: item.product.Price,
            }
            let i = util.findIndex(state, product);
            if (i != -1) {


                state.splice(i, 1);


            } 

            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
            
        }
            case types.CLEAR_ALL_CART:{
                localStorage.removeItem('cart');
                return [];
            }
        default:
            return [...state];
    }
}

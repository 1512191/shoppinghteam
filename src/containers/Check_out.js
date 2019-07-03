import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { countCart, deleteCart, postRequest } from '../actions/cart';
import CheckoutComponent from '../component/Check_out/Check_out';
class Check_out extends Component {
    render() {
        const { countCart, deleteCart, postRequest } = this.props;
        return (
            <CheckoutComponent
                countCart={countCart}
                deleteCart={deleteCart}
                postRequest={postRequest}
            >

            </CheckoutComponent>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        cart: state.cartReducer,
        message: state.checkoutReducer,

    }
}
const mapDispathtoProps = (dispath) => {
    return {

        countCart: (item, quantity) => dispath(countCart(item, quantity)),
        deleteCart: (item) => dispath(deleteCart(item)),
        postRequest: (data) => dispath(postRequest(data)),



    }
}
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(CheckoutComponent));

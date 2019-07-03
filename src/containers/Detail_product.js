import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDetailRequest, actionClear } from '../actions/products';
import { toggleModal, clearModal } from '../actions/modal-cart';
import { countCart } from '../actions/cart';
import { toggleTooltip, closeTooltip } from '../actions/toogle-tooltip';
import ProductComponent from '../component/Detail_product/Detail_product';
class Detail_product extends Component {
    render() {
        const {
            product,
            cart,
            display,
            getProduct,
            countCart,
            clear,
            toggleModal,
            clearModal,
            toggleTooltip,
            closeTooltip


        } = this.props;
        return (
            <ProductComponent
                product={product}
                cart={cart}
                display={display}
                getProduct={getProduct}
                countCart={countCart}
                clear={clear}
                toggleModal={toggleModal}
                clearModal={clearModal}
                toggleTooltip={toggleTooltip}
                closeTooltip={closeTooltip}
            >

            </ProductComponent>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        product: state.productReducer,
        cart: state.cartReducer,
        display: state.modalReducer,

    }
}
const mapDispathtoProps = (dispath) => {
    return {
        getProduct: (id) => dispath(getDetailRequest(id)),
        countCart: (item, quantity) => dispath(countCart(item, 1)),
        clear: () => dispath(actionClear()),
        toggleModal: () => dispath(toggleModal()),
        clearModal: () => dispath(clearModal()),
        toggleTooltip: () => dispath(toggleTooltip()),
        closeTooltip: () => dispath(closeTooltip())
    }
}
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(ProductComponent));


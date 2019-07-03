import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductComponent from '../component/Product/Product';
import { toggleModal } from '../actions/modal-cart';
import { toggleTooltip, closeTooltip } from '../actions/toogle-tooltip';
import { getProductRequest, getMoreProduct, actionPage, actionClear, actionScroll } from '../actions/products';
import { countCart } from '../actions/cart';
class Product extends Component {
    render() {
        const {
            products,
            display,
            cart,
            getProductRequest,
            getMoreProduct,
            toggleModal,
            countCart,
            updatePage,
            scrollFlag,
            clear,
            toggleTooltip,
            closeTooltip
        } = this.props;
        return (
            <ProductComponent
                products={products}
                display={display}
                cart={cart}
                getProductRequest={getProductRequest}
                getMoreProduct={getMoreProduct}
                toggleModal={toggleModal}
                countCart={countCart}
                updatePage={updatePage}
                scrollFlag={scrollFlag}
                clear={clear}
                toggleTooltip={toggleTooltip}
                closeTooltip={closeTooltip}
            >

            </ProductComponent>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productsReducer,
        display: state.modalReducer,
        cart: state.cartReducer,
    }
}
const mapDispathtoProps = (dispath) => {
    return {
        getProductRequest: () => dispath(getProductRequest()),
        getMoreProduct: (page) => dispath(getMoreProduct(page, 10)),
        toggleModal: () => dispath(toggleModal()),
        countCart: (item, quantity) => dispath(countCart(item, quantity)),
        updatePage: (page) => {
            dispath(actionPage(page))
        },
        scrollFlag: () => {
            dispath(actionScroll())
        },
        clear: () => {
            dispath(actionClear())
        },
        toggleTooltip: () => dispath(toggleTooltip()),
        closeTooltip: () => dispath(closeTooltip())
    }
}
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(ProductComponent));

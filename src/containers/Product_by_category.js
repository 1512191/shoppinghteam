import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { getProductRequestByCategory, getMoreProduct, actionPage, actionClear, actionScroll } from '../actions/category';
import { toggleModal } from '../actions/modal-cart';
import { toggleTooltip, closeTooltip } from '../actions/toogle-tooltip';
import { countCart } from '../actions/cart';
import CategoryFilter from '../component/CategoryFilter/CategoryFilter';
class Category extends Component {

    render() {
        const {
            products,
            display,
            cart,
            getProductRequestByCategory,
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
            <CategoryFilter
                products={products}
                display={display}
                cart={cart}
                getProductRequestByCategory={getProductRequestByCategory}
                getMoreProduct={getMoreProduct}
                toggleModal={toggleModal}
                countCart={countCart}
                updatePage={updatePage}
                scrollFlag={scrollFlag}
                clear={clear}
                toggleTooltip={toggleTooltip}
                closeTooltip={closeTooltip}

            >

            </CategoryFilter>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        products: state.categoryFilter,
        display: state.modalReducer,
        cart: state.cartReducer,
    }
}
const mapDispathtoProps = (dispath) => {
    return {
        getProductRequestByCategory: (id) => dispath(getProductRequestByCategory(id)),
        getMoreProduct: (id, page) => dispath(getMoreProduct(id, page)),
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
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(CategoryFilter));

import React, { Component } from 'react';
import { toggleModal } from '../../actions/modal-cart';
import { connect } from 'react-redux';
import util from '../../Util';
import { countCart, deleteCart } from '../../actions/cart';
import { Link, withRouter, NavLink } from 'react-router-dom';
import './Search.css';
import { Popover, Overlay } from 'react-bootstrap'
import $ from 'jquery';
import { closeTooltip } from '../../actions/toogle-tooltip';





class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            toogle: false,

        }
    }
    onChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let name = this.state.search;
        if(name.trim().length > 0)
        {
            let { history } = this.props;
            history.push(`/Products/${name}`);
        }else{
            return;
        }
       
    }
    handleKeyUp = (e) => {
        e.preventDefault();
        if (e.keyCode === 13 && this.state.search.trim()) {
            let name = this.state.search;
            let { history } = this.props;
            history.push(`/Products/${name}`);
        }else{
            return;
        }
    }
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.onClose();
        }
    }
    onPreventDefault = (e) => {
        e.preventDefault();
    }
    onClick = () => {
        document.getElementById("html").style.overflow = "hidden";
        this.props.toggleModal();

    }
    onClose = () => {
        document.getElementById("html").style.overflow = "auto";
        this.props.toggleModal();
    }
    componentDidMount() {

        document.addEventListener('mousedown', this.handleClickOutside);
    }


    componentWillMount() {
        document.removeEventListener('mousedown', this.handleClickOutside);

    }
    removeProduct = (item) => {
        this.props.deleteCart(item)
    }
    updatePrice = (price, quantity) => {
        return price * quantity;
    }
    toTalPrice = (item) => {
        let total = 0;
        item.forEach(element => {

            total += element.product.Price * element.Quantity;
        });
        return total;
    }
    checkOut = () => {
        this.props.history.push("/Checkout");
        this.onClose();
    }



    render() {

        let products = this.props.cart;

        let countCart = this.props.cart ? util.countQuantity(this.props.cart) : 0;

        let rowItem = products.length > 0 ? products.map((item, i) => {

            return (

                <ul key={i} className='row item1'>
                    <li className='col-5'>
                        <Link to={`/Detail/${item.product.ID}`} style={{ color: '#007bff' }}>
                            {item.product.Name}
                        </Link>
                    </li>
                    <li className='col-2'>
                        <input className='quantity' type='number' readOnly min="1" value={item.Quantity}></input>
                    </li>
                    <li className='col-2' >
                        <span onClick={() => this.removeProduct(item)} style={{ color: 'red', cursor: 'pointer' }} className="fa fa-times"></span>
                    </li>
                    <li className='col-3'>
                        {util.showVNDCurrency(this.updatePrice(item.Quantity, item.product.Price))}
                    </li>
                    <hr></hr>
                </ul>




            )
        }) : <ul className="text-center">No product in cart</ul>


        return (
            <div style={{ background: '#fdd600' }}>
                <div className="header-bot">
                    <div className="container">
                        <div className="row header-bot_inner_wthreeinfo_header_mid">

                            <div className="col-md-3 logo_agile">
                                <h1 className="text-center">
                                    <NavLink to="/" className="font-weight-bold font-italic">
                                        <img src="../images/logo2.png" alt=" " className="img-fluid" />HTEAM
						</NavLink>
                                </h1>
                            </div>

                            <div className="col-md-9 header mt-4 mb-md-0 mb-4">
                                <div className="row">

                                    <div className="col-10 agileits_search">

                                        <form className="form-inline" onSubmit={(event) => this.handleSubmit(event)}>
                                            <input style={{ fontSize: '16px', height: '38px' }} className="form-control mr-sm-2" type="search" placeholder="Tên sản phẩm" aria-label="Search" onKeyUp={(e) => this.handleKeyUp(e)} onChange={(e) => this.onChange(e)} name="search" />
                                            <button style={{ borderRadius: '10px' }} className="btn my-2 my-sm-0" type="submit" onSubmit={(e) => this.handleSubmit(e)}><i className="fas fa-search"></i></button>
                                        </form>
                                    </div>

                                    <div className="col-2 top_nav_right text-center mt-sm-0 mt-2" >
                                        <div className=" tooltip wthreecartaits wthreecartaits2 cart cart box_1" >

                                            <form className=" last" onClick={(event) => this.onPreventDefault(event)}>
                                                <div className="tooltiptext alert alert-info" style={{ visibility: this.props.toogleTootip === true ? 'visible' : 'hidden' }}>

                                                    <span className="rounded-circle" style={{ borderRadius: "50%", backgroundColor: "#dff0d8", borderColor: '#d6e9c6', color: '#3c763d', marginRight: '15px' }}><i className="fa fa-check" aria-hidden="true"></i></span><strong style={{ paddingTop: '15px', marginTop: '15px', fontSize: '16px' }} className="alert-heading">Thêm thành công!</strong>

                                                </div>
                                                <input type="hidden" name="cmd" value="0" />
                                                <input type="hidden" name="display" value="1" />
                                                <button className="  btn w3view-cart" type="submit" onSubmit={(event) => this.onPreventDefault(event)} name="submit" value="0" onClick={() => this.onClick()}>
                                                    <span style={{ color: 'white', fontSize: '12px' }} >{countCart}</span><i className="fas fa-cart-arrow-down"></i>

                                                </button>

                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <ModalCheckout displayParent={display}></ModalCheckout> */}
                    <div style={{ display: this.props.display ? 'block' : 'none' }} className="modal" id="checkout">
                        <div className="modal-dialog" role="document">
                            <div ref={this.props.display ? this.setWrapperRef : ""} className="modal-content">
                                <div className="modal-header">

                                    <button type="button" id="close" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.onClose()}>
                                        <span className="aria-hidden" aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className='item'>

                                        {rowItem}



                                    </div>

                                </div>
                                {
                                    products.length > 0 ? (
                                        <div className="  modal-footer">
                                            <div className='col-8 total'>
                                                Tổng: <span>{util.showVNDCurrency(this.toTalPrice(products))}</span>
                                            </div>
                                            <div className='col-4 checkout-right-basket'>
                                                <button type="button" className="submit check_out btn" onClick={() => this.checkOut()} data-dismiss="modal">Đặt hàng</button>
                                            </div>

                                        </div>
                                    ) : <div></div>
                                }



                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = (state) => {

    return {
        display: state.modalReducer,
        cart: state.cartReducer,
        toogleTootip: state.tooltipReducer

    }
}
const mapDispathtoProps = (dispath) => {
    return {
        toggleModal: () => dispath(toggleModal()),
        countCart: (item, quantity) => dispath(countCart(item, quantity)),
        deleteCart: (item) => dispath(deleteCart(item)),
        closeTooltip: () => dispath(closeTooltip())

    }
}
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(Search));
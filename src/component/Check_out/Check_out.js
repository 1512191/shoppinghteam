import React, { Component } from 'react';
import './Checkout.css';
import util from '../../Util';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';


class Check_out extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ''
        }
    }
    onPreventDefault = (e) => {
        e.preventDefault();
    }
    updatePrice = (price, quantity) => {
        return price * quantity;
    }
    removeProduct = (item) => {
        this.props.deleteCart(item)
    }
    toTalPrice = (item) => {
        let total = 0;
        item.forEach(element => {

            total += element.product.Price * element.Quantity;
        });
        return total;
    }
    onClickAdd = (item, quantity) => {
        if (item.Quantity <= 1 && quantity < 1) {
            quantity = 0;
        }
        let product = {
            ID: item.product.ID,
            Name: item.product.Name,
            Price: item.product.Price,
            Image: item.product.Image
        }
        this.props.countCart(product, quantity);

    }
    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    postCheckout = (products) => {
        let method = this.state.method
        if (method !== null) {
            let countCart = this.props.cart ? util.countQuantity(this.props.cart) : 0;
            let totalPrice = this.toTalPrice(products);
            let billDetails = [];

            products.map((item, i) => {
                billDetails.push({ productID: item.product.ID, quantity: item.Quantity, price: item.product.Price })
            })

            let infor = {
                totalPrice: totalPrice,
                totalQuantity: countCart,
                shipAddress: this.state.address,
                billDetails: billDetails,
                deliveryMethodID: this.state.method,
                customer: {
                    name: this.state.name,
                    address: this.state.address,
                    email: this.state.email,
                    phone: this.state.number
                }

            }

            this.props.postRequest(infor);
        } else {
            return;
        }

    }
    onLogin = () => {
        let user = localStorage.getItem('user');
        let countCart = localStorage.getItem('cart') ? util.countQuantity(JSON.parse(localStorage.getItem('cart'))) : 0;
        let { history } = this.props;
        if (countCart > 0) {
            if (!user) {

                history.push('/Login');
            }
            else {
                history.push('/Address');
            }
        } else {
            this.setState({
                errorMessage: 'Giỏ hàng chưa có sản phẩm!'
            })
            return;
        }

    }
    render() {
        let products = this.props.cart;
        let countCart = this.props.cart ? util.countQuantity(this.props.cart) : 0;
        let alert = this.props.message ? <div className={this.props.message.className}>{this.props.message.message}</div> : <div style={{ display: 'none' }}></div>
        let alertWarning = <div></div>
        if (this.state.errorMessage) {
            alertWarning = <div className="alert alert-danger" style={{textTransform: 'uppercase', fontFamily: '"Times New Roman", Times, serif',fontSize: '20px'}}>{this.state.errorMessage}</div>
        }
        let rowItem = products.length > 0 ? products.map((item, i) => {
            return (
                <tr key={i}  >
                    <td className="invert" style={{ paddingBottom: '20px', paddingTop: '20px' }}>{i + 1}</td>
                    <td className="invert-image">
                        <Link to={`/Detail/${item.product.ID}`}>
                            <img src={item.product.Image} alt={item.product.Name} className="img-responsive" />
                        </Link>
                    </td>
                    <td  className="invert" style={{ paddingBottom: '20px', paddingTop: '20px', width:'150px' }}>
                  
                        <div className="quantity">
                            <div className="quantity-select">
                                <div className='entry value-minus disabled' isactive="false" onClick={() => this.onClickAdd(item, -1)}>&nbsp;</div>
                                <div className="entry value">
                                    <span style={{ color: 'black' }}>{item.Quantity}</span>
                                </div>
                                <div className="entry value-plus" title={item.Quantity >= 5 ? "Tối đa chỉ chọn 5 sản phẩm" : "Thêm sản phẩm vào giỏ hàng"}>
                                    <div className={item.Quantity >= 5 ? "entry value-plus disabledbutton" : "entry value-plus"} onClick={() => this.onClickAdd(item, 1)} >&nbsp;</div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="invert" style={{ paddingBottom: '20px', paddingTop: '20px' }}>{item.product.Name}</td>
                    <td className="invert" style={{ paddingBottom: '20px', paddingTop: '20px' }} >{util.showVNDCurrency(item.product.Price)}</td>
                    <td className="invert" style={{ paddingBottom: '20px', paddingTop: '20px' }}>
                        <div className="rem">
                            <div className="fas fa-times" style={{ color: '#b71c1c', fontSize: '20px', cursor: 'pointer' }} onClick={() => this.removeProduct(item)}>  </div>
                        </div>
                    </td>
                </tr>
            )
        }) : <tr ></tr>
        return (
            <div className="privacy py-sm-5 py-4" style={{ background: 'rgb(238, 232, 205)' }}>
                <div className="container py-xl-4 py-lg-2">
                {alertWarning}
                    <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">
                        <span style={{ textTransform: 'uppercase', fontFamily: '"Times New Roman", Times, serif' }}>Giỏ hàng</span>
                    </h3>
                   
                    <div className="checkout-right">

                        <Table responsive="sm" style={{ fontSize: '16px', backgroundColor: "#607d8b", color: 'white' }} >
                            <thead style={{ background: 'rgb(4, 53, 76)' }}>
                                <tr>
                                    <th>STT</th>

                                    <th>Sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th >Tên sản phẩm</th>

                                    <th>Giá</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody hover='true'>
                                {rowItem}

                            </tbody>
                            <tfoot className='total' style={{ background: 'rgb(4, 53, 76)' }} >
                                <tr>
                                    <td style={{ color: '#b71c1c' }} colSpan={4}>
                                        Tổng tiền
                                    </td>
                                    <td style={{ color: '#b71c1c' }} colSpan={2}>{util.showVNDCurrency(this.toTalPrice(products))}</td>
                                </tr>
                            </tfoot>
                        </Table>

                    </div>
                    <br></br>
                    <h4 className="mb-sm-4 mb-3" style={{ color: 'black', textAlign: 'left', fontWeight: 'bolder', fontSize: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif' }}>Giỏ hàng có
                        <span ><span style={{ fontWeight: 'bolder' }}> {countCart}</span> sản phẩm</span>
                    </h4>
                    <div className="checkout-right-basket text-center" style={{ textAlign: "center", alignItems: "center" }}>
                        <button className="submit check_out btn" id="check_out" onClick={() => this.onLogin()} style={{ width: "200px" }}>Mua</button>
                    </div>

                    {alert}
                </div>
            </div>

        );
    }
}

export default Check_out;
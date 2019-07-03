import React, { Component } from 'react';
import './InforCustomer.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { countCart, deleteCart, postRequest } from '../../actions/cart';
import util from '../../Util';
import { login } from '../../actions/auth';
import load from '../../images/Double Ring-2.2s-100px.gif';
class InforCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: {
                value: '',
                isInputValid: true,
                className: 'form-control',
                errorMessage: ''
            },
            Password: {
                value: '',
                isInputValid: true,
                className: 'form-control',
                errorMessage: ''
            }
        }

    }
    onClick = () => {
        let { history } = this.props;
        history.push('/Checkout');
    }

    toTalPrice = (item) => {
        let total = 0;
        item.forEach(element => {

            total += element.product.Price * element.Quantity;
        });
        return total;
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const newState = { ...this.state[name] };
        newState.value = value;
        this.setState({ [name]: newState });
    }
    onChangeValidation = (event) => {
        const { name } = event.target;
        let { isInputValid, errorMessage, className } = this.validateInput(name, this.state[name].value);
        let newState = { ...this.state[name] };
        newState.isInputValid = isInputValid;
        newState.errorMessage = errorMessage;
        newState.className = className;
        this.setState({ [name]: newState })
    }
    onPreventDefault = (e) => {
        e.preventDefault();
    }
    onLogin = async () => {
        const phoneNumber = this.state.Username.value.trim();
        const password = this.state.Password.value.trim();
        const { Username, Password } = this.state;
        const { history } = this.props;
        let newState = { ...this.state };
        Object.keys(this.state).map((element, index) => {
            if (this.state[element].value.length === 0) {
                let newState = { ...this.state[element] };
                if (element === 'Username') {
                    newState.errorMessage = 'Số điện thoại không được trống';
                }
                if (element === 'Password') {
                    newState.errorMessage = 'Mật khẩu không được trống';
                }

                newState.isInputValid = false;
                newState.className = 'form-control is-invalid';
                this.setState({ [element]: newState })
            }
        })
        if (Username.isInputValid === true && Password.isInputValid === true && phoneNumber && password) {

            await this.props.login(phoneNumber, password);

            let status = await this.props.infoLogin.status;

            if (status === 200) {

                history.push('/Address');
            } else {
                return;
            }


        } else {
            return;
        }
    }
    validateInput = (type, checkingText) => {

        if (type === 'Username') {
            if (checkingText === '') {
                return {
                    isInputValid: false,
                    errorMessage: 'Số điện thoại không được trống',
                    className: 'form-control is-invalid'
                };

            } else {
                const regexp = /^\d{10}$/;
                const checkingResult = regexp.exec(checkingText);
                if (checkingResult !== null) {
                    return {
                        isInputValid: true,
                        errorMessage: '',
                        className: 'form-control is-valid'
                    };
                }
                else {
                    return {
                        isInputValid: false,
                        errorMessage: 'Số điện thoại không hợp lệ',
                        className: 'form-control is-invalid'
                    };
                }
            }

        }
        if (type === 'Password') {
            if (checkingText === '') {
                return {
                    isInputValid: false,
                    errorMessage: 'Mật khẩu không được trống',
                    className: 'form-control is-invalid'
                };

            } else {
                const regexp = /^[a-zA-Z0-9]{6,20}/;
                const lengthPass = checkingText.length;
                if (lengthPass < 6) {
                    return {
                        isInputValid: false,
                        errorMessage: 'Mật khẩu có ít nhất 6 kí tự',
                        className: 'form-control is-invalid'
                    }
                } else if (lengthPass > 20) {
                    return {
                        isInputValid: false,
                        errorMessage: 'Mật khẩu có tối đa 20 kí tự',
                        className: 'form-control is-invalid'
                    }
                } else {
                    const checkingResult = regexp.exec(checkingText);
                    if (checkingResult !== null) {
                        return {
                            isInputValid: true,
                            errorMessage: '',
                            className: 'form-control is-valid'
                        };
                    }
                    else {
                        return {
                            isInputValid: false,
                            errorMessage: 'Mật khẩu không hợp lệ',
                            className: 'form-control is-invalid'
                        };
                    }
                }

            }
        }
    }
    render() {
        let products = this.props.cart;
        let countCart = this.props.cart ? util.countQuantity(this.props.cart) : 0;
        let infoLogin = this.props.infoLogin;

        let alert = infoLogin && infoLogin.status === 404 ? <div className="alert alert-danger">Thông tin đăng nhập không đúng</div> : <div></div>
        let data = '';
        if (infoLogin && infoLogin.loading === true) {
            data = <img style={{ position: 'absolute', height: '150px', width: '150px', margin: 'auto', left: '0px', right: '0px', top: '0px', bottom: '0px' }} src={load} alt='loading' />
        }
        return (
            <div className="ads-grid py-sm-5 py-4" style={{
                background: '#EEE8CD',
                backgroundSize: "100% 100%"
              }}>
                <div className="container py-xl-4 py-lg-2">
                    <div className="row">
                        <div className="col-sm-5" style={{ textAlign: 'left',background: 'white' }}>
                            <br></br>
                            {alert}
                            {data}
                            <form method='post' onSubmit={(e) => this.onPreventDefault(e)} style={{ opacity: infoLogin && infoLogin.loading ? 0.5 : 1, position: 'relative' }}>


                                <div className="col-sm-12">
                                    <label style={{ marginBottom: '10px' }} htmlFor="validationCustomUsername">Số điện thoại</label>
                                    <div className="input-group" style={{ marginBottom: '25px' }}>
                                        <div className="input-group-prepend">
                                            <span style={{ fontSize: '20px', background: 'white' }} className="input-group-text"><i className="fas fa-phone-square"></i></span>
                                        </div>
                                        <input style={{ fontSize: '14px', borderRadius: '0px' }} type="text" onBlur={(e) => this.onChangeValidation(e)} className={this.state.Username.className} placeholder="Số điện thoại " name="Username" required onChange={(event) => this.onChange(event)} />
                                        <div className="invalid-feedback" style={{ color: '#ee2347', fontSize: '12px' }}>
                                            {this.state.Username.errorMessage}
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="col-sm-12" >
                                    <label style={{ marginBottom: '10px' }} htmlFor="validationCustomUsername">Mật khẩu</label>
                                    <div className="input-group" >
                                        <div className="input-group-prepend">
                                            <span style={{ fontSize: '20px', background: 'white' }} className="input-group-text" ><i className="fas fa-lock"></i></span>
                                        </div>
                                        <input type="password" onBlur={(e) => this.onChangeValidation(e)} style={{ fontSize: '14px' }} min="6" max="20" className={this.state.Password.className} placeholder="Mật khẩu " name="Password" required onChange={(event) => this.onChange(event)} />
                                        <div className="invalid-feedback" style={{ color: '#ee2347', fontSize: '12px' }}>
                                            {this.state.Password.errorMessage}
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="right-w3l" style={{ textAlign: "center", alignItems: "center" }}>
                                    <button className="submit check_out btn" style={{ marginTop: '25px' }} onClick={() => this.onLogin()}>Đăng nhập</button>
                                </div>

                                <p className="text-center dont-do mt-3">Bạn chưa có tài khoản?
							<Link to='/Register' >
                                        Đăng kí</Link>
                                </p>
                            </form>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-5 cart-right" style={{ textAlign: 'left',background: 'white'
                     }} >
                            <div className="col-form-label">
                                <span>Đơn hàng ({countCart} sản phẩm)</span><span style={{ float: "right" }}><button onClick={() => this.onClick()} style={{ borderRadius: "10px" }}>Cập nhật</button></span>
                            </div>
                            <hr ></hr>
                            {products && products.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <div className="col-form-label" style={{ fontSize: "12px" }}>
                                            <span style={{ fontWeight: "bold" }}>{item.Quantity} </span>x <span ><Link style={{ color: "#007ff0" }} to={`/Detail/${item.product.ID}`}>{item.product.Name}</Link></span><span style={{ float: "right" }}>{util.showVNDCurrency(item.product.Price)}</span>
                                        </div>
                                        <hr></hr>
                                    </div>
                                )
                            })}
                            <div className="col-form-label">
                                <span>Thành tiền</span> <span style={{ float: "right", color: "#ee2347" }}>{util.showVNDCurrency(this.toTalPrice(products))}</span>
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
        infoLogin: state.authReducer,
        cart: state.cartReducer,
        message: state.checkoutReducer,

    }
}
const mapDispathtoProps = (dispath) => {
    return {

        countCart: (item, quantity) => dispath(countCart(item, quantity)),
        deleteCart: (item) => dispath(deleteCart(item)),
        postRequest: (data) => dispath(postRequest(data)),
        login: (phone, pass) => dispath(login(phone, pass))


    }
}
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(InforCustomer));

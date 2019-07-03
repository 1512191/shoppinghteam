import React, { Component } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, clearAll } from '../../actions/register';
import load from '../../images/Double Ring-2.2s-100px.gif';
import './Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Phone: {
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
            },
            Email: {
                value: '',
                isInputValid: true,
                className: 'form-control',
                errorMessage: ''
            },
            Name: {
                value: '',
                isInputValid: true,
                className: 'form-control',
                errorMessage: ''
            },
            Sex: {
                value: 0,
                isInputValid: true,
                className: 'form-control',
                errorMessage: ''
            },
            ConfirmPassword: {
                value: '',
                isInputValid: true,
                className: 'form-control',
                errorMessage: ''
            },

        }


    }
    componentDidMount() {

    }
    onChange = (event) => {
        const { name, value } = event.target;
        const newState = { ...this.state[name] };
        newState.value = value;
        this.setState({ [name]: newState });
    }
    onChangeValidation = (event) => {
        const { name } = event.target;
        // console.log(this.state[name].isInputValid);
        // console.log(this.validateInput(name, this.state[name].value));
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
    checkValidate = () => {

    }
    onRegister = () => {
        const phoneNumber = this.state.Phone.value.trim();
        const password = this.state.Password.value.trim();
        const email = this.state.Email.value.toLowerCase().trim();
        const name = this.state.Name.value.trim();
        const sex = this.state.Sex.value;
        let sexPost = null;
        if (sex == 1) {
            sexPost = true;
        } else {
            sexPost = false;
        }
        const confirmPassword = this.state.ConfirmPassword.value.trim();
        const { Phone, Password, Email, Name } = this.state;
        let newState = { ...this.state };
        Object.keys(this.state).map((element, index) => {
            if (this.state[element].value.length === 0) {
                let newState = { ...this.state[element] };
                if (element === 'Phone') {
                    newState.errorMessage = 'Số điện thoại không được trống';
                }
                if (element === 'Password') {
                    newState.errorMessage = 'Mật khẩu không được trống';
                }
                if (element === 'Email') {
                    newState.errorMessage = 'Email không được trống';
                }
                if (element === 'Name') {
                    newState.errorMessage = 'Tên không được trống';
                }
                if (element === 'ConfirmPassword') {
                    newState.errorMessage = 'Mật khẩu xác nhận không được trống';
                }
                newState.isInputValid = false;
                newState.className = 'form-control is-invalid';
                this.setState({ [element]: newState })
            }
        })

        if (Phone.isInputValid === true && Password.isInputValid === true && Name.isInputValid === true && Email.isInputValid === true) {
            //console.log('haha')
            if (phoneNumber && password && email && name && password === confirmPassword) {
                const customer = {
                    Name: name,
                    Email: email,
                    Phone: phoneNumber,
                    Password: password,
                    Sex: sexPost
                }
                this.props.register(customer);
            } else return;

        } else {
            return;
        }
    }
    validateInput = (type, checkingText) => {
        /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */
        if (type === 'Phone') {
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
                            errorMessage: 'Mật khẩu có ít nhất 6 kí tự và tối đa 20 kí tự',
                            className: 'form-control is-invalid'
                        };
                    }
                }

            }
        }
        if (type === 'ConfirmPassword') {
            if (checkingText === '') {
                return {
                    isInputValid: false,
                    errorMessage: 'Mật khẩu xác nhập không được trống',
                    className: 'form-control is-invalid'
                }
            }
            else if (checkingText !== this.state.Password.value) {
                return {
                    isInputValid: false,
                    errorMessage: 'Mật khẩu xác nhận trùng khớp',
                    className: 'form-control is-invalid'
                }
            } else {
                return {
                    isInputValid: true,
                    errorMessage: '',
                    className: 'form-control is-valid'
                }
            }
        }
        if (type === 'Name') {
            if (checkingText === '') {
                return {
                    isInputValid: false,
                    errorMessage: 'Tên không được trống',
                    className: 'form-control is-invalid'
                }

            } else {
                const regexp = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ \\s]+$/;
                const lengthName = checkingText.length;
                if (lengthName < 1) {
                    return {
                        isInputValid: false,
                        errorMessage: 'Tên phải có ít nhất một kí tự',
                        className: 'form-control is-invalid'
                    }
                } else if (lengthName > 50) {
                    return {
                        isInputValid: false,
                        errorMessage: 'Tên có nhiều nhất 50 kí tự',
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
                            errorMessage: 'Tên không được chứa số hoặc kí tự đặc biệt',
                            className: 'form-control is-invalid'
                        };
                    }
                }


            }
        }
        if (type === 'Email') {
            if (checkingText === '') {
                return {
                    isInputValid: false,
                    errorMessage: 'Email không được trống',
                    className: 'form-control is-invalid'
                }

            } else {
                const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                const checkingResult = regexp.exec(checkingText.toLowerCase());
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
                        errorMessage: 'Email không hợp lệ',
                        className: 'form-control is-invalid'
                    };
                }
            }
        }
    }

    onLogin = () => {
        const { history } = this.props;
        history.push('/SignIn');
    }
    componentWillUnmount() {
        this.props.clearAll();
    }
    render() {
        let stateRegister = this.props.stateRegister;


        let data = '';
        if (stateRegister && stateRegister.loading === true) {
            data = <img style={{ position: 'absolute', height: '150px', width: '150px', margin: 'auto', left: '0px', right: '0px', top: '0px', bottom: '0px' }} src={load} alt='loading' />
        }
        let alert = '';
        if (stateRegister && stateRegister.status === 201) {
            alert = <div className=" alert alert-success">Đăng kí thành công!</div>
        } else if (stateRegister && stateRegister.status === 404) {
            alert = <div className="alert alert-danger">Đăng kí không thành công!</div>

        } else if (stateRegister && stateRegister.status === 500) {
            alert = <div className="alert alert-danger">Số điện thoại đã tồn tại. Vui lòng nhập lại! </div>
        }
        else {
            alert = <div></div>
        }
        return (

            <div className="privacy py-sm-5 py-4" role="dialog" aria-hidden="true">
                <div className="container py-xl-4 py-lg-2">
                    <div className="row" role="document">
                        <div className="modal-content" style={{ display: 'block', width: '50%', margin: 'auto' }} >
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ margin: '0 auto' }}>Đăng kí</h5>


                            </div>
                            {data}
                            <div className="modal-body">
                                {/* {alert} */}
                                <form method='post' onSubmit={(e) => this.onPreventDefault(e)} style={{ opacity: stateRegister && stateRegister.loading ? 0.5 : 1, position: 'relative' }}>
                                    {alert}
                                    <div className="form-group">

                                        <input type="text" style={{ borderRadius: '3px', fontSize: '14px' }} onBlur={(e) => this.onChangeValidation(e)} className={this.state.Name.className} placeholder="Họ và tên" name="Name" required onChange={(event) => this.onChange(event)} />
                                        <span style={{ color: '#ee2347', fontSize: '12px', float: 'left' }}>{this.state.Name.errorMessage}</span>
                                    </div>
                                    <div className="form-group">

                                        <input type="email" style={{ borderRadius: '3px', fontSize: '14px' }} onBlur={(e) => this.onChangeValidation(e)} className={this.state.Email.className} placeholder="Email " name="Email" required onChange={(event) => this.onChange(event)} />
                                        <span style={{ color: '#ee2347', fontSize: '12px', float: 'left' }}>{this.state.Email.errorMessage}</span>
                                    </div>
                                    <div className="form-group">

                                        <input type="text" style={{ borderRadius: '3px', fontSize: '14px' }} onBlur={(e) => this.onChangeValidation(e)} className={this.state.Phone.className} placeholder="Số điện thoại" name="Phone" required onChange={(event) => this.onChange(event)} />
                                        <span style={{ color: '#ee2347', fontSize: '12px', float: 'left' }}>{this.state.Phone.errorMessage}</span>
                                    </div>
                                    <div className="form-group">

                                        <input type="password" style={{ borderRadius: '3px', fontSize: '14px' }} onBlur={(e) => this.onChangeValidation(e)} min="6" max="20" className={this.state.Password.className} placeholder="Mật khẩu" name="Password" required onChange={(event) => this.onChange(event)} />
                                        <span style={{ color: '#ee2347', fontSize: '12px', float: 'left' }}>{this.state.Password.errorMessage}</span>
                                    </div>
                                    <div className="form-group">

                                        <input type="password" style={{ borderRadius: '3px', fontSize: '14px' }} onBlur={(e) => this.onChangeValidation(e)} min="6" max="20" className={this.state.ConfirmPassword.className} placeholder="Nhập lại mật khẩu" name="ConfirmPassword" required onChange={(event) => this.onChange(event)} />
                                        <span style={{ color: '#ee2347', fontSize: '12px', float: 'left' }}>{this.state.ConfirmPassword.errorMessage}</span>
                                    </div>
                                    <div className="form-group" style={{ borderRadius: '3px', fontSize: '14px' }}>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <input type="radio" style={{ width: '50px' }} name="Sex" value='0' checked onChange={(event) => this.onChange(event)} />Nữ
                        
                        </div>
                                            <div className="col-sm-6">
                                                <input type="radio" style={{ width: '50px' }} name="Sex" value='1' onChange={(event) => this.onChange(event)} />Nam
                        
                        </div>
                                            {/* <div className="col-sm-6">
                        </div> */}
                                        </div>
                                    </div>
                                    <div className="right-w3l" style={{ textAlign: "center", alignItems: "center" }}>
                                        {/* <input type="submit" onClick={this.onLogin()}className="form-control" value="Log in" /> */}
                                        <button className="submit check_out btn" onClick={() => this.onRegister()}>Đăng kí</button>
                                    </div>

                                    <p className="text-center dont-do mt-3">Bạn có tài khoản?
                    <Link to="/SignIn" >Đăng nhập
                        </Link>
                                    </p>
                                </form>
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
        stateRegister: state.registerReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (customer) => dispatch(register(customer)),
        clearAll: () => dispatch(clearAll())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
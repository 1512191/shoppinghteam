import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import load from '../../images/Double Ring-2.2s-100px.gif';
class SignIn extends Component {
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
    onLogin = async () => {
        const phoneNumber = this.state.Username.value.trim();
        const password = this.state.Password.value.trim();
        const { Username, Password } = this.state;
        const {history} = this.props;
        let newState = {...this.state};
        Object.keys(this.state).map((element, index)=>{
            if(this.state[element].value.length === 0){
                let newState = {...this.state[element]};
                if(element === 'Username'){
                    newState.errorMessage=  'Số điện thoại không được trống';
                }
                if(element === 'Password'){
                    newState.errorMessage=  'Mật khẩu không được trống';
                }
                newState.isInputValid=false;
                newState.className = 'form-control is-invalid';
                this.setState({[element]:newState})
            }
        })
        if (Username.isInputValid === true && Password.isInputValid === true && phoneNumber && password) {
           await this.props.login(phoneNumber, password);
            let status = await this.props.infoLogin.status;
            if(status === 200){
               
                 history.push('/');
            }else{
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
        let infoLogin = this.props.infoLogin;
      
        let alert = infoLogin && infoLogin.status === 404 ? <div className="alert alert-danger">Infomation login not correct</div> : <div></div>
        let data='';
        if(infoLogin && infoLogin.loading === true){
            data=<img  style={{position:'absolute',height:'150px', width:'150px', margin:'auto', left:'0px', right:'0px', top:'0px', bottom:'0px'}} src={load} alt='loading'/>
        }
       
       
        return (
            <div className="privacy py-sm-5 py-4"  role="dialog" aria-hidden="true">
            <div className="container py-xl-4 py-lg-2">
            <div className="row" role="document">
                    <div className="modal-content" style={{ display: 'block', width:'50%', margin:'auto' }}>
                        <div className="modal-header" >
                            <h5 className="modal-title" style={{margin:'0 auto'}}>Đăng nhập</h5>
                        </div>
                        {data}
                        <div className="modal-body">
                            {alert}
                            <form method='post' onSubmit={(e) => this.onPreventDefault(e)}style={{ opacity: infoLogin && infoLogin.loading ? 0.5 : 1, position:'relative' }}>
                                <div className="form-group" style={{ marginTop:'15px'}}>
                                   
                                    <input style={{borderRadius:'3px', fontSize: '14px'}}type="text" onBlur={(e) => this.onChangeValidation(e)} className={this.state.Username.className} placeholder="Số điện thoại" name="Username" required onChange={(event) => this.onChange(event)} />
                                    <span style={{ color: '#ee2347', fontSize: '12px', float:'left' }}>{this.state.Username.errorMessage}</span>
                                </div>
                                <div className="row" style={{marginBottom:'15px', marginTop:'15px'}}>

                                </div>
                                <div className="form-group">
                                    
                                    <input style={{borderRadius:'3px', fontSize: '14px'}} type="password" onBlur={(e) => this.onChangeValidation(e)} min="6" max="20" className={this.state.Password.className} placeholder="Mật khẩu" name="Password" required onChange={(event) => this.onChange(event)} />
                                    <span style={{ color: '#ee2347', fontSize: '12px', float:'left' }}>{this.state.Password.errorMessage}</span>
                                </div>
                                <div className="right-w3l" style={{ textAlign: "center", alignItems: "center" }}>
                                    <button className="submit check_out btn" onClick={() => this.onLogin()}>Đăng nhập</button>
                                </div>

                                <p className="text-center dont-do mt-3">Bạn chưa có tài khoản?
                                    <Link to="/Register" >
                                       Đăng kí</Link>
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
        infoLogin: state.authReducer,


    }
}
const mapDispathtoProps = (dispath) => {
    return {


        login: (phone, pass) => dispath(login(phone, pass))


    }
}
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(SignIn));
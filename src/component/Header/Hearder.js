import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logOut } from '../../actions/auth';
import '../InforCustomer/Address.css';
import { changePass, clearAll } from '../../actions/change-pass';
import load from '../../images/Double Ring-2.2s-100px.gif';
class Hearder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Password: {
				value: '',
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
			toggle: false,
			alertLogout: false
		}

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
	onChangeModal = (event) => {
		const { name, value } = event.target;
		const newState = { ...this.state[name] };
		newState.value = value;
		this.setState({ [name]: newState });
	}
	onChangePass = () => {

		const password = this.state.Password.value.trim();

		const confirmPassword = this.state.ConfirmPassword.value.trim();
		const { Password } = this.state;
		let newState = { ...this.state };
		Object.keys(this.state).map((element, index) => {

			if (element === 'toggle') {
				return;
			}
			if (element === 'alertLogout') {
				return;
			}
			else if (this.state[element].value.length === 0) {
				let newState = { ...this.state[element] };
				newState.errorMessage = element + ' is not empty';
				newState.isInputValid = false;
				newState.className = 'form-control is-invalid';
				this.setState({ [element]: newState })
			}
		})

		if (Password.isInputValid === true) {
			//console.log('haha')
			if (password && password === confirmPassword && localStorage.getItem('user')) {
				let user = JSON.parse(localStorage.getItem('user'));
				let token = user.access_token;

				let Customer = JSON.parse(user.Customer);
				let CustomerID = Customer.ID;
				const account = {
					Password: password,
					CustomerID: CustomerID
				}
				this.props.changePass(account, token);
			} else return;

		} else {
			return;
		}
	}
	validateInput = (type, checkingText) => {
		/* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */
		if (type === 'Password') {
			if (checkingText === '') {
				return {
					isInputValid: false,
					errorMessage: 'Password is not empty',
					className: 'form-control is-invalid'
				};

			} else {
				const regexp = /^[a-zA-Z0-9]{6,20}/;
				const lengthPass = checkingText.length;
				if (lengthPass < 6) {
					return {
						isInputValid: false,
						errorMessage: 'Password has at least 6 characters',
						className: 'form-control is-invalid'
					}
				} else if (lengthPass > 20) {
					return {
						isInputValid: false,
						errorMessage: 'Password has only maximum 20 characters',
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
							errorMessage: 'Password has at least 6 and maximum 20 characters',
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
					errorMessage: 'Cornfirm password not empty',
					className: 'form-control is-invalid'
				}
			}
			else if (checkingText !== this.state.Password.value) {
				return {
					isInputValid: false,
					errorMessage: 'Cornfirm password not correct',
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

	}

	onToggle = (e) => {
		this.setState({
			toggle: !this.state.toggle,
		});

		document.getElementById("html").style.overflow = "hidden";



	};
	onModelClosing = (e) => {
		this.setState({
			toggle: false,
		});
		document.getElementById("html").style.overflow = "auto";
	};
	onPreventDefault = e => {
		e.preventDefault();
	};
	onLogin = () => {
		const { history } = this.props;
		if (!localStorage.getItem('user')) {
			history.push('/SignIn');
		} else return;
	}
	onLogout = () => {
		const { history } = this.props;
		if (localStorage.getItem('user')) {
			this.props.logOut();
			history.push('/');
		} else return;
	}
	setWrapperRef = node => {
		this.wrapperRef = node;
	};

	handleClickOutside = event => {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.onModelClosing();
		}
	};
	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}
	componentWillUnmount() {
		this.props.clearAll();
	}
	render() {
		let statusChangePass = this.props.statusChangePass;


		let data = '';
		if (statusChangePass && statusChangePass.loading === true) {
			data = <img style={{ position: 'absolute', height: '150px', width: '150px', margin: 'auto', left: '0px', right: '0px', top: '0px', bottom: '0px' }} src={load} alt='loading' />
		}
		let alert = '';
		if (statusChangePass && statusChangePass.status === 204) {
			alert = <div className=" alert alert-success">Cập nhật mật khẩu thành công!</div>
		} else if (statusChangePass && statusChangePass.status === 404) {
			alert = <div className="alert alert-danger">Cập nhật mật khẩu thất bại!</div>

		}
		else {
			alert = <div></div>
		}
		let user = '';

		let tagLogin = '';
		if (localStorage.getItem('user')) {
			user = JSON.parse(localStorage.getItem('user'));

			let Customer = JSON.parse(user.Customer);

			tagLogin = <div className="dropdown">
				<button className="tagLogin btn btn-primary dropdown-toggle" style={{ background: 'rgb(4, 53, 76)', border: 'none' }} type="button" data-toggle="dropdown">{Customer.Name}
				</button>
				<ul className="dropdown-content" >
					<p style={{ fontSize: '13px' }}><Link style={{ color: '#007bff' }} to='/ListOrder' >Danh sách đơn hàng</Link></p>
					<p style={{ fontSize: '13px' }}><a style={{ color: '#007bff' }} href="#" onClick={() => this.onToggle()}>Đổi mật khẩu</a></p>

					<p style={{ fontSize: '13px' }}><a style={{ color: '#007bff' }} onClick={() => this.onLogout()} href="#">Đăng xuất</a></p>


				</ul>
			</div>
		} else {
			tagLogin = <Link to="/SignIn" className="text-white">
				<i className="fas fa-sign-in-alt mr-2"></i> Đăng nhập </Link>;
		}
		return (
			<div style={{ marginBottom: '0px', background: 'rgb(4, 53, 76)' }} className="row main-top-w3l py-2">
				<div className="col-lg-4 header-most-top">
					<p className="text-white text-lg-left text-center">Offer Zone Top Deals & Discounts
						<i className="fas fa-shopping-cart ml-1"></i>
					</p>
				</div>
				<div className="col-lg-8 header-right mt-lg-0 mt-2">

					<ul>
						<li className="text-center border-right text-white">
							<a className="play-icon popup-with-zoom-anim text-white" href="#small-dialog1">
								<i className="fas fa-map-marker mr-2"></i>Select Location</a>
						</li>
						<li className="text-center border-right text-white">
							<a href="#" data-toggle="modal" data-target="#exampleModal" className="text-white">
								<i className="fas fa-truck mr-2"></i>Track Order</a>
						</li>
						<li className="text-center border-right text-white">
							<i className="fas fa-phone mr-2"></i> 001 234 5678
						</li>
						<li className="text-center border-right text-white" >
							{tagLogin}
						</li>
					</ul>

				</div>
				<div
					className="modal "
					role="dialog"
					style={{ display: this.state.toggle ? "block" : "none" }}
					id="checkout"
				>
					<div className="modal-dialog ">
						<div
							ref={this.state.toggle ? this.setWrapperRef : ""}
							className="modal-content"
							style={{ marginTop: '-15px' }}
						>
							<div className="modal-header">
								<h4 className="modal-title">Cập nhật mật khẩu</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
									onClick={() => this.onModelClosing()}
								>
									<span className="close" style={{ fontSize: '28px', color: 'black' }} aria-hidden="true">×</span>
								</button>
							</div>
							{data}
							<div className="modal-body">
								<div
									className="checkout-left"
									style={{ backgroundColor: "white" }}
								>
									<div className="address_form_agile mt-sm-5 mt-4">
										<form
											method="post"
											className="creditly-card-form agileinfo_form"
											onSubmit={e => this.onPreventDefault(e)}
											style={{ opacity: statusChangePass && statusChangePass.loading ? 0.5 : 1, position: 'relative' }}
										>
											{alert}
											<div className="creditly-wrapper wthree, w3_agileits_wrapper">
												<div className="information-wrapper">
													<div className="first-row">
														<div className="w3_agileits_card_number_grids">
															<div className="w3_agileits_card_number_grid_left form-group">

																<label className="col-form-label">Mật khẩu mới</label>
																<input type="password" onBlur={(e) => this.onChangeValidation(e)} min="6" max="20" className={this.state.Password.className} placeholder="Mật khẩu mới" name="Password" required onChange={(event) => this.onChangeModal(event)} />
																<span style={{ color: '#ee2347', fontSize: '12px' }}>{this.state.Password.errorMessage}</span>


															</div>

															<div className="form-group">
																<label className="col-form-label">Nhập lại mật khẩu</label>
																<input type="password" onBlur={(e) => this.onChangeValidation(e)} min="6" max="20" className={this.state.ConfirmPassword.className} placeholder="Nhập lại mật khẩu" name="ConfirmPassword" required onChange={(event) => this.onChangeModal(event)} />
																<span style={{ color: '#ee2347', fontSize: '12px' }}>{this.state.ConfirmPassword.errorMessage}</span>
															</div>



														</div>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div
								className="right-w3l modal-footer"
								style={{
									textAlign: "center",
									alignItems: "center",
									display: "block"
								}}
							>
								<button
									onClick={() => this.onChangePass()}
									className="submit check_out btn"

								>
									Cập nhật
                </button>
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
		user: state.user,
		statusChangePass: state.changePassReducer
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		logOut: () => dispatch(logOut()),
		changePass: (account, token) => dispatch(changePass(account, token)),
		clearAll: () => dispatch(clearAll())
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hearder));

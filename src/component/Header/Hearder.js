import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logOut } from '../../actions/auth';
import '../InforCustomer/Address.css';
import { changePass, clearAll } from '../../actions/change-pass';
import load from '../../images/Double Ring-2.2s-100px.gif';
import { getCustomer, actionClear,updateInfor, actionClearAll } from '../../actions/customer-infor';
import { getAddress } from '../../actions/address';
import { async } from 'q';
import {removeCart} from '../../actions/cart';
class Hearder extends Component {
	constructor(props) {
		super(props);
		let inforCustomer = this.props.customerReducer.infor;
		//console.log(inforCustomer)
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
			Phone: {
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
			Fullname: {
				value: '',
				isInputValid: true,
				className: 'form-control',
				errorMessage: ''
			},
			// Address: '',
			// District: '',
			// Town: '',
			District: {
				value: '',
				isInputValid: true,
				className: 'form-control',
				errorMessage: ''
			},
			Town: {
				value: '',
				isInputValid: true,
				className: 'form-control',
				errorMessage: ''
			},
			CustomAddress: {
				value: '',
				isInputValid: true,
				className: 'form-control',
				errorMessage: ''
			},
			toggle: false,
			alertLogout: false,
			toggleInfor: false,
			district:'',
			towns:'',
			townsInDistrict:[]
		}

	}
	onSeletectDistrict = e => {
		const selectedDistrictID = e.target.value;
		let towns=[];
		let selectedDistrict='';
		if(e.target.value){
			selectedDistrict = this.getDistrictById(selectedDistrictID);
		 towns= this.getTownsOfDistrict(selectedDistrictID);
		
		}
		this.setState({
			
			...this.state,
			district: selectedDistrict,
			townsInDistrict: towns,
			District:{
				value:selectedDistrictID,
				isInputValid:e.target.value?true:false,
				className: e.target.value?'form-control is-valid':'form-control is-invalid',
				errorMessage: e.target.value?'':'Yêu cầu địa chỉ'
			}
		});
		
	};
	onSelectTown = e => {
		const selectedTownID = e.target.value;
		const selectedTown = this.getTownById(selectedTownID);
		this.setState({
			...this.state,
			Town:{
				value:selectedTownID,
				isInputValid:e.target.value?true:false,
				className: e.target.value?'form-control is-valid':'form-control is-invalid',
				errorMessage: e.target.value?'':'Yêu cầu địa chỉ'
			}
			
	})
};

	getDistrictById = districtID => {
		let districts = this.props.address.districts;
		let districtFilter = districts.filter(district => {
			return district.ID === districtID;
		});
		return districtFilter[0];
	};
	getTownsOfDistrict = districtID => {
		let districts = this.props.address.districts;
		//console.log(this.props.address)
		let districtFilter = districts.filter(district => {
		
			return district.ID === districtID;
		});
		return districtFilter[0].Towns;
	};
	onChangeCustomAddress = event => {
		const editingCustomAddress = event.target.value;
		this.setState({
			CustomAddress: {
				value:event.target.value ,
				isInputValid: event.target.value?true:false,
				className: event.target.value?'form-control is-valid':'form-control is-invalid',
				errorMessage: event.target.value?'':'Yêu cầu địa chỉ'
			}
		});
	};
	getTownById = townId => {
		let towns = this.state.townsInDistrict;
		let townFilter = towns.filter(town => {
			return town.ID === townId;
		});
		return townFilter[0];
	};
  onUpdate(){
	const user = JSON.parse(localStorage.getItem('user'));
	const token = user.access_token;
	//console.log('token' + token)
	const name = this.state.Fullname.value.trim();
	const phone=this.state.Phone.value.trim();
	const email = this.state.Email.value.trim();
	const district = this.state.District.value.trim();
	const town = this.state.Town.value.trim();
	const customAddress=this.state.CustomAddress.value.trim();
	const { Phone, Fullname, Email, CustomAddress,District,Town } = this.state;
        let newState = { ...this.state };
        Object.keys(this.state).map((element, index) => {
			if (element === 'toggle') {
				return;
			}
			if (element === 'alertLogout') {
				return;
			}
			if (element === 'toggleInfor') {
				return;
			}
			if (element === 'district') {
				return;
			}
			if (element === 'towns') {
				return;
			}
			if (element === 'Password') {
				return;
			}
			if (element === 'ConfirmPassword') {
				return;
			}
			if (element === 'townsInDistrict') {
				return;
			}
            else if (this.state[element].value.length === 0) {
                let newState = { ...this.state[element] };
                if (element === 'Phone') {
                    newState.errorMessage = 'Số điện thoại không được trống';
                }
                if (element === 'Fullname') {
                    newState.errorMessage = 'Tên không được trống';
                }
                if (element === 'Email') {
                    newState.errorMessage = 'Email không được trống';
                }
                if (element === 'District') {
                    newState.errorMessage = 'Yêu cầu địa chỉ';
                }
                if (element === 'Town') {
                    newState.errorMessage = 'Yêu cầu địa chỉ';
				}
				if (element === 'CustomAddress') {
                    newState.errorMessage = 'Yêu cầu địa chỉ';
                }
                newState.isInputValid = false;
                newState.className = 'form-control is-invalid';
                this.setState({ [element]: newState })
            }
        })

		if (Phone.isInputValid === true && Fullname.isInputValid === true 
			&& Email.isInputValid === true && District.isInputValid === true
		&& Town.isInputValid === true && CustomAddress.isInputValid === true) {
            //console.log('haha')
            if (phone && name && email && town && customAddress) {
                const customer = {
                    Name: name,
                    Email: email,
                    Phone: phone,
                    Address:{
						TownID:town,
						CustomAddress:customAddress
					}
                }
                this.props.updateInfor(token,customer);
            } else return;

        } else {
            return;
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
	onChangeModalInfor = (event) => {
		const { name, value } = event.target;
		const newState = { ...this.state[name] };
		newState.value = value;
		this.setState({ [name]: newState });
	}
	onChangeValidationInfor = (event) => {
		const { name } = event.target;
		let { isInputValid, errorMessage, className } = this.validateInputInfor(name, this.state[name].value);
		let newState = { ...this.state[name] };
		newState.isInputValid = isInputValid;
		newState.errorMessage = errorMessage;
		newState.className = className;
		this.setState({ [name]: newState })
	}
	// componentWillMount(){
	// 	console.log('will mount')
	// }
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
			if (element === 'toggleInfor') {
				return;
			}
			if (element === 'Fullname') {
				return;
			}
			if (element === 'Email') {
				return;
			}
			if (element === 'Phone') {
				return;
			}
			if (element === 'Town') {
				return;
			}
			if (element === 'District') {
				return;
			}
			if (element === 'CustomAddress') {
				return;
			}
			if (element === 'towns') {
				return;
			}
			if (element === 'district') {
				return;
			}
			if (element === 'townsInDistrict') {
				return;
			}
			else if (this.state[element].value.length === 0) {
				let newState = { ...this.state[element] };
				if (element === 'Password') {
					newState.errorMessage = 'Mật khẩu không được trống';
				}
				if (element === 'ConfirmPassword') {
					newState.errorMessage = 'Mật khẩu xác nhận không được trống';
				}
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
					errorMessage: 'Mật khẩu không được trống',
					className: 'form-control is-invalid'
				};

			} else {
				const regexp = /^[a-zA-Z0-9]{6,20}/;
				const lengthPass = checkingText.length;
				if (lengthPass < 6) {
					return {
						isInputValid: false,
						errorMessage: 'Mật khẩu phải có ít nhất 6 kí tự',
						className: 'form-control is-invalid'
					}
				} else if (lengthPass > 20) {
					return {
						isInputValid: false,
						errorMessage: 'Mật khẩu phải chỉ tối đa 20 kí tự',
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
		if (type === 'ConfirmPassword') {
			if (checkingText === '') {
				return {
					isInputValid: false,
					errorMessage: 'Mật khẩu xác nhận không được rỗng',
					className: 'form-control is-invalid'
				}
			}
			else if (checkingText !== this.state.Password.value) {
				return {
					isInputValid: false,
					errorMessage: 'Mật khẩu xác nhận không khớp',
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
	validateInputInfor = (type, checkingText) => {
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

		if (type === 'Fullname') {
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
		// if(type === )

	}

	onToggle = (e) => {
		this.setState({
			toggle: !this.state.toggle,
		});

		document.getElementById("html").style.overflow = "hidden";



	};
	onToggleInfor = (e) => {

		this.setState({
			toggleInfor: true,
			Phone: {
				value: this.props.customerReducer.infor ? this.props.customerReducer.infor.Phone : '',
				isInputValid: true,
				className: 'form-control is-valid',
				errorMessage: ''
			},
			Email: {
				value: this.props.customerReducer.infor ? this.props.customerReducer.infor.Email : '',
				isInputValid: true,
				className: 'form-control is-valid',
				errorMessage: ''
			},
			Fullname: {
				value: this.props.customerReducer.infor ? this.props.customerReducer.infor.Name : '',
				isInputValid: true,
				className: 'form-control is-valid',
				errorMessage: ''
			},
			CustomAddress: {
				value: this.props.customerReducer.infor && this.props.customerReducer.infor.Address ? this.props.customerReducer.infor.Address.CustomAddress : '',
				isInputValid: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?true:false,
				className: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'form-control is-valid':'form-control is-invalid',
				errorMessage: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'':'Yêu cầu địa chỉ'
			},
			District: {
				value:this.props.customerReducer.infor && this.props.customerReducer.infor.Address ? this.props.customerReducer.infor.Address.DistrictID : '',
				isInputValid: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?true:false,
				className: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'form-control is-valid':'form-control is-invalid',
				errorMessage: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'':'Yêu cầu địa chỉ'

			},
			Town: {
				value:this.props.customerReducer.infor && this.props.customerReducer.infor.Address ? this.props.customerReducer.infor.Address.DistrictID : '',
				isInputValid: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?true:false,
				className: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'form-control is-valid':'form-control is-invalid',
				errorMessage: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'':'Yêu cầu địa chỉ'

			}
		});

		document.getElementById("html").style.overflow = "hidden";


	};
	onModelClosing = (e) => {
		this.setState({
			toggle: false,
		});
		document.getElementById("html").style.overflow = "auto";
		this.props.clearAll();

	};
	onModelInforClosing = () => {
		this.setState({
			toggleInfor: false,
		});
		
		document.getElementById("html").style.overflow = "auto";
		this.props.actionClear();
		this.props.actionClearAll();
	}
	onPreventDefault = e => {
		e.preventDefault();
	};
	onLogin = () => {
		const { history } = this.props;
		if (!localStorage.getItem('user')) {
			history.push('/SignIn');
		} else return;
	}
	onLogout = async () => {
		const { history } = this.props;
		if (localStorage.getItem('user')) {
			await this.props.logOut();
			await this.props.removeCart()
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
	onEditProfile = () => {
		this.setState({
			toggleInfor: !this.state.toggleInfor,
		});

		document.getElementById("html").style.overflow = "hidden";
	}
	// componentWillMount(){

	// }
	async componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
		this.props.getAddress();
		if (localStorage.getItem('user')) {
			let user = JSON.parse(localStorage.getItem('user'));
			let token = user.access_token;
			await this.props.getCustomer(token);
		}
		if (localStorage.getItem('user') && await this.props.customerReducer.infor) {
			//console.log(this.props.customerReducer.infor)
			// console.log(this.props.customerReducer.infor)
			// console.log('did mount')
			this.setState({
				...this.state,
				Phone: {
					value: this.props.customerReducer.infor ? this.props.customerReducer.infor.Phone : '',
					isInputValid: true,
					className: 'form-control is-valid',
					errorMessage: ''
				},
				Email: {
					value: this.props.customerReducer.infor ? this.props.customerReducer.infor.Email : '',
					isInputValid: true,
					className: 'form-control is-valid',
					errorMessage: ''
				},
				Fullname: {
					value: this.props.customerReducer.infor ? this.props.customerReducer.infor.Name : '',
					isInputValid: true,
					className: 'form-control is-valid',
					errorMessage: ''
				},
				CustomAddress: {
					value: this.props.customerReducer.infor && this.props.customerReducer.infor.Address ? this.props.customerReducer.infor.Address.CustomAddress : '',
					isInputValid: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?true:false,
					className: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'form-control is-valid':'form-control is-invalid',
					errorMessage: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'':'Yêu cầu địa chỉ'
				},
				District: {
					value:this.props.customerReducer.infor && this.props.customerReducer.infor.Address ? this.props.customerReducer.infor.Address.DistrictID : '',
					isInputValid: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?true:false,
					className: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'form-control is-valid':'form-control is-invalid',
					errorMessage: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'':'Yêu cầu địa chỉ'

				},
				Town: {
					value:this.props.customerReducer.infor && this.props.customerReducer.infor.Address ? this.props.customerReducer.infor.Address.TownID : '',
					isInputValid: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?true:false,
					className: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'form-control is-valid':'form-control is-invalid',
					errorMessage: this.props.customerReducer.infor && this.props.customerReducer.infor.Address?'':'Yêu cầu địa chỉ'

				}

			})

		}

	}
	componentWillUnmount() {
		this.props.clearAll();
		this.props.actionClear();
	}
	render() {
		//console.log('render')
		let statusChangePass = this.props.statusChangePass;
		let inforCustomer = this.props.customerReducer;
		inforCustomer = inforCustomer.infor;
		
		let address = inforCustomer.Address;
		let data = '';
		if (statusChangePass && statusChangePass.loading === true) {
			data = <img style={{ position: 'absolute', height: '150px', width: '150px', margin: 'auto', left: '0px', right: '0px', top: '0px', bottom: '0px' }} src={load} alt='loading' />
		}
		let pollingInfor = '';
		if (inforCustomer && inforCustomer.loading === true) {
			pollingInfor = <img style={{ position: 'absolute', height: '150px', width: '150px', margin: 'auto', left: '0px', right: '0px', top: '0px', bottom: '0px' }} src={load} alt='loading' />
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
					<p style={{ fontSize: '13px' }}><a style={{ color: '#007bff' }} onClick={() => this.onEditProfile()} href="#">Cập nhật thông tin</a></p>

					<p style={{ fontSize: '13px' }}><a style={{ color: '#007bff' }} onClick={() => this.onLogout()} href="#">Đăng xuất</a></p>


				</ul>
			</div>
		} else {
			tagLogin = <Link to="/SignIn" className="text-white">
				<i className="fas fa-sign-in-alt mr-2"></i> Đăng nhập </Link>;
		}
		let districts = <option />;
		let districtProps = this.props.address.districts;
		if (districtProps.length > 0) {
			districts = districtProps.map((dis, i) => (
				<option key={i} value={dis.ID}>
					{dis.Name}
				</option>
			));
		}

		let towns = <option />;
		if(this.state.district){
			let townsInDistrict = this.state.district
			//console.log(townsInDistrict)
		if (townsInDistrict.length > 0) {
			towns = townsInDistrict.map((town, i) => (
				<option key={i} value={town.ID}>
					{town.Name}
				</option>
			));
		}
		}
		if(this.props.address && this.props.address.districts.length>0 && this.state.District.value){
			if(this.state.District.value){
				let townsInDistrict = this.getTownsOfDistrict(this.state.District.value)
				//console.log(townsInDistrict)
			if (townsInDistrict.length > 0) {
				towns = townsInDistrict.map((town, i) => (
					<option key={i} value={town.ID}>
						{town.Name}
					</option>
				));
			}
			}
		}
		let alertInfor=<div></div>;
		let updateStatusInfor = this.props.updateStatusInfor;
		if(updateStatusInfor.status === 200){
			alertInfor = <div className=" alert alert-success">Cập nhật thành công!</div>
		}else if(updateStatusInfor.status === 400){
			alertInfor = <div className=" alert alert-danger">Cập nhật không thành công!</div>
		}else{
			alertInfor=<div></div>
		}
		let pollingInforInUpdate = <div></div>;
		if (updateStatusInfor && updateStatusInfor.loading === true) {
			pollingInforInUpdate = <img style={{ position: 'absolute', height: '150px', width: '150px', margin: 'auto', left: '0px', right: '0px', top: '0px', bottom: '0px' }} src={load} alt='loading' />
		}
		//console.log(updateStatusInfor)
		return (
			<div style={{ marginBottom: '0px', background: 'rgb(4, 53, 76)' }} className="row main-top-w3l py-2">
				<div className="col-lg-4 header-most-top">
					<p className="text-white text-lg-left text-center">Trải nghiệm những sản phẩm mới nhất
						<i className="fas fa-shopping-cart ml-1"></i>
					</p>
				</div>
				<div className="col-lg-8 header-right mt-lg-0 mt-2">

					<ul>
						<li className="text-center border-right text-white">
							<a className="play-icon popup-with-zoom-anim text-white" href="#small-dialog1">
								<i className="fas fa-map-marker mr-2"></i>Hồ Chí Minh</a>
						</li>
						<li className="text-center border-right text-white">
							<a href="#" data-toggle="modal" data-target="#exampleModal" className="text-white">
								<i className="fas fa-truck mr-2"></i>Giao hàng nhanh</a>
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
				<div
					className="modal "
					role="dialog"
					style={{ display: this.state.toggleInfor ? "block" : "none" }}
					id="checkout"
				>
					<div className="modal-dialog ">
						<div
							ref={this.state.toggleInfor ? this.setWrapperRef : ""}
							className="modal-content"
							style={{ marginTop: '-15px' }}
						>
							<div className="modal-header">
								<h4 className="modal-title">Cập nhật thông tin</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
									onClick={() => this.onModelInforClosing()}
								>
									<span className="close" style={{ fontSize: '28px', color: 'black' }} aria-hidden="true">×</span>
								</button>
							</div>
							{/* {pollingInfor} */}
							{pollingInforInUpdate}
							<div className="modal-body">
								<div
									className="checkout-left"
									style={{ backgroundColor: "white", marginTop: '-30px' }}
								>
									<div className="address_form_agile mt-sm-5 mt-4">
										<form
											method="post"
											className="creditly-card-form agileinfo_form"
											onSubmit={e => this.onPreventDefault(e)}
											style={{ opacity: updateStatusInfor && updateStatusInfor.loading ? 0.5 : 1, position: 'relative' }}
										>
											{alertInfor}
											<div className="creditly-wrapper wthree, w3_agileits_wrapper">
												<div className="information-wrapper">
													<div className="first-row">
														<div className="w3_agileits_card_number_grids">
															<div className="w3_agileits_card_number_grid_left form-group inforInput" style={{ marginBottom: '0px', marginTop: '0px' }}>

																<label className="col-form-label">Họ và tên</label>
																<input type="text" onBlur={(e) => this.onChangeValidationInfor(e)} style={{ marginBottom: '0px' }} value={this.state.Fullname.value} min="1" max="50" className={this.state.Fullname.className} placeholder="Họ và tên" name="Fullname" required onChange={(event) => this.onChangeModalInfor(event)} />
																<span style={{ color: '#ee2347', fontSize: '12px' }}>{this.state.Fullname.errorMessage}</span>


															</div>
															<div className="row w3_agileits_card_number_grid_left" >
																<div className='col-sm-8' style={{ paddingLeft: '0px' }}>
																	<div className="w3_agileits_card_number_grid_left form-group inforInput" style={{ marginBottom: '0px', marginTop: '0px' }}>

																		<label className="col-form-label">Email</label>
																		<input type="email" onBlur={(e) => this.onChangeValidationInfor(e)} value={this.state.Email.value} style={{ marginBottom: '0px' }} min="1" max="50" className={this.state.Email.className} placeholder="Địa chỉ email" name="Email" required onChange={(event) => this.onChangeModalInfor(event)} />
																		<span style={{ color: '#ee2347', fontSize: '12px' }}>{this.state.Email.errorMessage}</span>


																	</div>

																</div>
																<div className='col-sm-4' style={{ paddingRight: '0px', paddingLeft: '0px' }}>
																	<div className="w3_agileits_card_number_grid_left form-group inforInput" style={{ marginBottom: '0px', marginTop: '0px', paddingLeft: '0px' }}>

																		<label className="col-form-label">Số điện thoại</label>
																		<input type="text" onBlur={(e) => this.onChangeValidationInfor(e)} style={{ marginBottom: '0px' }} value={this.state.Phone.value} min="10" max="11" className={this.state.Phone.className} placeholder="Số điện thoại" name="Phone" required onChange={(event) => this.onChangeModalInfor(event)} />
																		<span style={{ color: '#ee2347', fontSize: '12px' }}>{this.state.Phone.errorMessage}</span>


																	</div>
																</div>
															</div>


															<div className="w3_agileits_card_number_grid_left form-group inforInput" style={{ marginBottom: '0px', marginTop: '0px' }}>
																<label className="col-form-label">Tỉnh/Thành phố</label>
																<input type="text" className='form-control is-valid' style={{ marginBottom: '0px' }} readOnly defaultValue='Thành phố Hồ Chí Minh' />
															</div>
															<div className="w3_agileits_card_number_grid_left form-group inforInput" style={{ marginBottom: '0px', marginTop: '0px' }}>
																<label className="col-form-label">Quận/Huyện</label>

																<select className={this.state.District.className}
																	name="District"
																	value={this.state.District ? this.state.District.value : ''}
																	onChange={e => this.onSeletectDistrict(e)}
																	style={{ marginBottom: '0px', height: '33px', padding: '0px' }}>
																	<option value=''>Chọn quận/huyện</option>
																	{districts}
																</select>
																<span style={{ color: '#ee2347', fontSize: '12px' }}>{this.state.District.errorMessage}</span>


																{/* {districts} */}

															</div>

															<div className="w3_agileits_card_number_grid_left form-group inforInput" style={{ marginBottom: '0px', marginTop: '0px' }}>
																<label className="col-form-label">Phường/Xã</label>
																<select className={this.state.Town.className}

																	style={{ marginBottom: '0px', height: '33px', padding: '0px' }}
																	name="Town"
																	value={this.state.Town ? this.state.Town.value : ''}
																	onChange={e => this.onSelectTown(e)}>
																	<option value=''>Chọn phường/xã</option>
																	{towns}
																</select>
																<span style={{ color: '#ee2347', fontSize: '12px' }}>{this.state.Town.errorMessage}</span>

															</div>
															<div className="w3_agileits_card_number_grid_left form-group" style={{ marginBottom: '0px', marginTop: '0px' }}>
																<label className="col-form-label">Số nhà & tên đường</label>
																<div className="controls">
																	<input
																		style={{ marginBottom: '0px' }}
																		type="text"
																		className={this.state.CustomAddress.className}
																		onChange={event => this.onChangeCustomAddress(event)}
																		placeholder="Số nhà, tên đường"
																		name="customAddress"
																		// value={editingCustomAddress}
																		required
																		value={this.state.CustomAddress.value}
																	/>
																	<span
																		style={{
																			color: "#ee2347",
																			fontSize: "12px"
																		}}
																	>
																		<span style={{ color: '#ee2347', fontSize: '12px' }}>{this.state.CustomAddress.errorMessage}</span>


																	</span>
																</div>
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
									onClick={() => this.onUpdate()}
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
		statusChangePass: state.changePassReducer,
		address: state.addressReducer,
		customerReducer: state.customerReducer,
		updateStatusInfor:state.updateReducer
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		logOut: () => dispatch(logOut()),
		changePass: (account, token) => dispatch(changePass(account, token)),
		clearAll: () => dispatch(clearAll()),
		getAddress: () => dispatch(getAddress()),
		getCustomer: (token) => dispatch(getCustomer(token)),
		actionClear: () => dispatch(actionClear()),
		updateInfor:(token, infor)=>dispatch(updateInfor(token, infor)),
		actionClearAll:()=>dispatch(actionClearAll()),
		removeCart:()=>dispatch(removeCart())
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hearder));

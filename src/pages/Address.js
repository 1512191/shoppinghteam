import React, { Component } from "react";
import Header from "../component/Header/Hearder";
import Footer from "../component/Footer/Footer";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import util from "../Util";
import { countCart, postRequest, removeCart } from "../actions/cart";
import "../component/InforCustomer/Address.css";
import { getMethodDelivery } from "../actions/delivery-method";
import { getAddress } from "../actions/address";
import load from '../images/Double Ring-2.2s-100px.gif';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import { Table } from 'react-bootstrap';
import *as service from '../services/api';
import moment from 'moment';



class Address extends Component {
  constructor(props) {
    super(props);
    let infoLogin = JSON.parse(localStorage.getItem('user'));
    let Customer = infoLogin?JSON.parse(infoLogin.Customer):null;
    let address = Customer && Customer.Address?Customer.Address:null;
    this.state = {
      toggle: false,
      infoLogin: infoLogin && JSON.parse(infoLogin.Customer)?Customer:{},
      address: address ? address : {
        CustomAddress: '',
        Town: '',
        District: ''
      },
      errorMessage: '',
      isGottenDistricts: false,
      district: address ? {
        ID: address.DistrictID,
        Name: address.District
      } : null,
      townsInDistrict: [],
      town: address ? {
        ID: address.TownID,
        Name: address.Town
      } : null,
      isEditedAddress: address ? true : false,
      deliveryMethod: {
        ID: '',
        Name: ''
      },
      editingCustomAddress: '',
      standardDate: '',
      fastDate: '',
      note:'',
    };
    this.onSelectTown = this.onSelectTown.bind(this);
    this.onCheckout = this.onCheckout.bind(this);
  }

  onChangeCustomAddress = event => {
    const editingCustomAddress = event.target.value;
    this.setState({
      editingCustomAddress
    });
  };

  onCheckout = async () => {
    //console.log(this.state)
    let products = this.props.cart;
    let { history } = this.props;
    let deliveryMethod = this.state.deliveryMethod;
    let infoLogin = JSON.parse(localStorage.getItem('user'));
    let token = infoLogin.access_token;
   // console.log(token)
    infoLogin = JSON.parse(infoLogin.Customer)

    if (deliveryMethod !== null) {
      let countCart = this.props.cart ? util.countQuantity(this.props.cart) : 0;
      let billDetails = [];
      products.map((item, i) => {
        billDetails.push({
          productID: item.product.ID,
          quantity: item.Quantity,
          price: item.product.Price
        });
      });
      let current_datetime = new Date();
      let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate();
      if (this.state.address && deliveryMethod) {
        let infor = {
          totalQuantity: countCart,
          shipAddress: {
            townID: this.state.town.ID,
            customAddress: this.state.address.CustomAddress
          },
          products: billDetails,
          deliveryMethodID: deliveryMethod.ID,
          customerID: infoLogin.ID,
          expectedReceivedAt: formatted_date,
          shipFee: deliveryMethod.Price,
          note:this.state.note
        };
        await this.props.postRequest(infor, token);
        let status = await this.props.checkPost.status;
        if (status) {

          if (status === 201) {
            await this.props.removeCart()
            await history.push(`/OrderDetail/${this.props.checkPost.data.ID}`);
          }
          if (status === 500) {
            return;
          }

        }
        else {
          return;
        }


      } else {
        return;
      }
    } else {
      return;
    }
  };

  onChangeMethod = e => {
    const deliveryMethodId = e.target.value;
    const methodFilter = this.props.deliveryMethods.filter(deliveryMethod => {
      return deliveryMethod.ID === deliveryMethodId;
    });
    this.setState({
      deliveryMethod: methodFilter[0]
    });
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.onModelClosing();
    }
  };

  onPreventDefault = e => {
    e.preventDefault();
  };

  onChangeAddressBtnClick = () => {
    this.setState({
      toggle: true
    });
    document.getElementById("html").style.overflow = "hidden";
  };

  onModelClosing = () => {
    this.setState({
      toggle: false,
    });
    document.getElementById("html").style.overflow = "auto";
  };

  componentDidMount() {
    //console.log(this.props.cart )
    let countCart = this.props.cart ? util.countQuantity(this.props.cart) : 0;
    if (!localStorage.getItem("user") || countCart <= 0) {
      this.props.history.push("/Checkout");
      return;
    }
    document.addEventListener("mousedown", this.handleClickOutside);
    this.props.getMethodDelivery();
   // const date = moment().format('MM-DD-YYYY');
   const date = moment().toISOString();
    const promise1 = service.getExpectedDate(date, 0)
    const promise2 = service.getExpectedDate(date, 1)
    Promise.all([promise1, promise2])
      .then((values) => {
        console.log(values)
        this.setState({
          standardDate: values[0].data,
          fastDate: values[1].data
        })
      });

  }

  componentWillMount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    this.scrollListener = window.addEventListener('scroll', (e) => {
      document.body.scrollTop = 0
    })
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps, prevState) {
    //console.log(nextProps.address)
    if (!this.state.isGottenDistricts && nextProps.address && nextProps.address.districts.length > 0) {
      if (this.state.district && this.state.district.ID) {
        //console.log(this.state.district && this.state.district.ID)
        let district = nextProps.address.districts.filter(item => {
          return item.ID === this.state.district.ID;
        });
        this.setState({
          isGottenDistricts: true,
          townsInDistrict: district[0].Towns
        })
      }
      else {
        let { districts } = nextProps.address;
        this.setState({
          isGottenDistricts: true,
          district: {
            id: districts[0].ID,
            name: districts[0].District
          },
          town: {
            id: districts[0].Towns[0].ID,
            name: districts[0].Towns[0].Town
          },
          townsInDistrict: districts[0].Towns
        })
      }
    }
    if (nextProps.deliveryMethods && nextProps.deliveryMethods.length > 0) {
      let { deliveryMethods } = nextProps;
      this.setState({
        deliveryMethod: deliveryMethods[0]
      });
    }
  }

  toTalPrice = item => {
    let total = 0;
    item.forEach(element => {
      total += element.product.Price * element.Quantity;
    });
    total += this.state.deliveryMethod ? this.state.deliveryMethod.Price : 0;
    return total;
  };

  onSave = async () => {
    let { editingCustomAddress, town, district } = this.state;

    if (editingCustomAddress.length === 0) {
      this.setState({
        isEditedAddress: false,
        errorMessage: 'Required field'
      });
    }
    else {
      this.setState({
        address: {
          CustomAddress: editingCustomAddress,
          Town: town.Name,
          District: district.Name
        },
        isEditedAddress: true,
        toggle: false,
        errorMessage: ''
      })
      document.getElementById("html").style.overflow = "auto";
    }
  };

  onToggle = () => {
    this.setState({
      toggle: !this.state.toggle,
      editingCustomAddress: this.state.address.CustomAddress
    });
    document.getElementById("html").style.overflow = "hidden";

    if (this.props.address && this.props.address.districts.length === 0) {
      this.props.getAddress();
    }
  };

  getTownsOfDistrict = districtID => {
    let districts = this.props.address.districts;
    let districtFilter = districts.filter(district => {
      return district.ID === districtID;
    });

    return districtFilter[0].Towns;
  };

  getDistrictById = districtID => {
    let districts = this.props.address.districts;
    let districtFilter = districts.filter(district => {
      return district.ID === districtID;
    });
    return districtFilter[0];
  };
  onRedirect = () => {
    let { history } = this.props;
    history.push('/Checkout')
  }
  getTownById = townId => {
    let towns = this.state.townsInDistrict;
    let townFilter = towns.filter(town => {
      return town.ID === townId;
    });
    return townFilter[0];
  };
onChangeNote = (event)=>{

    let note = event.target.value;
    this.setState({
      note:note
    });
 

}
  onSeletectDistrict = e => {
    const selectedDistrictID = e.target.value;
    const selectedDistrict = this.getDistrictById(selectedDistrictID);
    let towns = this.getTownsOfDistrict(selectedDistrictID);
    this.setState({
      district: selectedDistrict,
      town: towns[0],
      townsInDistrict: towns
    });
  };

  onSelectTown = e => {
    const selectedTownID = e.target.value;
    const selectedTown = this.getTownById(selectedTownID);
    this.setState({
      town: selectedTown
    });
  };

  render() {
    let products = this.props.cart;
    let countCart = this.props.cart ? util.countQuantity(this.props.cart) : 0;
    let infoDisplay = "";
    let addressDelivery = "";
    let { deliveryMethods } = this.props;
    let towns = <option />;
    let { townsInDistrict } = this.state;
    let loading = '';
    let tagError = '';
    let editingCustomAddress = this.state.editingCustomAddress;
    if (this.props.checkPost && this.props.checkPost.status === 500) {
      tagError = <div style={{ marginTop: '10px' }} className=" row alert alert-danger">Đặt hàng không thành công!</div>
    } else {
      tagError = <div></div>
    }
    // console.log(this.props.bills)
    if (this.props.checkPost && this.props.checkPost.loading === true) {
      loading = <img style={{ position: 'absolute', height: '120px', width: '120px', margin: 'auto', left: '0px', right: '0px', bottom: '0px' }} src={load} alt='loading' />
    }
    if (townsInDistrict.length > 0) {
      towns = townsInDistrict.map((town, i) => (
        <option key={i} value={town.ID}>
          {town.Name}
        </option>
      ));
    }

    if (this.state.isEditedAddress) {
      let tempAddress = this.state.address;
      addressDelivery = (
        <p style={{color:'#04354C', wordBreak: 'break-all'}}>
          Địa chỉ giao hàng: {tempAddress.CustomAddress} {tempAddress.Town} {tempAddress.District} Thành phố Hồ Chí Minh
      </p>
      );
    } else {
      addressDelivery = <p />;
    }
    if (this.state.infoLogin) {
      infoDisplay = (
        <div style={{ position: "relative", textAlign: 'left', color:'#04354C',  height:'100%'}}>
          <h2 style={{ color:'#04354C', marginTop: '10px', textTransform: 'uppercase' }}>Thông tin người nhận</h2>
          <br />
          <p style={{color:'#04354C'}}>Họ và tên: {this.state.infoLogin.Name}</p>
          <p style={{color:'#04354C'}}>SĐT: {this.state.infoLogin.Phone}</p>
          {addressDelivery}
          <textarea name="note" placeholder="Ghi chú" style={{width:'100%', padding:'10px',marginTop:'20px', fontFamily:'"Open Sans", sans-serif', borderRadius:'10px'}} onChange={(e)=>this.onChangeNote(e)}></textarea>
        

          <div
            className="right-w3l"
            style={{ textAlign: "center", alignItems: "center",bottom:'15px', left:'0px', right:'0px' }}
          >
            <button
              className="submit check_out btn"
            
              onClick={() => this.onToggle()}
            >
              Địa chỉ giao hàng
          </button>

          </div>
        </div>
      );
    } else {
      infoDisplay = <div />;
    }
    let btnCheckout = (
      <div
        className="right-w3l "
        style={{ textAlign: "center", alignItems: "center" }}
      >
        <button
          className="submit check_out btn"
          style={{backgroundColor:'rgb(255, 59, 39)'}}
          disabled={!this.state.isEditedAddress}
          onClick={() => this.onCheckout(products)}
        >
          Mua hàng
          </button>
      </div>
    )

    let districts = <option />;
    const districtProps = this.props.address.districts;
    if (districtProps.length > 0) {
      districts = districtProps.map((dis, i) => (
        <option key={i} value={dis.ID}>
          {dis.Name}
        </option>
      ));
    }
    let toTal = '';
    if (products) {
      toTal = <tr >
        <td colSpan={4} style={{ textAlign: 'right' }}>
          <div>Tổng tạm tính</div>
          <div>Phí vận chuyển</div>
          <div>Tổng cộng</div>
        </td>
        <td colSpan={1} style={{ textAlign: 'right', paddingRight: '10px' }}>
          <div>{util.showVNDCurrency(this.toTalPrice(products) - this.state.deliveryMethod.Price) }</div>
          <div>  {this.state.deliveryMethod
            ? util.showVNDCurrency(
              this.state.deliveryMethod.Price
            )
            : 0}</div>
          <div style={{ color: '#ff3b27', fontWeight: 'bold' }}>{util.showVNDCurrency(this.toTalPrice(products))}</div>
        </td>


      </tr>
    } else {
      toTal = <tr></tr>
    }
    return (
      <div className="agile-main-top">

        <Header />
        <Search ></Search>
        <Category></Category>
        <div
          className="ads-grid py-sm-5 py-4"
          style={{
            background: '#EEE8CD',
            backgroundSize: "100% 100%"
          }}
        >
          <div className="container py-xl-4 py-lg-2" style={{ opacity: this.props.checkPost && this.props.checkPost.loading ? 0.5 : 1, position: 'relative' }}>
            {tagError}
            <div className="row" >
              {loading}
              <div className="col-sm-5" style={{backgroundColor:'white'}}>

                {infoDisplay}
              </div>
              <div className="col-sm-2">

              </div>
              <div className="col-sm-5" style={{ textAlign: 'left', color:'#04354C' , backgroundColor:'white' }}>
                <h2 style={{ color:'#04354C', marginTop: '10px', textTransform: 'uppercase' }}>Chọn phương thức giao hàng</h2>
                <br />
                {deliveryMethods &&
                  deliveryMethods.map((deliveryMethod, index) => {
                    return (
                      <div key={index} className="inputMethod">
                        <input
                          type="radio"
                          name="method"
                          onChange={e => this.onChangeMethod(e)}
                          checked={
                            this.state.deliveryMethod.ID ===
                            deliveryMethod.ID
                          }
                          key={index}
                          value={deliveryMethod.ID}
                        />
                        <span style={{color:'#04354C', fontWeight:'bolder'}}>{deliveryMethod.Name === 'Standard' ? 'Giao hàng thường' : 'Giao hàng nhanh'}</span>
                       
                        <div style={{color:'#04354C'}}>{deliveryMethod.Description}</div>
                       
                        <div style={{color:'#04354C'}}>Ngày giao hàng dự kiến: {deliveryMethod.Name === 'Standard' ? this.state.standardDate : this.state.fastDate}
                        </div>
                       
                        <div style={{color:'#04354C'}}>Gía: {util.showVNDCurrency(deliveryMethod.Price)}</div>
                       
                      </div>
                    );
                  })}
              
              </div>
</div>
 <br />
            <div className="row">
              <Table id="mytable" responsive style={{ backgroundColor: "#04354C" }}>
              <tbody>
                <tr >
                  <th colSpan={5}><h1 style={{ fontSize: '30px',  backgroundColor:"rgb(253, 214, 0)" }}>CHI TIẾT ĐƠN HÀNG</h1></th>
                </tr>
                <tr style={{ color: 'white' }}>

                  <th >Sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th></th>


                </tr>
                </tbody>
                <tbody style={{ color: 'white'}}>

                  {products &&
                    products.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link
                              style={{ color: "white", textTransform: 'uppercase' }}
                              to={`/Detail/${item.product.ID}`}
                            >
                              {item.product.Name}
                            </Link>
                          </td>
                          <td>
                            <img src={`${item.product.Image} `} alt={item.product.Name} width="50px" height="50px" />
                          </td>
                          <td>
                            {item.Quantity}
                          </td>
                          <td>
                            {util.showVNDCurrency(item.product.Price)}
                          </td>
                          <td>
                            <button
                              onClick={() => this.onRedirect()}
                              style={{ borderRadius: "10px", background:'#bbdefb', color:'black', fontWeight:'bolder' }}
                            >
                              Cập nhật
                            </button>
                          </td>

                        </tr>


                      );
                    })}
                  {toTal}
                  <tr>
                    <td colSpan={5}>
                      {btnCheckout}
                    </td>

                  </tr>
                </tbody>
              </Table>
            </div>
            </div>
           



        
        </div>

        <Footer />

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
            >
              <div className="modal-header">
                <h4 className="modal-title">Địa chỉ mới</h4>
                <button
                  style={{ fontSize: '28px' }}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.onModelClosing()}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
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
                    >
                      <div className="creditly-wrapper wthree, w3_agileits_wrapper">
                        <div className="information-wrapper">
                          <div className="first-row">
                            <div className="w3_agileits_card_number_grids">
                              <div className="w3_agileits_card_number_grid_left form-group">
                                <div className="controls">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Province"
                                    readOnly
                                    defaultValue="Thành phố Hồ Chí Minh"
                                    name="Province"
                                  />
                                </div>
                              </div>
                              <div className="w3_agileits_card_number_grid_right form-group">
                                <div className="controls">
                                  <select
                                    name="District"
                                    value={this.state.district ? this.state.district.ID : ''}
                                    onChange={e => this.onSeletectDistrict(e)}
                                  >
                                    {districts}
                                  </select>
                                </div>
                              </div>

                              <div className="w3_agileits_card_number_grid_right form-group">
                                <div className="controls">
                                  <select
                                    name="town"
                                    value={this.state.town ? this.state.town.ID : ''}
                                    onChange={e => this.onSelectTown(e)}
                                  >
                                    {towns}
                                  </select>
                                </div>
                              </div>

                              <div className="w3_agileits_card_number_grid_right form-group">
                                <div className="controls">
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={event => this.onChangeCustomAddress(event)}
                                    placeholder="Số nhà, tên đường"
                                    name="customAddress"
                                    value={editingCustomAddress}
                                    required
                                  />
                                  <span
                                    style={{
                                      color: "#ee2347",
                                      fontSize: "12px"
                                    }}
                                  >
                                    {this.state.errorMessage}
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
                  disable={`${!this.state.isEditedAddress}`}
                  className="submit check_out btn"
                  onClick={() => this.onSave()}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
const mapStateToProps = state => {
  return {
    deliveryMethods: state.methodReducer,
    infoLogin: state.authReducer,
    cart: state.cartReducer,
    checkPost: state.checkoutReducer,
    address: state.addressReducer,
    date: state.expectedDateReducer
  };
};
const mapDispathtoProps = dispath => {
  return {
    countCart: (item, quantity) => dispath(countCart(item, quantity)),
    postRequest: (data, token) => dispath(postRequest(data, token)),
    getMethodDelivery: () => dispath(getMethodDelivery()),
    getAddress: () => dispath(getAddress()),
    removeCart: () => dispath(removeCart())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispathtoProps
  )(Address)
);

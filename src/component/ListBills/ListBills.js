import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import util from "../../Util";
import "../../component/InforCustomer/Address.css";
import load from '../../images/Double Ring-2.2s-100px.gif';
import moment from 'moment';
import './ListBills.css';
import { Table } from 'react-bootstrap';
import Pagination from "react-js-pagination";
class ListBills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      currentPage: 1,
      data: [],
      totalItemsCount: 10
    };
    this.handlePageChange = this.handlePageChange.bind(this);

  }
  handlePageChange(pageNumber) {
    let infoLogin = localStorage.getItem('user')
    infoLogin = JSON.parse(infoLogin);
    let token = infoLogin.access_token;
    infoLogin = JSON.parse(infoLogin.Customer)
    this.props.getBills(infoLogin.ID, token, pageNumber, 10);

    this.setState({
      activePage: pageNumber,
      currentPage: pageNumber,

    })

  }
  componentWillMount() {
    this.scrollListener = window.addEventListener('scroll', (e) => {
      document.body.scrollTop = 0
    })
    window.scrollTo(0, 0);

  }
  componentDidMount() {

    let infoLogin = localStorage.getItem('user')
    if(infoLogin){
      infoLogin = JSON.parse(infoLogin);
      let token = infoLogin.access_token
      infoLogin = JSON.parse(infoLogin.Customer)
      if (infoLogin) {
        this.props.getBills(infoLogin.ID, token);
  
      } else {
        console.log('haha')
      }
    }else{
      this.props.history.push('/SignIn');
    }
   


  }


  render() {
    let bill = {};
    bill = this.props.bills;
    // console.log(this.props.bills)
    let pagination = '';
    if (this.props.bills) {
      pagination = <div style={{ textAlign: 'center' }}><Pagination className="pagination center"
        activePage={this.state.activePage}
        itemsCountPerPage={10}
        totalItemsCount={this.props.bills.totalPage * this.props.bills.perPage}
        pageRangeDisplayed={1}
        onChange={this.handlePageChange}
      />
      </div>
    } else {
      pagination = <div></div>
    }
    let loading = '';
    if (this.props.bills && this.props.bills.loading === true) {
      loading = <img style={{ position: 'absolute', height: '120px', width: '120px', margin: 'auto', left: '0px', right: '0px', bottom: '0px' }} src={load} alt='loading' />
    }
    return (
      <div
        className="ads-grid py-sm-5 py-4"
        style={{
          background: '#e4e7e9',
          backgroundSize: "100% 100%"
        }}
      >

        <div className="container py-xl-4 py-lg-2" style={{ opacity: this.props.bills && this.props.bills.loading ? 0.5 : 1, position: 'relative' }}>
          {loading}
          <Table responsive style={{ backgroundColor: "white" }}>
            <thead style={{ background: '#c5cae9' }} className="table-borderless">
              <tr className="table-borderless" >
                <th colSpan={6}><h1 style={{ fontSize: '30px', color: 'white', background: 'rgb(4, 53, 76)', textTransform: 'uppercase' }}>Danh sách đơn hàng</h1></th>
              </tr>
              <tr className="table-borderless">
                <th >Mã đơn hàng</th>
                <th>Ngày mua</th>
                <th>Ngày giao hàng</th>
                <th>Tổng tiền</th>
                <th>Hình thức giao hàng</th>
                <th>Trạng thái đơn hàng</th>
              </tr>
            </thead>

            {
              bill && bill.bill.map((value, item) => (
                <tbody key={item} style={{ cursor: 'pointer' }}>
                  <tr data-toggle="collapse" data-parent="#accordion" href={'#colapse' + item} height='60px'>
                    <td className="madonhang"><NavLink className="madonhang" to={`/OrderDetail/${value.ID}`} onClick={() => this.props.history.push(`/OrderDetail/${value.ID}`)}>{value.ID}</NavLink></td>
                    <td>{moment(value.CreatedAt).format('DD/MM/YYYY')}</td>
                    <th>{moment(value.ExpectedReceivedAt).format('DD/MM/YYYY')}</th>
                    <td>{util.showVNDCurrency(value.TotalPrice)}</td>
                    <td>{value.DeliveryMethod === 'Standard' ? 'Giao hàng thường' : 'Giao hàng nhanh'}</td>
                    <td className="status" style={{ fontWeight: 'bold' }}><i className={util.classNameStatus(value.Status)}></i><span style={{ color: util.colorStatus(value.Status), marginLeft: '5px' }}>{util.statusName(value.Status)}</span></td>

                  </tr>
                  <tr id={'colapse' + item} className="panel-collapse collapse " style={{ cursor: 'text' }}>
                    <td colSpan={6} className="panel-body">
                      <div className="col-sm-5 col" style={{ backgroundColor: "white", textAlign: 'left', color: 'black', border: 'none' }}>

                        <h1 style={{ color: "#30add1", marginTop: '10px' }}>Thông tin người nhận</h1>
                        <br />
                        <div style={{ marginBottom: '5px' }} className="Infor">Họ và tên: <span className="word">{value.Customer}</span></div>
                        <div style={{ marginBottom: '5px' }} className="Infor">Địa chỉ: <span className="word">{value.ShipAddress}</span></div>
                        <div style={{ marginBottom: '5px' }} className="Infor">Ngày đặt hàng: <span className="word">{moment(value.CreatedAt).format('HH:mm - DD/MM/YYYY')}</span></div>
                        <div style={{ marginBottom: '5px' }} className="Infor">Ngày giao hàng dự kiến: <span className="word">{moment(value.ExpectedReceivedAt).format('HH:mm - DD/MM/YYYY')}</span></div>
                        <div style={{ marginBottom: '5px' }} className="Infor">Phương thức giao hàng: <span className="word">{value.DeliveryMethod === 'Standard' ? 'Giao hàng thường' : 'Giao hàng nhanh'}</span></div>

                      </div>
                      <div className="col-sm-2">

                      </div>
                      <div className="col-sm-5 col" style={{ backgroundColor: "white", textAlign: 'left', border: 'none' }}>

                        <div className="col-form-label">
                          <span>
                            Đơn hàng (
                              <span style={{ fontWeight: "bolder" }}>
                              {value.TotalProduct}
                            </span>{" "}
                            sản phẩm)
                            </span>

                        </div>
                        <hr />
                        {value.Products &&
                          value.Products.map((product, i) => {
                            return (
                              <div key={i}>
                                <div
                                  className="col-form-label"
                                  style={{ fontSize: "12px" }}
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {product.Quantity}
                                  </span>
                                  x{" "}
                                  <span>

                                    {product.Name}

                                  </span>
                                  <span style={{ float: "right" }}>
                                    {util.showVNDCurrency(product.Price)}
                                  </span>
                                </div>
                                <hr />
                              </div>
                            );
                          })}
                        <div className="col-form-label">
                          <span>Phí vận chuyển</span>{" "}
                          <span style={{ float: "right", color: "#ee2347" }}>

                            {util.showVNDCurrency(
                              value.ShipFee
                            )
                            }
                          </span>
                        </div>
                        <div className="col-form-label">
                          <span>Thành tiền</span>{" "}
                          <span style={{ float: "right", color: "#ee2347" }}>
                            {util.showVNDCurrency(value.TotalPrice)}
                          </span>
                        </div>
                      </div>
                    </td>

                  </tr>

                </tbody>

              ))

            }

          </Table>

          {pagination}

        </div>
        <br />
      </div>
    );
  }
}
export default ListBills;
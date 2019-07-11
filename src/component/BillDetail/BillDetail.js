import React, { Component } from 'react';
import {Link, NavLink } from "react-router-dom";
import util from "../../Util";
import './BillDetail.css'
import load from '../../images/Double Ring-2.2s-100px.gif';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import * as service from '../../services/api';

class BillDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusReorder: false
    }

  }

  componentWillMount() {
    this.scrollListener = window.addEventListener('scroll', (e) => {
      document.body.scrollTop = 0
    })
    window.scrollTo(0, 0);

  }
  componentDidMount() {

    this.props.clearModal();
    let infoLogin = localStorage.getItem('user');
    const { match } = this.props;
    if(infoLogin){
    let token = (JSON.parse(localStorage.getItem('user'))).access_token;
    if (match) {
      const { id } = match.params;

      this.props.getBillDetail(id, token);
    }
  }else{
    this.props.history.push('/SignIn');
  }

  }
  componentWillReceiveProps(nextProps) {
    let id = nextProps.match.params.id;
    if(localStorage.getItem('user')){
      let token = (JSON.parse(localStorage.getItem('user'))).access_token;
      if (id !== this.props.match.params.id) {
  
        this.props.clear();
        this.props.getBillDetail(id, token);
      }
    }
   

  }
  toTalPrice = (item) => {
    let total = 0;
    item.forEach(element => {

      total += element.Price * element.Quantity;
    });
    return total;
  }
  reOrder = async (billID) => {
    let token = (JSON.parse(localStorage.getItem('user'))).access_token;
    await service.reorderBill(billID, token).then(res => {

      if (res.data) {
        this.props.history.push(`/OrderDetail/${res.data}`)
      } else {
        this.setState({
          statusReorder: true
        })
      }
    }).catch(e => {
      this.setState({
        statusReorder: true
      })
    })
  }
  render() {


    let loading = '';
    let bill = this.props.bill.bill;
    let billID = this.props.bill.bill.ID;
    let inFo = '';
    let toTal = '';
    let statusBill = '';
   // let buttonReorder = '';
    // if (this.state.statusReorder === true) {
    //   alert('Đặt hàng không thành công')
    // }
    // if (bill && bill.Status && bill.Status === 'Failed') {
    //   buttonReorder = <button className="submit check_out btn" onClick={() => this.reOrder(billID)}>Đặt lại</button>
    // } else {
    //   buttonReorder = <div></div>
    // }
    if (bill) {
      statusBill = <div className={bill.Status === 'Failed' ? 'row alert alert-danger' : 'row'} style={{ background: bill.Status === 'Failed' ? '' : 'white', padding: '15px' }}>
        <div className="col-sm-6" style={{ textAlign: 'left' }}>
          <i style={{ marginTop: '8px' }} className={util.classNameStatus(bill.Status)}></i><span style={{ color: util.colorStatus(bill.Status), marginLeft: '5px', fontSize: '20px' }}>{util.statusName(bill.Status)}</span>

        </div>
        <div className="col-sm-6">
          {/* <div className="right-w3l" style={{ textAlign: "center", alignItems: "center" }}>

            {
              buttonReorder
            }

          </div> */}
        </div>
      </div>
    } else {
      statusBill = <div></div>
    }
    if (this.props.bill && this.props.bill.loading === true) {
      loading = <img style={{ position: 'absolute', height: '120px', width: '120px', margin: 'auto', left: '0px', right: '0px', bottom: '0px' }} src={load} alt='loading' />
    }

    if (bill) {
      inFo = <div className="row" style={{ background: 'white', fontFamily: '"Lato", sans-serif' }}>
        <div className="col-sm-4" style={{ textAlign: 'left' }}>
          <h2 className='titleHeader'>ĐỊA CHỈ NGƯỜI NHẬN</h2>
          <h3 style={{ fontWeight: 'bolder' }}>{bill.Customer}</h3>
          <div>Địa chỉ: {bill.ShipAddress}</div>
          <div>Ghi chú: {bill.Note ? bill.Note : 'Không có'}</div>
        </div>

        <div className="col-sm-4" style={{ textAlign: 'left' }}>
          <h2 className='titleHeader' >HÌNH THỨC GIAO HÀNG</h2>
          <div>Phương thức giao hàng: {bill.DeliveryMethod === "Standard" ? 'Giao hàng thường' : 'Giao hàng nhanh'}</div>
          <div>Ngày đặt hàng: {moment(bill.CreatedAt).format('HH:mm - DD/MM/YYYY')}</div>
          <div>Ngày giao hàng dự kiến: {moment(bill.ExpectedReceivedAt).format('HH:mm - DD/MM/YYYY')}</div>
          <div>Ngày giao hàng: {bill.EndDeliveryAt ? moment(bill.EndDeliveryAt).format('HH:mm - DD/MM/YYYY') : 'Chưa giao'}</div>
        </div>
        <div className="col-sm-4" style={{ textAlign: 'left' }}>
          <h2 className='titleHeader'>HÌNH THỨC THANH TOÁN</h2>
          <div>Thanh toán tiền mặt</div>
        </div>
      </div>
    } else {
      inFo = <div></div>
    }
    if (bill && bill.Products) {
      toTal = <tr >
        <td colSpan={4} style={{ textAlign: 'right' }}>
          <div>Tổng tạm tính</div>
          <div>Phí vận chuyển</div>
          <div>Tổng cộng</div>
        </td>
        <td colSpan={1} style={{ textAlign: 'right', paddingRight: '10px' }}>
          <div>{util.showVNDCurrency(this.toTalPrice(bill.Products))}</div>
          <div>{util.showVNDCurrency(bill.ShipFee)}</div>
          <div style={{ color: '#ff3b27', fontWeight: 'bold' }}>{util.showVNDCurrency(bill.TotalPrice)}</div>
        </td>


      </tr>
    } else {
      toTal = <tr></tr>
    }
    return (
      <div
        className="ads-grid py-sm-5 py-4"
        style={{
          background: '#EEE8CD',
          backgroundSize: "100% 100%"
        }}
      >

        <div className="container py-xl-4 py-lg-2" style={{ opacity: this.props.bill && this.props.bill.loading ? 0.5 : 1, position: 'relative' }}>
          {loading}
          {
            statusBill
          }
          {
            inFo
          }
          <Table responsive style={{ backgroundColor: "white" }}>

            <thead>
              <tr >
                <th colSpan={6}><h1 style={{ fontSize: '30px' }}>Chi tiết đơn hàng</h1></th>
              </tr>
              <tr>
                {/* <th>STT</th> */}
                <th >Sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th style={{ textAlign: 'right', paddingRight: '10px' }}>Tạm tính</th>

              </tr>
            </thead>
            <tbody>

              {
                bill && bill.Products && bill.Products.map((value, item) => (
                  <tr key={item} >


                    <td ><Link to={`/Detail/${value.ID}`} style={{ color: '#007bff' }}>{value.Name}</Link></td>
                    <td><img width='50px' height='50px' src={`${value.Image}`} alt={value.Name} /></td>
                    <td>{util.showVNDCurrency(value.Price)}</td>
                    <td>{value.Quantity}</td>
                    <td style={{ textAlign: 'right', paddingRight: '10px' }}>{util.showVNDCurrency(value.Price * value.Quantity)}</td>


                  </tr>




                ))

              }
              {toTal}
            </tbody>

          </Table>


        </div>
        <br />
      </div>
    );
  }
}
export default BillDetail;
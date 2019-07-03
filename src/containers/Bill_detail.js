import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BillDetail from '../component/BillDetail/BillDetail';
import { clearModal } from '../actions/modal-cart';
import { getBillDetail, clearAll } from "../actions/bill-detail";
class Bill_detail extends Component {
    render() {
        const {
            infoLogin,
            statusPost,
            bill,
            getBillDetail,
            clearModal,
            clear
        }= this.props;
        return (
            <BillDetail
            infoLogin={infoLogin}
            statusPost={statusPost}
            bill={bill}
            getBillDetail={getBillDetail}
            clearModal={clearModal}
            clear={clear}
            >

            </BillDetail>
        );
    }
}
const mapStateToProps = state => {

    return {
      infoLogin: state.authReducer,
      statusPost: state.checkoutReducer,
      bill: state.billDetailReducer
    };
  };
  const mapDispathtoProps = dispath => {
    return {
  
      getBillDetail: (id, token) => dispath(getBillDetail(id, token)),
      clearModal: () => dispath(clearModal()),
      clear:()=>dispath(clearAll())
  
  
    };
  };
  export default withRouter(
    connect(
      mapStateToProps,
      mapDispathtoProps
    )(BillDetail)
  );

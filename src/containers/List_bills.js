import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ListBills from '../component/ListBills/ListBills';
import { getBills } from "../actions/bills";
class List_bills extends Component {
    render() {
        const {getBills, infoLogin, bills} =this.props;
        return (
           <List_bills
           getBills={getBills}
           infoLogin={infoLogin}
           bills={bills}
           >

           </List_bills>
        );
    }
}
const mapStateToProps = state => {

    return {
      infoLogin: state.authReducer,
      statusPost: state.checkoutReducer,
      bills: state.billReducer
    };
  };
  const mapDispathtoProps = dispath => {
    return {
  
      getBills: (idCustomer, token, page, perPage) => dispath(getBills(idCustomer, token, page, perPage)),
  
  
  
    };
  };
  export default withRouter(
    connect(
      mapStateToProps,
      mapDispathtoProps
    )(ListBills)
  );

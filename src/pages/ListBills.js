import React, { Component } from "react";
import Header from "../component/Header/Hearder";
import Footer from "../component/Footer/Footer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ListBills from '../containers/List_bills';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import util from "../Util";
class ListBillsPage extends Component {
  componentDidMount() {

    if (!localStorage.getItem("user")) {
      this.props.history.push("/Login");
      return;
    }

  }

  render() {
    let products = this.props.cart;
    let countCart = this.props.cart ? util.countQuantity(this.props.cart) : 0;
    let infoLogin;
    if (this.props.infoLogin.user) {
      infoLogin = this.props.infoLogin.user;
    } else {
      infoLogin = this.props.infoLogin;
    }

    return (
      <div className="agile-main-top">

        <Header />
        <Search ></Search>
        <Category></Category>
        <ListBills></ListBills>
        <Footer />


      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    infoLogin: state.authReducer,
    statusPost: state.checkoutReducer,
  };
};
const mapDispathtoProps = dispath => {
  return {

  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispathtoProps
  )(ListBillsPage)
);

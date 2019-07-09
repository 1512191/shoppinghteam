import React, { Component } from "react";
import Header from "../component/Header/Hearder";
import Footer from "../component/Footer/Footer";
import { withRouter } from "react-router-dom";
import BillDetail from '../containers/Bill_detail';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
class OrderDetail extends Component {

  componentDidMount() {

    if (!localStorage.getItem("user")) {
      this.props.history.push("/SignIn");
      return;
    }

  }

  render() {

    return (
      <div className="agile-main-top">

        <Header />
        <Search ></Search>
        <Category></Category>
        <BillDetail />

        <Footer />


      </div>
    );
  }
}

export default withRouter(OrderDetail);


import React, { Component } from "react";
import Header from "../component/Header/Hearder";
import Footer from "../component/Footer/Footer";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ListBills from '../containers/List_bills';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import util from "../Util";
class ListBillsPage extends Component {
  componentWillMount(){
    if (!localStorage.getItem("user")) {
      this.props.history.push("/SignIn");
      return;
    }
  }
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
        <ListBills></ListBills>
        <Footer />


      </div>
    );
  }
}

export default withRouter(
  (ListBillsPage)
);

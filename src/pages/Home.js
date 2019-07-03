import React, { Component } from "react";

import Header from "../component/Header/Hearder";
import Search from "../component/Search/Search";
import Category from "../component/Category/Category";
import Products from "../component/Products/Products";
import Footer from "../component/Footer/Footer";
import ModalCheckout from "../component/Check_out_modal/Check_out_modal";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
export default class Home extends Component {

  render() {
    return (

      <div className=" agile-main-top">
        
          <Header />
          <Search />
          <Category />
          <Products />
          <Footer />
       
        <ScrollUpButton
          style={{
            color: '#0879c9',
            background: '#0879c9'
          }}
          ToggledStyle={{}}

        >
        </ScrollUpButton>
      </div>


    );
  }
}

import React, { Component } from 'react'
import Header from '../component/Header/Hearder';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import Checkout from '../containers/Check_out';
import Footer from '../component/Footer/Footer';
import Breadcrum from '../component/Breadcrum/Breadcrum';
export default class CheckoutPage extends Component {
 
  render() {
    return (
        <div className="agile-main-top">
      
        <Header></Header>
        <Search></Search>
        
        <Breadcrum></Breadcrum>
        <Checkout></Checkout>
        <Footer></Footer>
        
        </div>
          
       
    )
  }
}

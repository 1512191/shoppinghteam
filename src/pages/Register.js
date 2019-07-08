import React, { Component } from 'react'

import Header from '../component/Header/Hearder';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import RegisterComponent from '../component/Register/Register';
import Footer from '../component/Footer/Footer';
// import ModalCheckout from '../component/Check_out_modal/Check_out_modal';

export default class Register extends Component {
    constructor(props) {
        super(props);
        
    }
    
    
  render() {
      
    return (
      <div  className="agile-main-top">
       
      <div className="container-fluid">
      <Header></Header>
      <Search ></Search>
      <Category></Category>
      
      <RegisterComponent></RegisterComponent>
      <Footer></Footer>
    
      </div>
        
      </div>
         
        
    )
  }
}

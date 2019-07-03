import React, { Component } from 'react'

import Header from '../component/Header/Hearder';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import SignInComponent from '../component/SignIn/SignIn';
import Footer from '../component/Footer/Footer';
import ModalCheckout from '../component/Check_out_modal/Check_out_modal';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        if(localStorage.getItem('user')){
            this.props.history.push('/');
            return;
        }
    }
    
  render() {
      
    return (
        
        <div  className="agile-main-top">
       
        <div className="container-fluid">
        <Header></Header>
        <Search ></Search>
        <Category></Category>
        
        <SignInComponent></SignInComponent>
        <Footer></Footer>
      
        </div>
          
        </div>
    )
  }
}

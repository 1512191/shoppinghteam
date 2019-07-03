import React, { Component } from 'react';
import Header from '../component/Header/Hearder';
import Search from '../component/Search/Search';

import ModalLogin from '../component/InforCustomer/InforCustomer';
import Category from '../component/Category/Category';
import Footer from '../component/Footer/Footer';
import util from '../Util';
class Login extends Component {
    componentDidMount(){
        if(localStorage.getItem('cart')){
            if(localStorage.getItem('user') && util.countQuantity(JSON.parse(localStorage.getItem('cart'))) > 0){
                this.props.history.push('/Address');
                return;
            }
        }
      
    }
    render() {
        return (
            <div>
                <Header></Header>
                <Search ></Search>
                <Category/>
                <ModalLogin></ModalLogin>
                <Footer></Footer>
            </div>
        );
    }
}

export default Login;
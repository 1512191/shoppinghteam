import React, { Component } from 'react'
import Banner from '../component/Banner/Banner';
import Header from '../component/Header/Hearder';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import Products from '../component/Products/Products';
import Footer from '../component/Footer/Footer';
import ModalCheckout from '../component/Check_out_modal/Check_out_modal';
import FilterNameProduct from '../component/FilterNameProduct/FilterNameProduct';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
export default class Home extends Component {
    constructor(props) {
        super(props);

    }


    render() {

        return (

            <div className="agile-main-top">


                <Header></Header>
                <Search ></Search>
                <Category></Category>
                <div className="ads-grid py-sm-5 py-4">
                    <div className="container-fluid py-xl-4 py-lg-2">
                        <Banner />
                        <br />
                        <br />
                        <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">
                        DANH SÁCH SẢN PHẨM</h3>

                        <div className="row" id="search">
                            <FilterNameProduct></FilterNameProduct>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                <ScrollUpButton
                    style={{
                        color: '#0879c9',
                        background: '#0879c9'
                    }}
                    ToggledStyle={{}}

                >
                </ScrollUpButton>
                {/* <ModalCheckout></ModalCheckout> */}


            </div>
        )
    }
}

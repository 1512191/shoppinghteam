import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import Banner from '../component/Banner/Banner';
import Header from '../component/Header/Hearder';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import Products from '../component/Products/Products';
import Footer from '../component/Footer/Footer';
import ModalCheckout from '../component/Check_out_modal/Check_out_modal';
import FilterNameProduct from '../component/FilterNameProduct/FilterNameProduct';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
class Home extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        let { match } = this.props;
        //console.log(match)
        let name = match && this.props.match.params.name ? <div className="col-sm-12" style={{ textAlign: 'left', fontSize: '20px' }}>Kết quả tìm kiếm cho sản phẩm <strong>{this.props.match.params.name}</strong></div> : <div className="col-sm-12"></div>

        return (

            <div className="agile-main-top">


                <Header></Header>
                <Search ></Search>
                <Category></Category>
                <div className="ads-grid py-sm-5 py-4">
                    <div className="container-fluid py-xl-4 py-lg-2">
                        <div className="row">
                            {name}
                        </div>
                        {/* <Banner /> */}
                        <div className="row">

                            <div className="col-sm-6" >                        <img style={{ objectFit: 'cover', height: '100px', width: '100%' }} className="banner" src="https://api.dienthoaigiakho.vn/photos/1561372126512-BANNER-.png" alt="banner" />
                            </div>
                            <div className="col-sm-6" >                        <img style={{ objectFit: 'cover', height: '100px', width: '100%' }} className="banner" src="https://api.dienthoaigiakho.vn/photos/1561371958453-BANNER.png" alt="banner" />
                            </div>
                        </div>
                        <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3" style={{ marginTop: '20px' }}>
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
export default withRouter(
    (Home)
);

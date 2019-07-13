import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import Banner from '../component/Banner/Banner';
import Header from '../component/Header/Hearder';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import Products from '../component/Products/Products';
import Footer from '../component/Footer/Footer';
import ModalCheckout from '../component/Check_out_modal/Check_out_modal';
import CategoryFilter from '../containers/Product_by_category';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
// import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Breadcrum from '../component/BreadcrumCat/Cat';
class Home extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        window.scrollTo({
            top: this.sectionRef.offsetTop,
            behavior: 'smooth',
        });
    }

    getSectionRef = el => {
        this.sectionRef = el;
    }

    componentWillReceiveProps(nextProps) {
        let id = nextProps.match.params.id;
        if (id !== this.props.match.params.id)
            window.scrollTo({
                top: this.sectionRef.offsetTop,
                behavior: 'smooth',
            });
    }
    render() {

        return (

            <div className="agile-main-top">


                <Header></Header>
                <Search ></Search>
                <Category></Category>
                <div className="ads-grid py-sm-5 py-4">
               
                    <div className="container-fluid py-xl-4 py-lg-2">
                    <div className="agileinfo-ads-display col-lg-12">
                <Breadcrum />
                </div>
                <br />
                <br />
                        {/* <Banner />
                       
                        */}
                        <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">
                            DANH SÁCH SẢN PHẨM</h3>

                        <div className="row" ref={r => this.getSectionRef(r)}>
                            <CategoryFilter></CategoryFilter>
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
export default withRouter(Home)

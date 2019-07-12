import React, { Component } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import './Detail.css';
import load from '../../images/Double Ring-2.2s-100px.gif';
import util from '../../Util';



class Detail_product extends Component {
    displayName = 'Product Detail Page'

    constructor(props) {
        super(props)
        this.state = {
            item: null,
            ID: this.props.ID_Product
        }

    }

    componentWillMount() {
        this.scrollListener = window.addEventListener('scroll', (e) => {
            document.body.scrollTop = 0
        })
        window.scrollTo(0, 0);

    }

    componentDidMount() {
        document.getElementById("html").style.overflow = "auto";
        this.props.clearModal()
        const { match } = this.props;
        if (match) {
            const { id } = match.params;
            this.props.getProduct(id);
        }

    }




    onClick = async (item, quantity) => {

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
        this.props.countCart(item, quantity);
        await this.props.toggleTooltip();

        var action = await setTimeout(() => {
            this.props.closeTooltip()
        }, 3000);

    }
    componentWillUnmount() {
        this.props.clear();
    }

    render() {
        let { product } = this.props.product;
        let loading = '';
        if (this.props.product && this.props.product.loading === true) {
            loading = <img style={{ position: 'absolute', height: '120px', width: '120px', margin: 'auto', left: '0px', right: '0px', bottom: '0px' }} src={load} alt='loading' />
        }

        return (
            <div className="banner-bootom-w3-agileits py-5" style={{ opacity: this.props.product && this.props.product.loading ? 0.5 : 1, position: 'relative' }}>
                {loading}
                {product &&
                    <div className="container py-xl-4 py-lg-2">

                        <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">
                            {product.Name}</h3>

                        <div className="row">
                            <div className="col-lg-5 col-md-8 single-right-left ">
                                <div className="grid images_3_of_2">
                                    <div className="flexslider">
                                        <ul className="slides">
                                            <Carousel bsstyle="default" >
                                                <Carousel.Item className="thumb-image" >
                                                    <img
                                                        className="img-fluid"
                                                        src={`${product.Image}`}
                                                        alt={`${product.Description}`}
                                                    />

                                                </Carousel.Item>
                                                <Carousel.Item className="thumb-image">
                                                    <img
                                                        className="img-fluid"
                                                        src={`${product.Image}`}
                                                        alt={`${product.Description}`}
                                                    />

                                                </Carousel.Item>
                                                <Carousel.Item className="thumb-image">
                                                    <img
                                                        className="img-fluid"
                                                        src={`${product.Image}`}
                                                        alt={`${product.Description}`}
                                                    />

                                                </Carousel.Item>
                                            </Carousel>
                                        </ul>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7 single-right-left simpleCart_shelfItem">
                                <h3 className="mb-3">{product.Name}</h3>
                                <p className="mb-3">
                                    <span className="item_price">{product.Price?util.showVNDCurrency(product.Price):'0 đ'}</span>
                                </p>
                                <div className="single-infoagile">
                                    <ul>
                                        <li className="mb-3">
                                            {product.Description}
                                        </li>
                                    </ul>
                                </div>
                               
                                <button className='btn btn-danger addCart' onClick={() => this.onClick(product, 1)}>Thêm vào giỏ</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
} 
export default Detail_product;
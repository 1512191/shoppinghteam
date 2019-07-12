import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer-top-first">
                    <div className="container py-md-5 py-sm-4 py-3">

                        

                        <div className="row w3l-grids-footer border-top border-bottom py-sm-4 py-3">
                            <div className="col-md-4 offer-footer">
                                <div className="row">
                                    <div className="col-4 icon-fot">
                                        <i className="fas fa-dolly"></i>
                                    </div>
                                    <div className="col-8 text-form-footer">
                                        <h3>Giá phù hợp</h3>
                                        <p>cho mọi sản phẩm</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 offer-footer my-md-0 my-4">
                                <div className="row">
                                    <div className="col-4 icon-fot">
                                        <i className="fas fa-shipping-fast"></i>
                                    </div>
                                    <div className="col-8 text-form-footer">
                                        <h3>Giao hàng nhanh</h3>
                                        <p>khu vực Hồ Chí Minh</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 offer-footer">
                                <div className="row">
                                    <div className="col-4 icon-fot">
                                        <i className="far fa-thumbs-up"></i>
                                    </div>
                                    <div className="col-8 text-form-footer">
                                        <h3>Nhiều lựa chọn</h3>
                                        <p>nhiều sản phẩm</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w3l-middlefooter-sec">
                    <div className="container py-md-5 py-sm-4 py-3">
                        <div className="row footer-info w3-agileits-info">

                            

                           
                            <div style={{textAlign:'center'}}className="col-md-6 col-sm-12 footer-grids w3l-agileits mt-md-0 mt-4">
                            <div className="footer-grids  w3l-socialmk mt-3">
                                <h3 className="text-white font-weight-bold mb-3">Contact</h3>
                                <ul>
                                   
                                    
                                    <li className="mb-3">
                                        <i className="fas fa-envelope-open"></i>
                                        <a href="mailto:example@mail.com"> hteam@example.com</a>
                                    </li>
                                    
                                </ul>
                            </div>
                            </div>
                            <div style={{textAlign:'center'}} className="col-md-6 col-sm-12 footer-grids w3l-agileits mt-md-0 mt-4">


                                <div className="footer-grids  w3l-socialmk mt-3">
                                    <h3 className="text-white font-weight-bold mb-3">Follow Us on</h3>
                                    <div className="social">
                                        <ul>
                                            <li>
                                                <a className="icon fb" href="#">
                                                    <i className="fab fa-facebook-f"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="icon tw" href="#">
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="icon gp" href="#">
                                                    <i className="fab fa-google-plus-g"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
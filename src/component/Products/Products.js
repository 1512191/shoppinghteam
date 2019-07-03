import React from 'react';
import Product from '../../containers/Product';
import Banner from '../Banner/Banner'
export default class extends React.Component {


    render() {
        return (
            <div className="ads-grid py-sm-5 py-4">
                <div className="container-fluid py-xl-4 py-lg-2">
                    <Banner />
                    <br />
                    <br />

                    <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">
                    DANH SÁCH SẢN PHẨM
                      </h3>
                    <div>
                        <div className="row">
                            <Product  />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
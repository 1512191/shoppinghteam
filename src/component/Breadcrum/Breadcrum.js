import React, { Component } from 'react';
import { getDetailRequest } from '../../actions/products';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class Breadcrum extends Component {
	componentDidMount() {
		const { match } = this.props;
        if (match.params.id) {
            const { id } = match.params;
            this.props.getProduct(id);
        }
	}
	
    render() {
		let {product}=this.props.product;
        return (
            <div className="services-breadcrumb">
		<div className="agile_inner_breadcrumb">
			<div className="container">
				<ul className="w3_short" >
					<li style={{fontSize:'16px'}}>
						<Link to="/">Trang chủ</Link>
						<i style={{fontSize:'16px'}} >|</i>
					</li>
					<li style={{fontSize:'16px'}}>{product && product.Name?product.Name:'Giỏ hàng'}</li>
				</ul>
			</div>
		</div>
	</div>
        );
    }
}
const mapStateToProps = (state) => {

    return {
		product: state.productReducer,


    }
}
const mapDispathtoProps = (dispath) => {
    return {
		getProduct: (id) => dispath(getDetailRequest(id)),
		

    }
}
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(Breadcrum));

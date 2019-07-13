import React, { Component } from 'react';
import { getDetailCat, clearDetail} from '../../actions/category';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class Breadcrum extends Component {
	componentDidMount() {
		const { match } = this.props;
        if (match.params.id) {
            const { id } = match.params;
            this.props.getCate(id);
        }
	}
	componentWillReceiveProps(nextProps){
        let id = nextProps.match.params.id;
        if (id !== this.props.match.params.id) {
            this.props.clearDetail();
            this.props.getCate(id);
        }
    }
    render() {
        let {category}=this.props;
        let parent = <li></li>;
        if(category.Parent){
            parent = <li 
            style={{fontSize:'16px'}}>
            <Link to={`/Category/${category.Parent.ID}`}>
            {category.Parent.Name}
            </Link>
            <i style={{fontSize:'16px'}} >></i></li>
        }
        return (
            <div className="services-breadcrumb">
		<div className="agile_inner_breadcrumb">
			<div className="container">
				<ul className="w3_short" >
					<li style={{fontSize:'16px'}}>
						<Link to="/">Trang chủ</Link>
						<i style={{fontSize:'16px'}} >></i>
					</li>
                    {parent}
					<li style={{fontSize:'16px'}}>{category && category.Name?category.Name:''}</li>
				</ul>
			</div>
		</div>
	</div>
        );
    }
}
const mapStateToProps = (state) => {

    return {
		category: state.detailCatReducer,


    }
}
const mapDispathtoProps = (dispath) => {
    return {
		getCate: (id) => dispath(getDetailCat(id)),
		clearDetail:()=>dispath(clearDetail())

    }
}
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(Breadcrum));

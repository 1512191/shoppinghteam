import React, { Component } from "react";
import { getCategoryRequest } from "../../actions/category";
import { actionClear } from "../../actions/products";
import { connect } from "react-redux";
import { countCart, deleteCart } from "../../actions/cart";
import { Link, withRouter, NavLink } from "react-router-dom";
import "./Category.css";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "All Categories",
      hover: false
    };
  }

  componentDidMount() {
    this.props.getRequestCategory();
  }
  getProductByCategory = e => {
    this.setState({
      value: e.target.value
    });
    let { history } = this.props;
    const id = e.target.value;
    if (!id) {
      history.push("/");
    } else {
      history.push(`/Category/${id}`);
    }
  };
  displayCate = e => {
    this.setState({
      hover: true
    });
  };
  Categories = item =>
    item &&
    item.map((cate, i) => (
      <NavLink key={i} className="nav-link dropdown-item" to={`/Category/${cate.ID}`} >
        {cate.Name}
      </NavLink>
    ));
  componentWillReceiveProps(nextProps) {
    let id = nextProps.match.params.id;
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({ ID: id });
    }
  }
  stateColor = () => {
    let lengthPath = this.props.match.path.length;
    if (this.props.match.params.id || lengthPath > 2) {
      return false
    } return true;
  }

  render() {

    let categories = this.props.categories;
    let cat = categories.map((item, index) => (
      <li key={index} className="nav-item mr-lg-2 mb-lg-0 mb-2 dropdown">
        <NavLink id="dropdownMenuButton"
          className="nav-link " to={`/Category/${item.ID}`} >
          {item.Name}
        </NavLink>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <ul>
            {this.Categories(item.SubCategories)}
          </ul>
        </div>
      </li>
    ));

    return (
      <div className="navbar-inner">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div
              style={{ fontSize: 'bolder' }}
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto text-center mr-xl-5">
                <li className="nav-item mr-lg-2 mb-lg-0 mb-2 dropdown">
                  <NavLink id="home" activeStyle={{

                    color: this.stateColor() === false ? "black" : "#F45C5D"
                  }} className='nav-link' to="/">
                    Trang chủ

                  </NavLink>
                </li>
                {cat}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cartReducer,
    message: state.checkoutReducer,
    categories: state.categoryReducer
  };
};
const mapDispathtoProps = dispath => {
  return {
    getRequestCategory: () => dispath(getCategoryRequest()),
    countCart: (item, quantity) => dispath(countCart(item, quantity)),
    deleteCart: item => dispath(deleteCart(item))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispathtoProps
  )(Category)
);

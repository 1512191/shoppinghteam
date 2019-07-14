import React from 'react';
import PropTypes from 'prop-types';
import './Product.css';
import { NavLink,Link } from 'react-router-dom';
import load from '../../images/Double Ring-2.2s-100px.gif';
import util from '../../Util';
import { NavItem } from 'react-bootstrap'



class Product extends React.Component {
    displayName = 'Products Detail'
    constructor(props) {
        super(props)

        this._isMounted = false;

    }
    static propTypes = {
        categories: PropTypes.array
    }
    handleScroll = (e) => {
        const { totalPage, page, scroll } = this.props.products;
        if (scroll) return;
        if (totalPage <= page) return;
        const lastTag = document.querySelector('.products .row:last-child');
        const lastDivOffset = lastTag ? lastTag.offsetTop + lastTag.clientHeight : (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

        const pageOffset = window.pageYOffset + window.innerHeight;
        const bottomOffset = 10;
        if (pageOffset > lastDivOffset - bottomOffset) {
            this.loadMore();
        }

    }
    loadMore = () => {
        if (this._isMounted) {
            this.props.updatePage(this.props.products.page)
            let page = this.props.products.page;

            this.props.getMoreProduct(page)
        }

    }
    componentDidMount() {

        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
        this._isMounted = true;
        if (this._isMounted) {
            this.props.clear();
            this.props.getProductRequest();
        }
        else {
            this.props.scrollFlag();
        }
        if (this.props.products.page >= this.props.products.totalPage) {
            this.props.scrollFlag();
        }


    }
    componentWillUnmount() {
        this._isMounted = false;
        this.scrollListener = window.removeEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
        this.props.clear();
    }




    onPreventDefault = (e) => {
        e.preventDefault();
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



    render() {
        let data = [];
        data = this.props.products.data;
        let { display } = this.props;
        let loading = '';
        let notification = data.length === 0 && this.props.products.loading === false ?<div className="row" style={{textAlign:'center', textTransform:'uppercase'}}>Không có sản phẩm</div>:<div></div>
        if (this.props.products && this.props.products.loading === true) {
            loading = <img style={{ position: 'absolute', height: '120px', width: '120px', margin: 'auto', left: '0px', right: '0px', bottom: '0px' }} src={load} alt='loading' />
        }
        

        return (
            <div className="agileinfo-ads-display col-lg-12">
                <div className="wrapper">
                    <div className="products px-sm-4 px-3 py-sm-5  py-3 mb-4">
                        {loading}
                        {notification}
                        <div className="row" style={{ opacity: this.props.products && this.props.products.loading ? 0.5 : 1, position: 'relative' }}>
                            {data && data.map((item, i) => (
                                <div key={i} className="col-md-3 col-xs-3 col-md-3 product-men mt-5">
                                    <NavItem className="men-pro-item simpleCart_shelfItem">
                                        <NavLink to={`/Detail/${item.ID}`} >
                                            <NavItem className="men-thumb-item text-center">
                                                <img src={item.Image} width="200px" height="200px" alt={item.Name} />
                                                <NavItem className="men-cart-pro">
                                                    <NavItem className="inner-men-cart-pro">
                                                        <div onClick={() => this.props.history.push(`/Detail/${item.ID}`)} className="link-product-add-cart">Xem nhanh</div>
                                                    </NavItem >
                                                </NavItem >
                                            </NavItem>
                                        </NavLink>
                                        <div className="item-info-product text-center border-top mt-4">
                                            <h4 className="pt-1">
                                                <NavLink to={`/Detail/${item.ID}`}>{item.Name}</NavLink>
                                            </h4>
                                            <div className="info-product-price my-2">
                                                <span className="item_price">{util.showVNDCurrency(item.Price)}</span>
                                                {/* <del>$280.00</del> */}
                                            </div>
                                            <button className="info-product-price my-2 btn add-to-cart" type="submit">
                                                <Link to="#" onClick={() => this.onClick(item, 1)}>Thêm vào giỏ</Link>
                                            </button>
                                        </div>
                                    </NavItem >
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Product;
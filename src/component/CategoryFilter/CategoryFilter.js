import React,{ createRef } from 'react';
import '../Product/Product.css';
import { NavLink } from 'react-router-dom';
import load from '../../images/Double Ring-2.2s-100px.gif';
import util from "../../Util";

class CategoryFilter extends React.Component {
    displayName = 'Products Detail'
    constructor(props) {
        super(props)

        this._isMounted = false;

    }

    handleScroll = (e) => {
        const { totalPage, page, scroll } = this.props.products;
        let { match } = this.props;
        let id = match ? match.params.id : '';
        if (scroll) return;
        if (totalPage <= page) return;
        const lastTag = document.querySelector('.product-sec1 .row:last-child');
        const lastDivOffset = lastTag ? lastTag.offsetTop + lastTag.clientHeight : (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        const bottomOffset = 10;
        if (pageOffset > lastDivOffset - bottomOffset) {
            this.loadMore(id);
        }

    }
    loadMore = (id) => {
        if (this._isMounted) {
            this.props.updatePage(this.props.products.page)
            let page = this.props.products.page;
            this.props.getMoreProduct(id, page)
        }

    }
    componentWillReceiveProps(nextProps) {
        let id = nextProps.match.params.id;
        if (id !== this.props.match.params.id) {
            this.props.clear();
            this.props.getProductRequestByCategory(id);
        }

    }
    componentDidMount() {
        
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
        this._isMounted = true;
        let { match } = this.props;
        let id = match ? match.params.id : '';
        if (this._isMounted) {
            this.props.clear();
            this.props.getProductRequestByCategory(id);
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
        window.removeEventListener('scroll', this.handleScroll());
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
        if (this.props.products && this.props.products.loading === true) {
            loading = <img style={{ position: 'absolute', height: '120px', width: '120px', margin: 'auto', left: '0px', right: '0px', bottom: '0px' }} src={load} alt='loading' />
        }
        let notification='';
        if(data.length <= 0 && this.props.products.loading === false){
            notification =<div style={{textAlign:'center', textTransform:'uppercase'}}>Không có sản phẩm cần tìm</div>
        }
        else{
            notification=<div></div>
        }
        return (
            <div className="agileinfo-ads-display col-lg-12">
                <div className="wrapper">
                    <div className="product-sec1 px-sm-4 px-3 py-sm-5  py-3 mb-4">
                        {loading}
                        <div className="row" style={{ opacity: this.props.products && this.props.products.loading ? 0.5 : 1, position: 'relative' }}>

                            {data && data.map((item, i) => (
                                <div key={i} className="col-md-3 product-men mt-5">
                                    <div className="men-pro-item simpleCart_shelfItem">
                                        <div className="men-thumb-item text-center">
                                            <img src={item.Image} with="200" height="200" alt={item.Name} />
                                            <div className="men-cart-pro">
                                                <div className="inner-men-cart-pro">
                                                    <div onClick={() => this.props.history.push(`/Detail/${item.ID}`)} className="link-product-add-cart">Xem nhanh</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-info-product text-center border-top mt-4">
                                            <h4 className="pt-1">
                                                <NavLink to={`/Detail/${item.ID}`}>{item.Name}</NavLink>
                                            </h4>
                                            <div className="info-product-price my-2">
                                                <span className="item_price">{util.showVNDCurrency(item.Price)}</span>
                                            </div>
                                            <button className="info-product-price my-2 btn add-to-cart" type="submit">
                                                <a onClick={() => this.onClick(item, 1)}>Thêm vào giỏ</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {notification}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default CategoryFilter;
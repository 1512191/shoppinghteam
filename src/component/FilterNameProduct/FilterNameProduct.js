import React from 'react';
import '../Product/Product.css';
import { NavLink, withRouter } from 'react-router-dom';
import { getProductsNameRequest, getMoreProduct, actionPage, actionClear,actionScroll  } from '../../actions/products-by-search';
import { toggleModal } from '../../actions/modal-cart';
import { connect } from 'react-redux';
import {countCart} from '../../actions/cart';
import load from '../../images/Double Ring-2.2s-100px.gif';
import util from "../../Util";
import { toggleTooltip, closeTooltip } from '../../actions/toogle-tooltip';



class ProductFilter extends React.Component {
    constructor(props) {
        super(props)
      
            this._isMounted = false;
        
    }
  
    handleScroll = (e) => {
        const { totalPage, page, scroll } = this.props.products;
        let { match } = this.props;
        let name = match ? match.params.name : '';
        if (scroll) return;
        if (totalPage <= page) return;
        const lastTag = document.querySelector('.product-sec1 .row:last-child');
        const lastDivOffset = lastTag? lastTag.offsetTop + lastTag.clientHeight: (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;        const pageOffset = window.pageYOffset + window.innerHeight;
        const bottomOffset = 10;
        if (pageOffset > lastDivOffset - bottomOffset) {
            this.loadMore(name);
        }

    }
    loadMore = (name) => {
        if (this._isMounted) {
            this.props.updatePage(this.props.products.page)
            let page = this.props.products.page;
            
            this.props.getMoreProduct(name,page)
        }

    }
    componentWillReceiveProps(nextProps) {
        let name = nextProps.match.params.name;
        if (name !== this.props.match.params.name) {

            this.props.clear();
            this.props.getProductsNameRequest(name);
        }

    }
    componentDidMount() {
      
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
        this._isMounted = true;
        let { match } = this.props;
        let name = match ? match.params.name : '';
        if (this._isMounted) {
            this.props.clear();
            this.props. getProductsNameRequest(name);
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

    componentWillMount() {

    }
    render() {
        let data = [];
        data = this.props.products.data;
        let { display } = this.props;
        let loading='';
        let notification = '';
        if(data.length <= 0 && this.props.products.loading === false){
            notification =<div style={{textAlign:'center', textTransform:'uppercase'}}>Không có sản phẩm cần tìm</div>
        }
        else{
            notification=<div></div>
        }
        if(this.props.products && this.props.products.loading === true){
            loading=<img  style={{position:'absolute',height:'120px', width:'120px', margin:'auto', left:'0px', right:'0px', bottom:'0px'}} src={load} alt='loading'/>
        }
        return (
            <div className="agileinfo-ads-display col-lg-12">
                <div className="wrapper">
                    <div className="product-sec1 px-sm-4 px-3 py-sm-5  py-3 mb-4">
                    {loading}
                        <div className="row" style={{ opacity: this.props.products && this.props.products.loading ? 0.5 : 1, position:'relative' }}>
                       
                            {data && data.map((item, i) => (
                                <div key={i} className="col-md-3 product-men mt-5">
                                    <div className="men-pro-item simpleCart_shelfItem">
                                        <div className="men-thumb-item text-center">
                                            <img src={item.Image} with="200" height="200" alt={item.Name} />
                                            <div className="men-cart-pro">
                                                <div className="inner-men-cart-pro">
                                                <div onClick={()=>this.props.history.push(`/Detail/${item.ID}`)} className="link-product-add-cart">Xem nhanh</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-info-product text-center border-top mt-4">
                                            <h4 className="pt-1">
                                                <NavLink to={`/Detail/${item.ID}`}>{item.Name}</NavLink>
                                            </h4>
                                            <div className="info-product-price my-2">
                                                <span className="item_price">{util.showVNDCurrency(item.Price)}</span>
                                                {/* <del>$280.00</del> */}
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
const mapStateToProps = (state) => {
        
    return {
        products: state.productByNameReducer,
        display: state.modalReducer,
        cart:state.cartReducer,
    }
}
const mapDispathtoProps = (dispath) => {
    return {
        getProductsNameRequest: (name) => dispath(getProductsNameRequest(name)),
        getMoreProduct: (name, page) => dispath(getMoreProduct(name,page)),
        toggleModal: () => dispath(toggleModal()),
        countCart:(item, quantity)=>dispath(countCart(item, quantity)),
        updatePage: (page) => {
            dispath(actionPage(page))
        },
        scrollFlag: () => {
            dispath(actionScroll())
        },
        clear: () => {
            dispath(actionClear())
        },
        toggleTooltip: () => dispath(toggleTooltip()),
        closeTooltip: () => dispath(closeTooltip())
    }
}
export default withRouter(connect(mapStateToProps, mapDispathtoProps)(ProductFilter));
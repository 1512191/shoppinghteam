import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Checkout from '../pages/Checkout';
import Category from '../pages/Category';
import Login from '../pages/Login';
import Address from '../pages/Address';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import NotFound from '../pages/Notfound';
import BillInfor from '../pages/ListBills';
import FilterNameProduct from '../pages/FilterNameProduct';
import OrderDetail from '../pages/OrderDetail';
import Profile from '../pages/Profile';
class RouterURL extends Component {
    render() {
        return (
            <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/Detail/:id' render={(props, match) => <Detail  {...props} match={match}/>   }/>
                <Route path='/Checkout' render={(props, match) => <Checkout  {...props} match={match}/>   }/>
                <Route path='/Category/:id' render={(props, match) => <Category  {...props} match={match}/>   }/>
                <Route path='/Login' render={(props, match) => <Login  {...props} match={match}/>   }/> 
                {/* --login khi đã mua hàng */}
                <Route  path='/Address' render={(props, match) => <Address {...props} match={match}/>   }/>
                <Route path='/SignIn' render={(props, match) => <SignIn  {...props} match={match}/>   }/>
                {/* login khi chưa mua hàng */}
                <Route path='/Register' render={(props, match) => <Register  {...props} match={match}/>   }/>
                {/* <Route path='/BillInfor' render={(props, match) => <BillInfor  {...props} match={match}/>}/> */}
                <Route path='/ListOrder' render={(props, match) => <BillInfor  {...props} match={match}/>}/>
                <Route exact path="/Products/:name" render={(props, match) => (<FilterNameProduct {...props} match={match}></FilterNameProduct>)}></Route>
                <Route path='/OrderDetail/:id' render={(props, match) => <OrderDetail  {...props} match={match}/>}/>
                <Route path='/Profile' render={(props, match) => <Profile  {...props} match={match}/>}/>
                <Route path='' component={NotFound} />
            </Switch>
        

            </div>
        );
    }
}
export default RouterURL;
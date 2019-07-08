import React, { Component } from 'react';
import ProfileComponent from '../component/Profile/Profile';
import Header from '../component/Header/Hearder';
import Search from '../component/Search/Search';
import Category from '../component/Category/Category';
import Footer from '../component/Footer/Footer';
class Profile extends Component {
    render() {
        return (
            <div  className="agile-main-top">
       
            <div className="container-fluid">
            <Header></Header>
            <Search ></Search>
            <Category></Category>
           <ProfileComponent />
           </div>
           </div>
        );
    }
}

export default Profile;
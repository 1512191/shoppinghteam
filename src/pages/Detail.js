import React, { Component } from 'react'
import Header from '../component/Header/Hearder';
import Search from '../component/Search/Search';
import Detail from '../containers/Detail_product';
import Footer from '../component/Footer/Footer';
import Breadcrum from '../component/Breadcrum/Breadcrum';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";




export default class Detail_Page extends Component {
  render() {
    return (
      <div className="agile-main-top">

        <Header></Header>
        <Search></Search>
        <Breadcrum />
        <Detail></Detail>
        <Footer></Footer>
        <ScrollUpButton
          style={{
            color: '#0879c9',
            background: '#0879c9'
          }}
          ToggledStyle={{}}

        >
        </ScrollUpButton>


      </div>
    )
  }
}

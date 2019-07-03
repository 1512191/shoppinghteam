import React, { Component } from 'react';
import { Button, Carousel } from 'react-bootstrap';
class Banner extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://resources.dienthoaigiakho.vn/x500,q90,r/https://api.dienthoaigiakho.vn/photos/1559274257080-Untitled-2.gif"
                        alt="First slide"
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://resources.dienthoaigiakho.vn/x500,q90,r/https://api.dienthoaigiakho.vn/photos/1559273828810-Untitled-4.gif"
                        alt="Third slide"
                    />


                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://resources.dienthoaigiakho.vn/x500,q90,r/https://api.dienthoaigiakho.vn/photos/1559281190921-iphone-XS-max-banner.gif"
                        alt="Third slide"
                    />


                </Carousel.Item>
            </Carousel>
        );
    }
}

export default Banner;
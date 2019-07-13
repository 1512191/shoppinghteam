import React, { Component } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import banner1 from '../../images/1.png';
import banner2 from '../../images/2.png';
import banner3 from '../../images/3.png';
class Banner extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner1}
                        alt="First slide"
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner2}
                        alt="Third slide"
                    />


                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner3}
                        alt="Third slide"
                    />


                </Carousel.Item>
            </Carousel>
        );
    }
}

export default Banner;
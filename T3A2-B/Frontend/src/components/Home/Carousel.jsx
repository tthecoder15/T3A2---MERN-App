import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function NewsCarousel() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item interval={10000}>
        <div >
          <Carousel.Caption > 
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          <img
            src="https://placehold.co/600x400"
            alt="First slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <div >
          <Carousel.Caption >
            <h5>Second slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          <img
            src="https://placehold.co/600x400"
            alt="Second slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <div>
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          <img
            src="https://placehold.co/600x400"
            alt="Third slide"
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default NewsCarousel;

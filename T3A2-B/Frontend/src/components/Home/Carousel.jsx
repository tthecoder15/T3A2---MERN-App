import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://placehold.co/600x400"
            alt="First slide"
          />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <div className="d-flex">
          <img
            className="d-block w-50"
            src="https://placehold.co/600x400"
            alt="Second slide"
          />
          
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item >
          <img
            className="d-block w-100"
            src="https://placehold.co/600x400"
            alt="Third slide"
          />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
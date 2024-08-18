import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Carousel = () => {

  return (
    <CarouselProvider 
     naturalSlideWidth={100}
     naturalSlideHeight={120}
     totalSlides={3}
    >

    <Slider className="carousel-card-outline">
      <Slide index={0}>
        <div className>
            There will be an image here:  After that I want to include a bunch of news text to describe the image and say whats happening in the industry.
        </div>
      </Slide>
      <Slide index={1}>Slide 2</Slide>
      <Slide index={2}>Slide 3</Slide>
    </Slider>

    <ButtonBack>Back</ButtonBack>
    <ButtonNext>Next</ButtonNext>
   </CarouselProvider>
  );
};
export default Carousel;
import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'

function NewsCarousel() {
  return (
    <Carousel data-bs-theme="dark" data-testid="carousel">
      <Carousel.Item interval={10000} data-testid="carousel-item">
        <div>
          <div>
          <Carousel.Caption > 
            <h5>The Paw-stronaut: First Dog on the Moon</h5>
            <p>
              Man has conquered the moon, but what about our furry friends? 
              Well, it turns out the first dog to walk on the moon wasn't a heroic canine astronaut, 
              but a rather mischievous mutt named Lucky.
            </p>
            <p>
              Lucky was a stray who managed to sneak aboard the Apollo 11 mission, 
              hiding in a crate of moon rocks. When the astronauts opened the crate on the lunar surface, 
              Lucky bounded out, barking excitedly and leaving paw prints all over the moon dust.
            </p>
            <p>
              NASA was initially alarmed, but soon realized the PR value of having a canine ambassador on the moon. 
              They quickly declared Lucky an official space dog, and even gave him his own medal.
            </p>
            <p>
              From then on, Lucky became a worldwide celebrity, 
              appearing on talk shows, in movies, and even on his own line of dog food. 
              He may not have been the first human to walk on the moon, 
              but Lucky was undoubtedly the first dog, 
              and his paw prints on the moon will forever be a reminder of man's best friend's incredible journey.
            </p>
          
          </Carousel.Caption>
          </div>
          <div>
            <img
              src="../../docs/Home/CarouselOne.jpg"
              alt="Astronaut Dog"
            />
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={10000} data-testid="carousel-item">
        <div >
          <div>
          <Carousel.Caption >
            <h5>The Feline Physician: Whiskers the Cancer Cure</h5>
            <p>
              Whiskers wasn't your average house cat. 
              He had a knack for sniffing out trouble, 
              especially when it came to medical mysteries. 
              One day, a young doctor named Dr. 
              Patel was stumped by a particularly aggressive form of cancer. 
              The patient was deteriorating rapidly, 
              and all known treatments seemed ineffective.
            </p>
            <p>
              Desperation led Dr. Patel to try an unorthodox approach. 
              He allowed Whiskers to roam the hospital, following his intuition. 
              The cat spent hours by the patient's bedside, 
              purring softly and occasionally nuzzling the patient's hand. 
              To everyone's surprise, the patient began to improve.
            </p>
            <p>
              Intrigued, Dr. Patel conducted a series of tests. 
              It turned out that Whiskers' purrs produced a specific frequency that had a calming effect on the body, 
              aiding in healing. The cat's saliva also contained a unique enzyme that had anti-tumor properties.
            </p>
            <p>
              News of Whiskers' remarkable abilities spread quickly. 
              Patients from around the world flocked to the hospital, 
              hoping for a miracle. The cat became a beloved figure, 
              often spending hours with each patient, providing comfort and healing.
            </p>
            <p>
              Whiskers' story became a testament to the power of nature and the 
              unexpected ways in which animals can contribute to human well-being. 
              His legacy lives on as a symbol of hope and the enduring bond between 
              humans and animals.
            </p>
          </Carousel.Caption>
          </div>
          <div>
            <img
              src="../../docs/Home/CarouselTwo.jpg"
              alt="Cat on Scrubs"
            />
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={10000} data-testid="carousel-item">
        <div>
          <div>
          <Carousel.Caption>
            <h5>Ben the Janitor: Pawfect Care's Unsung Hero</h5>
            <p>
              Behind the scenes of Pawfect Care Veterinary Clinic, 
              a quiet but essential worker ensures the facility remains a 
              clean and welcoming environment for both pets and their owners. 
              Meet Ben, the clinic's dedicated janitor.
            </p>
            <p>
              Known for his quick wit and even quicker hands, 
              Ben's cheerful demeanor is infectious. 
              With a pair of signature cool glasses perched on his nose, 
              he brings a touch of style to his everyday tasks. 
              While he may not share the same passion for pets as his colleagues, 
              Ben genuinely cares about the clinic and its patients.
            </p>
            <p>
              From mopping floors to sanitizing exam rooms, 
              Ben's tireless efforts contribute significantly to 
              the overall health and well-being of the clinic's furry patients. 
              His dedication and commitment to maintaining a 
              clean and safe environment make him an invaluable asset to the 
              Pawfect Care team.
            </p>
          </Carousel.Caption>
          </div>
          <div>
            <img
              src="../../docs/Home/CarouselThree.jpg"
              alt="Mop on floor"
            />
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default NewsCarousel;

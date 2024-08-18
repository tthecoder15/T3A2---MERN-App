import React from 'react'
import Carousel from '../components/Home/Carousel'

const Home = () => {
    return (
        <>
        <div className="contentFrame">
          <h2>Pawfect Care</h2>
            <div className="slide-content">
              <Carousel />
            </div>
          <ul>
            <li>Service buttons</li>
            <li>Service content</li>
          </ul>
        </div>
        </>
      )
    }
    
    export default Home
import React from 'react'
import Carousel from '../components/Home/Carousel'
import ServicesButtons from '../components/Home/Services'

const Home = () => {
    return (
        <>
        <div className="contentFrame">
          <h2>Pawfect Care</h2>
            <div>
              <Carousel />
            </div>
          <ul>
            <ServicesButtons />
          </ul>
        </div>
        </>
      )
    }
    
    export default Home
import React from 'react'
import Carousel from '../components/Home/Carousel'
import ServicesButtons from '../components/Home/Services'

const Home = () => {
    return (
        <>
        <div className="contentFrame">
          <h1>Pawfect Care</h1>
            <div>
              <Carousel />
            </div>
            <ServicesButtons />
        </div>
        </>
      )
    }
    
    export default Home
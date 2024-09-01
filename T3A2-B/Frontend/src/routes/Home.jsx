import React from 'react'
import News from '../components/Home/News'
import ServicesButtons from '../components/Home/Services'

const Home = () => {
    return (
        <>
        <div className="content-frame">
          <div className="home">
            <div className="news-frame">
              <h1>Pawfect Care</h1>
              <h2>In the News..</h2>
              <News />
            </div>
            <div className="service-frame">
              <h2>Our Services</h2>
              <ServicesButtons />
            </div>
          </div>
        </div>
        </>
      )
}
    
export default Home
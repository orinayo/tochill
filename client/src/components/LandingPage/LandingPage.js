import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <main className='landing-page'>
      <ul className='slideshow'>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <h1 className='heading-primary'>
        Your Spotfinder
        <Link to={`/chillspots`}>
          <button className='btn'>
            <span className='btn__visible'>Welcome</span>
            <span className='btn__invisible'>View Chill spots</span>
          </button>
        </Link>
      </h1>
    </main>
  )
}

export default LandingPage

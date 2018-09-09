import React from 'react'
import ChillSpotList from '../ChillSpots/ChillSpotList'

const Dashboard = () => {
  return (
    <main className='chillspots-view'>
      <h1>
        <span className='dashboard__heading-primary'>Find Your Spot</span>
        <span className='dashboard__heading-secondary'>View hand-picked spots from all over Nigeria</span>
      </h1>
      <ChillSpotList />
    </main>
  )
}

export default Dashboard

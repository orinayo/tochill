import React from 'react'
import SideBarItem from './SideBarItem'
import StripeBilling from '../StripeBilling/StripeBilling'

const SideBar = () => {
  return (
    <nav className='sidebar'>
      <ul className='side-nav'>
        <SideBarItem />
        <StripeBilling />
      </ul>
      <div className='legal'>
        &copy; 2018 by Orinayo Oyelade. All rights reserved
      </div>
    </nav>
  )
}

export default SideBar

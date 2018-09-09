import React, { Component } from 'react'
import itemList from './itemList'
import Icon from '../Icon/Icon'
import { Link, withRouter } from 'react-router-dom'

class SideBarItem extends Component {
  renderItems () {
    const currentRoute = this.props.location.pathname
    const activeClass = 'side-nav__item--active'
    return itemList.map(({ icon, name, route }) => {
      return (
        <li key={name}
          className={`side-nav__item ${currentRoute === route && activeClass}`}>
          <Link to={route} className='side-nav__link'>
            <Icon name={icon} />
            <span>{name}</span>
          </Link>
        </li>
      )
    })
  }

  render () {
    return (
      this.renderItems()
    )
  }
}

export default withRouter(SideBarItem)
